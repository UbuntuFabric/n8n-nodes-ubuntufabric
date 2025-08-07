import type { INodeProperties } from 'n8n-workflow';

import * as exec from './exec.operation';

export { exec };

export const description: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['endpoint'],
      },
    },
    options: [
      {
        name: 'Execute',
        value: 'exec',
        description: 'Execute selected endpoint',
        action: 'Execute endpoint',
      },
    ],
    default: 'exec',
  },
  ...exec.description,
];