import type { INodeProperties } from 'n8n-workflow';

import { postReceiveClean } from '../../methods';

export const description: INodeProperties[] = [
  {
    displayName: 'List Tables',
    name: 'listTables',
    type: 'hidden',
    default: '',
    routing: {
      request: {
        method: 'GET',
        url: 'api/applications/',
      },
      output: {
        postReceive: [
          postReceiveClean.formatTables,
        ],
      },
    },
    displayOptions: {
      show: {
        resource: ['table'],
        operation: ['list'],
      },
    },
  },
];
