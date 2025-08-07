import type { IExecuteFunctions, INodeExecutionData, INodeProperties } from 'n8n-workflow';
import { ubuntufabricApiRequest } from '../../transport';

export const description: INodeProperties[] = [
	{
		displayName: 'Server Name or ID',
		name: 'pipelineId',
		description:
			'Select a server to start sync on. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getPipelineRuns',
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['pipeline'],
				operation: ['run'],
			},
		},
	},
	{
		displayName: 'Sync Type',
		name: 'syncType',
		type: 'options',
		options: [
			{ name: 'Sync', value: 'syncdb' },
			{ name: 'Full Sync', value: 'resync' },
		],
		default: 'syncdb',
		required: true,
		displayOptions: {
			show: {
				resource: ['pipeline'],
				operation: ['run'],
			},
		},
	},
];

export const execute = async function (
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const pipelineId = this.getNodeParameter('pipelineId', index) as string;
	const syncType = this.getNodeParameter('syncType', index) as string;

	const response = await ubuntufabricApiRequest.call(
		this,
		'GET',
		`api/servers/${pipelineId}/${syncType}/`,
	);

	return [{ json: response }];
};
