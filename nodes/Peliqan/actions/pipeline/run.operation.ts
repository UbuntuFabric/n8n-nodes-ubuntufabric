import type { INodeProperties } from 'n8n-workflow';

export const description: INodeProperties[] = [
  {
    displayName: 'Server Name or ID',
    description: 'Select a server to start sync on. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
    name: 'pipelineId',
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
  {
    displayName: 'Start Pipeline',
    name: 'startPipeline',
    type: 'hidden',
    default: '',
    routing: {
      request: {
        method: 'POST',
        url: '=api/servers/{{$parameter.pipelineId}}/{{$parameter.syncType}}',
      },
    },
    displayOptions: {
      show: {
        resource: ['pipeline'],
        operation: ['run'],
      },
    },
  },
];