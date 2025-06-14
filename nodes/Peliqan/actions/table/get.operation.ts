import type { IExecuteFunctions, INodeExecutionData, INodeProperties } from 'n8n-workflow';
import { peliqanApiRequest } from '../../transport';

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
		description: 'Choose a table from the list or specify an ID using an expression. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
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

	const response = await peliqanApiRequest.call(
		this,
		'GET',
		`api/database/rows/table/${tableId}/?user_field_names=True`,
	);

	const rawItems = response.results.map((row: any): INodeExecutionData => ({ json: row }));

	const cleanedItems = rawItems.map((item: INodeExecutionData) => {
		const { _group_info, _meta_data, ...cleanedJson } = item.json;
		return {
			...item,
			json: cleanedJson,
		};
	});

	return cleanedItems;
};
