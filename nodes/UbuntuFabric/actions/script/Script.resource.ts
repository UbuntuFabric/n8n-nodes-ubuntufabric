import type { INodeProperties } from 'n8n-workflow';

import * as run from './run.operation';
import * as logs from './logs.operation';

export { run, logs };

export const description: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['script'],
      },
    },
    options: [
      {
        name: 'Run',
        value: 'run',
        description: 'Run a script',
        action: 'Run script',
      },
      {
        name: 'Logs',
        value: 'logs',
        description: 'Return logs of script',
        action: 'Return logs of script'
      }
    ],
    default: 'run',
  },
  ...run.description,
  ...logs.description
];
