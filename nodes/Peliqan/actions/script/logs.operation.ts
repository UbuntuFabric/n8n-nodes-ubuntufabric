import type { INodeProperties } from 'n8n-workflow';

import { postReceiveClean } from '../../methods';


export const description: INodeProperties[] = [
    {
        displayName: 'ID',
        description: 'ID to fetch logs for',
        name: 'interfaceRunId',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                resource: ['script'],
                operation: ['logs'],
            },
        },
        routing: {
            request: {
                method: 'GET',
                url: '=api/interface_runs/{{$parameter.interfaceRunId}}/logs',
            },
            output: {
                postReceive: [
                    postReceiveClean.formatLogsResponse
                ],
            },
        },
    },
];
