import {
  INodeType,
  INodeTypeDescription,
  IExecuteFunctions
} from 'n8n-workflow';

import { loadOptions } from './methods';

import * as endpoint from './actions/endpoint/Endpoint.resource'
import * as pipeline from './actions/pipeline/Pipeline.resource'
import * as query from './actions/query/Query.resource'
import { router } from './actions/router';
import * as script from './actions/script/Script.resource'
import * as table from './actions/table/Table.resource'

export class UbuntuFabric implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'UbuntuFabric',
    name: 'ubuntufabric',
    icon: 'file:UbuntuFabric.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Get data from UF',
    defaults: {
      name: 'UbuntuFabric',
    },
    usableAsTool: true, 
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'ubuntufabricApi',
        required: true,
      },
    ],
    requestDefaults: {
      baseURL: 'https://app.ubuntufabric.io/',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    },
    properties: [
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [
          {
            name: 'Endpoint',
            value: 'endpoint'
          },
          {
            name: 'Pipeline',
            value: 'pipeline'
          },
          {
            name: 'Query',
            value: 'query'
          },
          {
            name: 'Script',
            value: 'script'
          },
          {
            name: 'Table',
            value: 'table',
          },

        ],
        default: 'table',
      },
      ...endpoint.description,
      ...pipeline.description,
      ...query.description,
      ...script.description,
      ...table.description,
    ],

  };
  
  methods = { loadOptions }
  
	async execute(this: IExecuteFunctions) {
		return await router.call(this);
	}

  
};

