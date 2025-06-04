import type { INodeProperties } from 'n8n-workflow';

import { postReceiveClean } from '../../methods';

export const description: INodeProperties[] = [
  {
    displayName: 'Table Name or ID',
    description: 'Choose a table. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
    name: 'tableId',
    type: 'options',
    typeOptions: {
      loadOptionsMethod: 'getTables',
    },
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['table'],
        operation: ['get'],
      },
    },
    routing: {
      request: {
        method: 'GET',
        url: '=api/database/rows/table/{{$value}}/?user_field_names=True',
      },
      output: {
        postReceive: [
          {
            type: 'rootProperty',
            properties: {
              property: 'results',
            },
          },
            postReceiveClean.cleanPeliqanTable,
        ],
      },
    },
  }
];
