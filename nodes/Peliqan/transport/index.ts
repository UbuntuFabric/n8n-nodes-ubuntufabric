import {
	type IDataObject,
	type IExecuteFunctions,
	type IPollFunctions,
	type ILoadOptionsFunctions,
	type IHttpRequestMethods,
	type IRequestOptions,
    NodeApiError,
} from 'n8n-workflow';


export async function peliqanApiRequest(
	this: IExecuteFunctions | ILoadOptionsFunctions | IPollFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	query?: IDataObject,
	uri?: string,
	option: IDataObject = {},
) {
	query = query || {};

	const options: IRequestOptions = {
		headers: {},
		method,
		body,
		qs: query,
		uri: uri || `https://app.ubuntufabric.io/${endpoint}`,
		useQuerystring: false,
		json: true,
	};

	if (Object.keys(option).length !== 0) {
		Object.assign(options, option);
	}

	if (Object.keys(body).length === 0) {
		delete options.body;
	}

    try {
		return await this.helpers.requestWithAuthentication.call(this, 'peliqanApi', options);
	} 
    catch (error) {
		throw new NodeApiError(this.getNode(), error, {
			message: error.message,
		});
	}
}
