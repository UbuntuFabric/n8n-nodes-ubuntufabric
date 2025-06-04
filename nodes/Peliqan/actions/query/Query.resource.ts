import type { INodeProperties } from 'n8n-workflow';

import * as create from './create.operation';
import * as exec from './exec.operation';

export { create, exec };

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
        action: 'Create a sql view in peliqan',
      },
      {
        name: 'Execute SQL Query',
        value: 'exec',
        action: 'Execute a sql query via peliqan',
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
  ...exec.description,
];