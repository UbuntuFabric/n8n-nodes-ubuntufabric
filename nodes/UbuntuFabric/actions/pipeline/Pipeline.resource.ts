import type { INodeProperties } from 'n8n-workflow';

import * as run from './run.operation';

export { run };

export const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		options: [
			{
				name: 'Run',
				value: 'run',
				action: 'Run a pipeline',
				description: 'Start a pipeline sync on a server',
			},
		],
		default: 'run',
		displayOptions: {
			show: {
				resource: ['pipeline'],
			},
		},
	},
	...run.description,
];