import {
	IExecuteSingleFunctions,
	IN8nHttpFullResponse,
	INodeExecutionData
} from 'n8n-workflow';


export async function cleanPeliqanTable(
	this: IExecuteSingleFunctions,
	items: INodeExecutionData[],
	_response: IN8nHttpFullResponse,
): Promise<INodeExecutionData[]> {
	return items.map((item) => {
		const { _group_info, _meta_data, ...cleanedJson } = item.json;
		return {
			...item,
			json: cleanedJson,
		};
	});
}

export async function formatLogsResponse(
	this: IExecuteSingleFunctions,
	items: INodeExecutionData[],
	_response: IN8nHttpFullResponse,
): Promise<INodeExecutionData[]> {
	return items.map((item) => {
		const rawLogs = item.json.logs;

		if (typeof rawLogs === 'string') {
			item.json.prettyLogs = rawLogs.split(/(\r\n|\n|\r)/);
		}

		return item;
	});
}

export async function formatApiRoutes(
	this: IExecuteSingleFunctions,
	items: INodeExecutionData[],
	_response: IN8nHttpFullResponse,
): Promise<INodeExecutionData[]> {
	const routeArray = items[0]?.json;

	if (!Array.isArray(routeArray)) {
		return [];
	}

	return routeArray.map(({ name, route, method }) => ({
		json: { name, route, method },
	}));
}
