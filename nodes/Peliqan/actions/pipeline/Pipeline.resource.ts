import type { INodeProperties } from 'n8n-workflow';

import * as run from './run.operation';

export { run };

export const description: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['pipeline'],
      },
    },
    options: [
      {
        name: 'Run',
        value: 'run',
        description: 'Run a pipeline',
        action: 'Run a pipeline',
      },
    ],
    default: 'run',
  },
  ...run.description,
];
