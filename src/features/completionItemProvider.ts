import { CompletionItemProvider, CompletionItem, CompletionItemKind, CancellationToken, TextDocument, Position, Range, TextEdit, workspace, CompletionContext } from 'vscode';


export default class BPMCompletionItemProvider implements CompletionItemProvider {
    provideCompletionItems(document: TextDocument, position: Position, token: CancellationToken, context: CompletionContext): import("vscode").ProviderResult<CompletionItem[] | import("vscode").CompletionList> {
        throw new Error("Method not implemented.");
    }

}