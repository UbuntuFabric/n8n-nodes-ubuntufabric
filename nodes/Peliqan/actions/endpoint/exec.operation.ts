import type { INodeProperties, IHttpRequestOptions} from 'n8n-workflow';

export const description: INodeProperties[] = [
  {
    displayName: 'API Endpoint Name or ID',
    name: 'selectedApiEndpoint',
    type: 'options',
				description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    typeOptions: {
      loadOptionsMethod: 'getApiEndpoints',
    },
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['endpoint'],
        operation: ['exec'],
      },
    },
  },
  {
    displayName: 'Execute API Endpoint',
    name: 'executeApiEndpoint',
    type: 'hidden',
    default: '',
    displayOptions: {
      show: {
        resource: ['endpoint'],
        operation: ['exec'],
      },
    },
    routing: {
      request: {
        method: '={{ JSON.parse($parameter.selectedApiEndpoint).method }}',
        url: '={{ "https://api.eu.peliqan.io/" + JSON.parse($parameter.selectedApiEndpoint).url }}',
      } as unknown as IHttpRequestOptions,
    },
}
];