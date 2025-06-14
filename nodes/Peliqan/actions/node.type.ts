import type { AllEntities } from 'n8n-workflow';

type NodeMap = {
	endpoint: 'exec';
	pipeline: 'run';
	query: 'exec' | 'create';
	script: 'logs' | 'run';
	table: 'get' | 'list';
};

export type PeliqanType = AllEntities<NodeMap>;
