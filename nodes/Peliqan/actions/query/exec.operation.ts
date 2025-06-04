import type { INodeProperties } from 'n8n-workflow';

export const description: INodeProperties[] = [
    {
        displayName: 'Data Warehouse',
        name: 'connection',
        type: 'options',
        typeOptions: {
            loadOptionsMethod: 'getDataWarehouses',
        },
        default: '',
        required: true,
        description: 'Select a data warehouse',
        displayOptions: {
            show: {
                resource: ['query'],
                operation: ['exec'],
            },
        },
    },
    {
        displayName: 'SQL Query',
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
                operation: ['exec'],
            },
        },
    },
    {
        displayName: 'Execute SQL query',
        name: 'submitQuery',
        type: 'hidden',
        default: '',
        routing: {
            request: {
                method: 'POST',
                url: 'api/proxy/db/',
                body: {
                    action: 'fetch',
                    connection: '={{ $parameter.connection }}',
                    dbName: '={{ getNodeParameter("connection", 0, "", true).name }}',
                    kwargs: {
                        query: '={{ $parameter.querySql }}',
                    },
                },
            },
        },
    },
];
