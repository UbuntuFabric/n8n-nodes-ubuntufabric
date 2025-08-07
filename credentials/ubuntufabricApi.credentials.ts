import {
	IAuthenticateGeneric,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class UbuntuFabricApi implements ICredentialType {
	name = 'ubuntufabricApi';
	displayName = 'UbuntuFabric API';
	documentationUrl = 'https://help.ubuntufabric.io';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
	];
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'Authorization': '={{"JWT " + $credentials.apiKey}}',
			}
		},
	};
}
