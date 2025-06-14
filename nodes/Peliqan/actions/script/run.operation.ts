import type { IExecuteFunctions, INodeExecutionData, INodeProperties } from 'n8n-workflow';
import { peliqanApiRequest } from '../../transport';

export const description: INodeProperties[] = [
	{
		displayName: 'Interface Run Name or ID',
		name: 'interfaceId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getInterfaceRuns',
		},
		default: '',
		required: true,
		description:
			'Start a script run. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		displayOptions: {
			show: {
				resource: ['script'],
				operation: ['run'],
			},
		},
	},
	{
		displayName: 'Run Mode',
		name: 'runMode',
		type: 'options',
		options: [
			{ name: 'SHELL', value: 'SHELL' },
			{ name: 'API', value: 'API' },
			{ name: 'STREAMLIT', value: 'STREAMLIT' },
		],
		default: 'STREAMLIT',
		required: true,
		displayOptions: {
			show: {
				resource: ['script'],
				operation: ['run'],
			},
		},
	},
];

export const execute = async function (
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const interfaceId = this.getNodeParameter('interfaceId', index) as string;
	const runMode = this.getNodeParameter('runMode', index) as string;

	const response = await peliqanApiRequest.call(
		this,
		'POST',
		'api/interface_runs/',
		{
			interface_id: Number(interfaceId),
			run_mode: runMode,
		},
	);

	return [{ json: response }];
};
