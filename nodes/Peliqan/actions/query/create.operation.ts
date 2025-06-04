import type { INodeProperties } from 'n8n-workflow';

export const description: INodeProperties[] = [
  {
    displayName: 'Query Name',
    name: 'queryName',
    type: 'string',
    default: '',
    required: true,
    placeholder: 'My Query Name',
    displayOptions: {
      show: {
        resource: ['query'],
        operation: ['create'],
      },
    },
  },
  {
    displayName: 'SQL Query (view)',
    name: 'querySql',
    type: 'string',
    typeOptions: {
      rows: 10,
    },
    default: '',
    required: true,
    placeholder: 'SELECT * FROM my_table;',
    displayOptions: {
      show: {
        resource: ['query'],
        operation: ['create'],
      },
    },
  },
  {
    displayName: 'Create SQL query (view)',
    name: 'submitQuery',
    type: 'hidden',
    default: '',
    routing: {
      request: {
        method: 'POST',
        url: 'api/database/tables/create-sql-query/',
        body: {
          name: '={{ $parameter.queryName }}',
          query: '={{ $parameter.querySql }}',
        },
      },
    },
    displayOptions: {
      show: {
        resource: ['query'],
        operation: ['create'],
      },
    },
  },
];
