import { CompletionItemProvider, CompletionItem, CompletionItemKind, CancellationToken, TextDocument, Position, Range, TextEdit, workspace, CompletionContext } from 'vscode';
import twSystemFunctions = require('./ibm-bpm-api/tw-system/systemFunctions');
import twSystemVariables = require('./ibm-bpm-api/tw-system/systemVariables');

export default class BPMCompletionItemProvider implements CompletionItemProvider {
    provideCompletionItems(document: TextDocument, position: Position, token: CancellationToken, context: CompletionContext): Promise<CompletionItem[]> {
        let result: CompletionItem[] = [];

        // let shouldProvideCompletionItems = workspace.getConfiguration('javascript').get<boolean>('suggest.basic', true);
		// if (!shouldProvideCompletionItems) {
		// 	return Promise.resolve(result);
        // }

        let added: any = {};
		let createNewProposal = function (kind: CompletionItemKind, name: string, entry: twSystemVariables.IEntry | null): CompletionItem {
			let proposal: CompletionItem = new CompletionItem(name);
			proposal.kind = kind;
			if (entry) {
				if (entry.description) {
					proposal.documentation = entry.description;
				}
				if (entry.signature) {
					proposal.detail = entry.signature;
				}
			}
			return proposal;
        };
        
        for (let systemFunctions in twSystemFunctions.systemFunctions) {
			if (twSystemFunctions.systemFunctions.hasOwnProperty(systemFunctions)) {
				added[systemFunctions] = true;
				result.push(createNewProposal(CompletionItemKind.Variable, systemFunctions, twSystemFunctions.systemFunctions[systemFunctions]));
			}
        }
        
        for (let systemVariables in twSystemVariables.systemVariables) {
			if (twSystemVariables.systemVariables.hasOwnProperty(systemVariables)) {
				added[systemVariables] = true;
				result.push(createNewProposal(CompletionItemKind.Variable, systemVariables, twSystemVariables.systemVariables[systemVariables]));
			}
        }
        console.log(result);
        return Promise.resolve(result);
    }
}