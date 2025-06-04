import {
	IAuthenticateGeneric,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class PeliqanApi implements ICredentialType {
	name = 'peliqanApi';
	displayName = 'Peliqan API';
	documentationUrl = 'https://help.peliqan.io';
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
