import type { IExecuteFunctions, INodeExecutionData, INodeProperties } from 'n8n-workflow';
import { ubuntufabricApiRequest } from '../../transport';

export const description: INodeProperties[] = [
	{
		displayName: 'Table Name or ID',
		name: 'tableId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getTables',
		},
		default: '',
		required: true,
		description:
			'Choose a table from the list or specify an ID using an expression. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		displayOptions: {
			show: {
				resource: ['table'],
				operation: ['get'],
			},
		},
	},
	{
		displayName: 'Simplify',
		name: 'simplify',
		type: 'boolean',
		default: true,
		description: 'Whether to return a simplified version of the response instead of the raw data',
		displayOptions: {
			show: {
				resource: ['table'],
				operation: ['get'],
			},
		},
	},
];

export const execute = async function (
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const tableId = this.getNodeParameter('tableId', index) as string;
	const simplify = this.getNodeParameter('simplify', index) as boolean;

	const response = await ubuntufabricApiRequest.call(
		this,
		'GET',
		`api/database/rows/table/${tableId}/?user_field_names=True`,
	);

	if (!response?.results || !Array.isArray(response.results)) {
		return [];
	}

	if (!simplify) {
		return response.results.map((row: any): INodeExecutionData => ({ json: row }));
	}

	return response.results.map((row: any): INodeExecutionData => {
		const { _group_info, _meta_data, ...cleanedJson } = row;
		const keys = Object.keys(cleanedJson).slice(0, 10);
		const simplified: Record<string, any> = {};
		for (const k of keys) simplified[k] = cleanedJson[k];
		return { json: simplified };
	});
};
