import type { IExecuteFunctions, INodeExecutionData, INodeProperties } from 'n8n-workflow';
import { peliqanApiRequest } from '../../transport';

export const description: INodeProperties[] = [
	{
		displayName: 'ID',
		name: 'interfaceRunId',
		type: 'string',
		default: '',
		required: true,
		description: 'ID to fetch logs for',
		displayOptions: {
			show: {
				resource: ['script'],
				operation: ['logs'],
			},
		},
	},
];

export const execute = async function (
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const interfaceRunId = this.getNodeParameter('interfaceRunId', index) as string;

	const response = await peliqanApiRequest.call(
		this,
		'GET',
		`api/interface_runs/${interfaceRunId}/logs`,
	);

	const items = [{ json: response }];

	const formatted = items.map((item) => {
		const rawLogs = item.json.logs;

		if (typeof rawLogs === 'string') {
			item.json.prettyLogs = rawLogs.split(/(\r\n|\n|\r)/);
		}

		return item;
	});

	return formatted;
};
