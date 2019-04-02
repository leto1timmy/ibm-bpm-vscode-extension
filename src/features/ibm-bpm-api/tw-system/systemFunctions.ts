export interface IEntry { description?: string; signature?: string; }
export interface IEntries { [name: string]: IEntry; }

export const systemFunctions: IEntries = {
    findProcessInstanceByID: {
		description: 'Find Process by Instance ID',
	},
	startProcessByName: {
		description: 'Start Process by name',
	}
};