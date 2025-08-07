import type { IExecuteFunctions, INodeExecutionData, INodeProperties } from 'n8n-workflow';
import { ubuntufabricApiRequest } from '../../transport';

export const description: INodeProperties[] = [
	{
		displayName: 'List Tables',
		name: 'listTables',
		type: 'hidden',
		default: '',
		displayOptions: {
			show: {
				resource: ['table'],
				operation: ['list'],
			},
		},
	},
];

export const execute = async function (
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const response = await ubuntufabricApiRequest.call(this, 'GET', 'api/applications/');

	if (!Array.isArray(response)) {
		return [];
	}

	const tables = response
		.map((app: any) => app.tables || [])
		.flat();

	return tables.map((table: any) => ({
		json: {
			id: table.id,
			table: table.name_in_query,
		},
	}));
};
