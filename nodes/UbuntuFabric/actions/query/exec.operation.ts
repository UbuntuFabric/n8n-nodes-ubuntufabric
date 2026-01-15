import type { IExecuteFunctions, INodeExecutionData, INodeProperties } from 'n8n-workflow';
import { ubuntufabricApiRequest } from '../../transport';

export const description: INodeProperties[] = [
	{
		displayName: 'Data Warehouse Name or ID',
		name: 'connection',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getDataWarehouses',
		},
		default: '',
		required: true,
		description:
			'Select a data warehouse. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		displayOptions: {
			show: {
				resource: ['query'],
				operation: ['exec'],
			},
		},
	},
	{
		displayName: 'SQL Query',
		name: 'querySql',
		type: 'string',
		typeOptions: {
			rows: 10,
		},
		default: '',
		required: true,
		placeholder: 'e.g. SELECT * FROM my_table;',
		displayOptions: {
			show: {
				resource: ['query'],
				operation: ['exec'],
			},
		},
	},
];

export const execute = async function (
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const connectionId = this.getNodeParameter('connection', index) as string;
	const querySql = this.getNodeParameter('querySql', index) as string;
	const dbOption = this.getNodeParameter('connection', 0, '', { extractValue: false }) as {
		name?: string;
	};
	const dbName = dbOption?.name ?? '';

	const response = await ubuntufabricApiRequest.call(this, 'POST', 'api/proxy/db/', {
		action: 'fetch',
		connection: connectionId,
		dbName,
		kwargs: {
			query: querySql,
		},
	});

	return [{ json: response }];
};
