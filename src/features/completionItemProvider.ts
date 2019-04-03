import { CompletionItemProvider, CompletionItem, CompletionItemKind, CancellationToken, TextDocument, Position, Range, TextEdit, workspace, CompletionContext } from 'vscode';
import twSystemFunctions = require('./ibm-bpm-api/tw-system/systemFunctions');
import twSystemVariables = require('./ibm-bpm-api/tw-system/systemVariables');
let fs = require('fs');
export interface IEntry { description?: string; signature?: string; }
export interface IEntries { [name: string]: IEntry; }
//import * as twSystemJSON from './ibm-bpm-api/tw-system/tw-system.json';


export default class BPMCompletionItemProvider implements CompletionItemProvider {
    provideCompletionItems(document: TextDocument, position: Position, token: CancellationToken, context: CompletionContext): Promise<CompletionItem[]> {

        let result: CompletionItem[] = [];
        let json = JSON.parse(fs.readFileSync('/Users/marekmichalcewicz/ibm-bpm-vscode-extension/src/features/ibm-bpm-api/tw-system/tw-system.json', 'utf8'));
        console.log(json);
        // let shouldProvideCompletionItems = workspace.getConfiguration('javascript').get<boolean>('suggest.basic', true);
        // if (!shouldProvideCompletionItems) {
        // 	return Promise.resolve(result);
        // }

        let linePrefix = document.lineAt(position).text.substr(0, position.character);
        // if (!linePrefix.endsWith('tw.system.')) {
        //     return Promise.resolve(result);
        // }

        let strArray = linePrefix.split('.');

        if (strArray[strArray.length - 1].length === 0) {

            console.log(strArray);
            let jsonPath = "json";
            for (let index in strArray) {
                if (strArray[index].length === 0) {
                    break;
                }
                console.log(index);
                console.log(strArray[index]);
                // try {json = json.strArray[index];} catch(e) {
                //     console.log(e);
                // }
                jsonPath = jsonPath + ("." + strArray[index]);


                console.log(jsonPath);

            }




            //let added: any = {};
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


            let names = Object.getOwnPropertyNames(eval(jsonPath));
            console.log(names);

            names.forEach(name => {
                let x: IEntry = {};
                x.description = "asd";
                x.signature = "qwe";
                result.push(createNewProposal(CompletionItemKind.Variable, name, x));
            });

            // for (let name in names) {
            //     let x: IEntry = {};
            //     x.description = "asd";
            //     x.signature = "qwe";
            //     result.push(createNewProposal(CompletionItemKind.Variable, name, x));

            // }


            // let prepareProposals = function (linePrefix: string): CompletionItem[] {
            //     let proposals: CompletionItem[] = [];

            //     proposals = 
            //     return proposals;
            // };


            // for (let systemFunctions in twSystemFunctions.systemFunctions) {
            //     if (twSystemFunctions.systemFunctions.hasOwnProperty(systemFunctions)) {
            //         added[systemFunctions] = true;
            //         result.push(createNewProposal(CompletionItemKind.Function, systemFunctions, twSystemFunctions.systemFunctions[systemFunctions]));
            //     }
            // }

            // for (let systemVariables in twSystemVariables.systemVariables) {
            //     if (twSystemVariables.systemVariables.hasOwnProperty(systemVariables)) {
            //         added[systemVariables] = true;
            //         result.push(createNewProposal(CompletionItemKind.Variable, systemVariables, twSystemVariables.systemVariables[systemVariables]));
            //     }
            // }
        }
        console.log(result);
            return Promise.resolve(result);
    }
}