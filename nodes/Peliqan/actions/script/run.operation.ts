import type { INodeProperties } from 'n8n-workflow';

export const description: INodeProperties[] = [
  {
    displayName: 'Interface Run Name or ID',
    description: 'Start a script run. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
    name: 'interfaceId',
    type: 'options',
    typeOptions: {
      loadOptionsMethod: 'getInterfaceRuns'
    },
    default: '',
    required: true,
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
      { name: 'STREAMLIT', value: 'STREAMLIT' }
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
  {
    displayName: 'Start Script',
    name: 'startScript',
    type: 'hidden',
    default: '',
    routing: {
      request: {
        method: 'POST',
        url: 'api/interface_runs/',
        body: {
            interface_id: '={{ Number($parameter.interfaceId) }}',
            run_mode: '={{ $parameter.runMode }}',
        },
      },
    },
    displayOptions: {
      show: {
        resource: ['script'],
        operation: ['run'],
      },
    },
  },
];
