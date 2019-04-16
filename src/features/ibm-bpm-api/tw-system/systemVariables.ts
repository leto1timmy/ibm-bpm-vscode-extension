export interface IEntry { description?: string; signature?: string; }
export interface IEntries { [name: string]: IEntry; }

export const systemVariables: IEntries = {
	tw: {
		description: "IBM BPM API basic variable"
	},
	system: {
		description: "system object"
	},
    currentProcessInstanceID: {
		description: 'Process Instance ID',
	},
	task_id: {
		description: 'Task ID',
	}
};
