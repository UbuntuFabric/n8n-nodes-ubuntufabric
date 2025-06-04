import type { INodeProperties } from 'n8n-workflow';

import * as create from './create.operation';

export { create };

export const description: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
				noDataExpression: true,
    options: [
      {
        name: 'Create SQL Query',
        value: 'create',
        action: 'Create a new sql query in Peliqan',
      },
    ],
    default: 'create',
    displayOptions: {
      show: {
        resource: ['query'],
      },
    },
  },
  ...create.description,
];
