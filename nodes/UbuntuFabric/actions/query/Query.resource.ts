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
    displayOptions: {
      show: {
        resource: ['query'],
      },
    },
    options: [
      {
        name: 'Create SQL Query',
        value: 'create',
        action: 'Create a sql view in ubuntufabric',
      },
      {
        name: 'Execute SQL Query',
        value: 'exec',
        action: 'Execute a sql query via ubuntufabric',
      },
    ],
    default: 'create',
  },
  ...create.description,
  ...exec.description,
];