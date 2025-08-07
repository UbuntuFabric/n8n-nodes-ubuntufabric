// run.operation.ts (Endpoint Exec)
import type {
	IExecuteFunctions,
	INodeExecutionData,
	IHttpRequestMethods,
	INodeProperties,
	IDataObject,
} from 'n8n-workflow';

import { ubuntufabricApiRequest } from '../../transport';

export const description: INodeProperties[] = [
	{
		displayName: 'API Endpoint Name or ID',
		name: 'selectedApiEndpoint',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getApiEndpoints',
		},
		default: '',
		required: true,
		description: 'Select an API endpoint to execute. Choose from the list, or specify an expression. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		displayOptions: {
			show: {
				resource: ['endpoint'],
				operation: ['exec'],
			},
		},
	},
	{
		displayName: 'Use Custom Body',
		name: 'useCustomBody',
		type: 'boolean',
		default: false,
		description: 'Whether to send a custom request body',
		displayOptions: {
			show: {
				resource: ['endpoint'],
				operation: ['exec'],
			},
		},
	},
	{
		displayName: 'Custom Body',
		name: 'customBody',
		type: 'json',
		default: '',
		description: 'Optional body to include in the request',
		displayOptions: {
			show: {
				resource: ['endpoint'],
				operation: ['exec'],
				useCustomBody: [true],
			},
		},
	},
];

export const execute = async function (
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const selected = this.getNodeParameter('selectedApiEndpoint', index) as string;
	const useCustomBody = this.getNodeParameter('useCustomBody', index) as boolean;
	const body = useCustomBody
		? (this.getNodeParameter('customBody', index) as IDataObject)
		: {};

	let method: IHttpRequestMethods;
	let fullUrl: string;

	try {
		const parsed = JSON.parse(selected) as { method: string; url: string };
		method = parsed.method as IHttpRequestMethods;
		fullUrl = `https://api.eu.peliqan.io/${parsed.url}`;
	} catch (error) {
		throw new Error('Invalid API endpoint selection.');
	}

	const response = await ubuntufabricApiRequest.call(
		this,
		method,
		'',
		body,
		undefined,
		fullUrl,
	);

	return [{ json: response }];
};
