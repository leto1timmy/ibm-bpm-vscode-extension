import { CompletionItemProvider, CompletionItem, CompletionItemKind, CancellationToken, TextDocument, Position, Range, TextEdit, workspace, CompletionContext } from 'vscode';
import twSystemFunctions = require('./ibm-bpm-api/tw-system/systemFunctions');
import twSystemVariables = require('./ibm-bpm-api/tw-system/systemVariables');
let fs = require('fs');
export interface IEntry { description?: string; signature?: string; }
export interface IEntries { [name: string]: IEntry; }
//import * as twSystemJSON from './ibm-bpm-api/tw-system/tw-system.json';


export default class BPMCompletionItemProvider implements CompletionItemProvider {
    provideCompletionItems(document: TextDocument, position: Position, token: CancellationToken, context: CompletionContext): Promise<CompletionItem[]> {
        const basicTypes = ["function", "string", "integer", "decimal", "date"];
        let result: CompletionItem[] = [];

        let createNewProposal = function (kind: CompletionItemKind, name: string, entry: twSystemVariables.IEntry | null): CompletionItem {
            let proposal: CompletionItem = new CompletionItem(name);
            proposal.kind = kind;
            proposal.commitCharacters = ['.'];
            proposal.documentation = "tmp documentation";

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
        
        // let shouldProvideCompletionItems = workspace.getConfiguration('javascript').get<boolean>('suggest.basic', true);
        // if (!shouldProvideCompletionItems) {
        // 	return Promise.resolve(result);
        // }

        let linePrefix = document.lineAt(position).text.substr(0, position.character);
        switch (linePrefix) {
            case "tw.system.":
                twSystem();
                break;
            default:
                return Promise.resolve(result);
        }

        function twSystem() {
            let json = JSON.parse(fs.readFileSync('/Users/marekmichalcewicz/ibm-bpm-vscode-extension/src/features/ibm-bpm-api/tw-system/tw-system.json', 'utf8'));

            let strArray = linePrefix.split('.');
            console.log(strArray);
            let jsonPath = "json";
            for (let index in strArray) {
                if (strArray[index].length === 0) {
                    break;
                }
                jsonPath = jsonPath + ("." + strArray[index]);
                let j = eval(jsonPath);
                if (j && j.type === "object") {
                    jsonPath = jsonPath + ".properties";
                }
                console.log("log jsonPath");
                console.log(jsonPath);
            }

            let names = Object.getOwnPropertyNames(eval(jsonPath));
            console.log(names);

            names.forEach(name => {
                let currObj = eval(jsonPath + '.' + name);
                let cItemKind = 0;
                switch (currObj.type) {
                    case "object":
                        cItemKind = CompletionItemKind.Variable;
                        break;
                    case "function":
                        cItemKind = CompletionItemKind.Function;
                        break;
                    default:
                        cItemKind = CompletionItemKind.Variable;
                }

                let x: IEntry = {};
                x.description = currObj.description;
                x.signature = "tmp qwe";
                result.push(createNewProposal(cItemKind, name, x));
            });
            console.log("result");
            console.log(result);
            return Promise.resolve(result);
        }

        // let prepareProposals = function (linePrefix: string): CompletionItem[] {
        //     let proposals: CompletionItem[] = [];

        //     proposals = 
        //     return proposals;
        // };
        // console.log(result);
        return Promise.resolve(result);
    }
}