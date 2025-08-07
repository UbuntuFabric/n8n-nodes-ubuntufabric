import type { IExecuteFunctions, INodeExecutionData, INodeProperties } from 'n8n-workflow';
import { ubuntufabricApiRequest } from '../../transport';

export const description: INodeProperties[] = [
	{
		displayName: 'Query Name',
		name: 'queryName',
		type: 'string',
		default: '',
		required: true,
		placeholder: 'My Query Name',
		displayOptions: {
			show: {
				resource: ['query'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: 'SQL Query (View)',
		name: 'querySql',
		type: 'string',
		typeOptions: {
			rows: 10,
		},
		default: '',
		required: true,
		placeholder: 'SELECT * FROM my_table;',
		displayOptions: {
			show: {
				resource: ['query'],
				operation: ['create'],
			},
		},
	},
];

export const execute = async function (
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const queryName = this.getNodeParameter('queryName', index) as string;
	const querySql = this.getNodeParameter('querySql', index) as string;

	const response = await ubuntufabricApiRequest.call(
		this,
		'POST',
		'api/database/tables/create-sql-query/',
		{
			name: queryName,
			query: querySql,
		},
	);

	return [{ json: response }];
};
