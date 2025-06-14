import type {ILoadOptionsFunctions, INodePropertyOptions } from 'n8n-workflow';

import { peliqanApiRequest } from '../transport';

export async function getTables(this: ILoadOptionsFunctions) : Promise<INodePropertyOptions[]> {

    const response = await peliqanApiRequest.call(this, 'GET', 'api/applications/?');

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
	const response = await peliqanApiRequest.call(this, 'GET', 'api/applications');

	return response
		.filter((app: any) => app.is_datawarehouse === true && app.server?.id && app.name)
		.map((app: any) => ({
			name: app.name,
			value: app.server.id.toString(),
		}));
}


export async function getInterfaceRuns(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
    const response = await peliqanApiRequest.call(this, 'GET', 'api/interfaces/');

    const runs = response ?? [];

    const runOptions: INodePropertyOptions[] = [];

    for (const run of runs) {
        const id = run?.id;
        const name = run?.name;
        const runMode = run?.run_mode;

        if (id && name && runMode) {
            runOptions.push({
                name: name,
                value: id,
            });
        }
    }

    return runOptions;
}

export async function getPipelineRuns(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const response = await peliqanApiRequest.call(this, 'GET', 'api/servers');

	const servers = response ?? [];

	const options: INodePropertyOptions[] = [];

	for (const server of servers) {
		const id = server?.id;
		const name = server?.friendly_name;

		if (id && name && !server.pipeline_allowed) {
			options.push({
				name,
				value: id,
			});
		}
	}

	return options;
}

export async function getApiEndpoints(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const accountRes = await peliqanApiRequest.call(this, 'GET', 'api/user/account');
	const accountId = accountRes?.id;


	const endpoints = await peliqanApiRequest.call(this, 'GET', 'api/api_endpoints');

	if (!Array.isArray(endpoints)) return [];

	return endpoints.map(({ name, route, method }) => {
		const fullPath = `${accountId}${route}`;
		return {
			name: `${method} ${route}`,
			value: JSON.stringify({ method, url: fullPath }),
		};
	});
}
