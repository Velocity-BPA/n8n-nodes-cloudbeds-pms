import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class CloudbedsPMSApi implements ICredentialType {
	name = 'cloudbedsPMSApi';
	displayName = 'Cloudbeds PMS API';
	documentationUrl = 'https://docs.n8n.io/credentials/cloudbeds';
	properties: INodeProperties[] = [
		{
			displayName: 'Grant Type',
			name: 'grantType',
			type: 'hidden',
			default: 'authorizationCode',
		},
		{
			displayName: 'Authorization URL',
			name: 'authUrl',
			type: 'hidden',
			default: 'https://hotels.cloudbeds.com/api/v1.1/oauth',
		},
		{
			displayName: 'Access Token URL',
			name: 'accessTokenUrl',
			type: 'hidden',
			default: 'https://api.cloudbeds.com/api/v1.1/access_token',
		},
		{
			displayName: 'Scope',
			name: 'scope',
			type: 'hidden',
			default: '',
		},
		{
			displayName: 'Auth URI Query Parameters',
			name: 'authQueryParameters',
			type: 'hidden',
			default: '',
		},
		{
			displayName: 'Authentication',
			name: 'authentication',
			type: 'hidden',
			default: 'body',
		},
		{
			displayName: 'Client ID',
			name: 'clientId',
			type: 'string',
			default: '',
			required: true,
		},
		{
			displayName: 'Client Secret',
			name: 'clientSecret',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
		},
		{
			displayName: 'API Base URL',
			name: 'apiBaseUrl',
			type: 'string',
			default: 'https://api.cloudbeds.com/api/v1.1',
			required: true,
			description: 'Base URL for the Cloudbeds PMS API',
		},
	];
}