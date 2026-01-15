import type {ILoadOptionsFunctions, INodePropertyOptions } from 'n8n-workflow';

import { ubuntufabricApiRequest } from '../transport';

export async function getTables(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
    const response = await ubuntufabricApiRequest.call(this, 'GET', 'api/applications/?');
	if (!Array.isArray(response)) return [];

    const tableOptions: Array<{ name: string; value: string }> = [];

    for (const app of response) {
        const tables = app.tables;
        if (!Array.isArray(tables)) continue;

        for (const table of tables) {
            const id = table.id;
            const name = table.name_in_query;
            if (id && name) {
                tableOptions.push({
                name,
                value: id.toString(),
                });
            }
        }
    }
    return tableOptions;
}


export async function getDataWarehouses(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const response = await ubuntufabricApiRequest.call(this, 'GET', 'api/applications');
	if (!Array.isArray(response)) return [];

	return response
		.filter((app: any) => app.is_datawarehouse === true && app.server?.id && app.name)
		.map((app: any) => ({
			name: app.name,
			value: app.server.id.toString(),
		}));
}


export async function getInterfaceRuns(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
    const response = await ubuntufabricApiRequest.call(this, 'GET', 'api/interfaces/');
	if (!Array.isArray(response)) return [];

	return response
		.filter((run: any) => run?.id && run?.name && run?.run_mode)
		.map((run: any) => ({ name: run.name, value: String(run.id) }));
}

export async function getPipelineRuns(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const response = await ubuntufabricApiRequest.call(this, 'GET', 'api/servers');
	if (!Array.isArray(response)) return [];

	return response
		.filter((srv: any) => srv?.id && srv?.friendly_name && !srv.pipeline_allowed)
		.map((srv: any) => ({ name: srv.friendly_name, value: String(srv.id) }));
}

export async function getApiEndpoints(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const accountRes = await ubuntufabricApiRequest.call(this, 'GET', 'api/user/account');
	const accountId = accountRes?.id;


	const endpoints = await ubuntufabricApiRequest.call(this, 'GET', 'api/api_endpoints');

	if (!Array.isArray(endpoints)) return [];

	return endpoints.map(({_, route, method }) => {
		const fullPath = `${accountId}${route}`;
		return {
			name: `${method} ${route}`,
			value: JSON.stringify({ method, url: fullPath }),
		};
	});
}
