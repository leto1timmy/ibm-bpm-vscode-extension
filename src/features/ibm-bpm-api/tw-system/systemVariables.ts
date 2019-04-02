export interface IEntry { description?: string; signature?: string; }
export interface IEntries { [name: string]: IEntry; }

export const systemVariables: IEntries = {
    currentProcessInstanceID: {
		description: 'Process Instance ID',
	},
	task_id: {
		description: 'Task ID',
	}
};
