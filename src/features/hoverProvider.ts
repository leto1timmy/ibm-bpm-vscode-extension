import { HoverProvider, Hover, MarkedString, TextDocument, CancellationToken, Position, workspace } from 'vscode';
import { textToMarkedString } from './utils/markedTextUtil';
import twSystemVariables = require('./ibm-bpm-api/tw-system/systemVariables');
//import bpm global functions

export default class BPMHoverProvider implements HoverProvider {

    provideHover(document: TextDocument, position: Position, token: CancellationToken): Hover | undefined {

        let enable = workspace.getConfiguration('javascript').get('suggest.basic', true);
        if (!enable) {
            return undefined;
        }

        let wordRange = document.getWordRangeAtPosition(position);
        if (!wordRange) {
            return undefined;
        }

        let name = document.getText(wordRange);

        let entry = twSystemVariables.systemVariables[name];

        console.log('name', name);
        console.log('entry', entry);
        if (entry && entry.description) {
            let signature = name + (entry.signature || '');
            let contents: MarkedString[] = [textToMarkedString(entry.description), {language: 'javascript', value: signature}];
            return new Hover(contents, wordRange);
        }
        return undefined;
    }
    
}