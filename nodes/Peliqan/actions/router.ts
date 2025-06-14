import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

import * as endpoint from './endpoint/Endpoint.resource';
import * as pipeline from './pipeline/Pipeline.resource';
import * as query from './query/Query.resource';
import * as script from './script/Script.resource';
import * as table from './table/Table.resource';
import type { PeliqanType } from './node.type';


export async function router(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
	const operationResult: INodeExecutionData[] = [];
	const items = this.getInputData();

	const resource = this.getNodeParameter<PeliqanType>('resource', 0);
	const operation = this.getNodeParameter('operation', 0);

    const peliqanNodeData = {
		resource,
		operation,
	} as PeliqanType;

	for (let i = 0; i < items.length; i++) {
		try {
			let responseData: INodeExecutionData[] = [];

			switch (peliqanNodeData.resource) {
				case 'endpoint':
					responseData = await endpoint[peliqanNodeData.operation].execute.call(this, i);
					break;
				case 'pipeline':
					responseData = await pipeline[peliqanNodeData.operation].execute.call(this, i);
					break;
				case 'query':
					responseData = await query[peliqanNodeData.operation].execute.call(this, i);
					break;
				case 'script':
					responseData = await script[peliqanNodeData.operation].execute.call(this, i);
					break;
				case 'table':
					responseData = await table[peliqanNodeData.operation].execute.call(this, i);
					break;
				default:
					throw new NodeOperationError(
						this.getNode(),
						`The resource "${resource}" is not supported!`,
					);
			}

			const executionData = this.helpers.constructExecutionMetaData(responseData, {
				itemData: { item: i },
			});

			operationResult.push(...executionData);
		} catch (error) {
			if (this.continueOnFail()) {
				operationResult.push({
					json: items[i].json,
					error: error as NodeOperationError,
				});
			} else {
				throw error;
			}
		}
	}

	return [operationResult];
}
