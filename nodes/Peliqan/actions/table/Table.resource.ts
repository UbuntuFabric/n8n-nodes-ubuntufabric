import type { INodeProperties } from 'n8n-workflow';

import * as get from './get.operation';
import * as list from './list.operation';

export { get };

export const description: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['table'],
      },
    },
    options: [
      {
        name: 'Get',
        value: 'get',
        description: 'Get data from a Peliqan table',
        action: 'Get records',
      },
      {
        name: 'List',
        value: 'list',
        description: 'List all available tables',
        action: 'List tables'
      }
    ],
    default: 'get',
  },
  ...get.description,
  ...list.description
];
