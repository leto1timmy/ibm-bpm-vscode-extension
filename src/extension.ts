// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import BPMCompletionItemProvider from './features/completionItemProvider';
import BPMHoverItemProvider from './features/hoverProvider';


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	context.subscriptions.push(vscode.languages.registerHoverProvider('javascript', new BPMHoverItemProvider()));

	let startProvider = vscode.languages.registerCompletionItemProvider('javascript', {

		provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {

			const commitCharacterCompletion = new vscode.CompletionItem('tw');
			commitCharacterCompletion.commitCharacters = ['.'];
			commitCharacterCompletion.documentation = new vscode.MarkdownString('Press `.` to get `tw.`');

			const commandCompletion = new vscode.CompletionItem('new');
			commandCompletion.kind = vscode.CompletionItemKind.Keyword;
			commandCompletion.insertText = 'new ';
			commandCompletion.command = { command: 'editor.action.triggerSuggest', title: 'Re-trigger completions...' };

			return [
				commitCharacterCompletion,
				commandCompletion
			];
		}
	});

	const twApiProvider = vscode.languages.registerCompletionItemProvider('javascript', {
		provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
			let linePrefix = document.lineAt(position).text.substr(0, position.character);
			if (!linePrefix.endsWith('tw.')) {
				return undefined;
			}

			return [
				new vscode.CompletionItem('system', vscode.CompletionItemKind.Class),
				new vscode.CompletionItem('local', vscode.CompletionItemKind.Class),
				new vscode.CompletionItem('object', vscode.CompletionItemKind.Class)
			];
		}
	}, '.');
	context.subscriptions.push(startProvider, twApiProvider);
	context.subscriptions.push(vscode.languages.registerCompletionItemProvider('javascript', new BPMCompletionItemProvider(), '.'));


	// let provider1 = vscode.languages.registerCompletionItemProvider('javascript', {
	// 	provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {

	// a completion item that inserts its text as snippet,
	// the `insertText`-property is a `SnippetString` which we will
	// honored by the editor.
	// const snippetCompletion = new vscode.CompletionItem('Good part of the day');
	// snippetCompletion.insertText = new vscode.SnippetString('Good ${1|morning,afternoon,evening|}. It is ${1}, right?');
	// snippetCompletion.documentation = new vscode.MarkdownString("Inserts a snippet that lets you select the _appropriate_ part of the day for your greeting.");

	// a completion item that can be accepted by a commit character,
	// the `commitCharacters`-property is set which means that the completion will
	// be inserted and then the character will be typed.
	// const commitCharacterCompletion = new vscode.CompletionItem('console');
	// commitCharacterCompletion.commitCharacters = ['.'];
	// commitCharacterCompletion.documentation = new vscode.MarkdownString('Press `.` to get `console.`');

	// a completion item that retriggers IntelliSense when being accepted,
	// the `command`-property is set which the editor will execute after 
	// completion has been inserted. Also, the `insertText` is set so that 
	// a space is inserted after `new`
	// const commandCompletion = new vscode.CompletionItem('new');
	// commandCompletion.kind = vscode.CompletionItemKind.Keyword;
	// commandCompletion.insertText = 'new ';
	// commandCompletion.command = { command: 'editor.action.triggerSuggest', title: 'Re-trigger completions...' };

	// 		const twCharacterCompletion = new vscode.CompletionItem('tw');
	// 		twCharacterCompletion.commitCharacters = ['.'];
	// 		twCharacterCompletion.documentation = new vscode.MarkdownString('Press `.` to get `IBM BPM namespaces.`');

	// 		// return all completion items as array
	// 		return [
	// 			// simpleCompletion,
	// 			// snippetCompletion,
	// 			// commitCharacterCompletion,
	// 			// commandCompletion,
	// 			twCharacterCompletion
	// 		];
	// 	}
	// });

	// const twProvider = vscode.languages.registerCompletionItemProvider('javascript', {
	// 	provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {

	// 		const twCharacterCompletion = new vscode.CompletionItem('new');
	// 		twCharacterCompletion.kind = vscode.CompletionItemKind.Keyword;
	// 		twCharacterCompletion.insertText = 'new ';
	// 		twCharacterCompletion.command = { command: 'editor.action.triggerSuggest', title: 'Re-trigger completions...' };
	// 		twCharacterCompletion.commitCharacters = ['.'];

	// 		return [
	// 						// simpleCompletion,
	// 						// snippetCompletion,
	// 						// commitCharacterCompletion,
	// 						// commandCompletion,
	// 						twCharacterCompletion
	// 					];
	// 	}
	// },'.');
	// const provider2 = vscode.languages.registerCompletionItemProvider('javascript', {
	// 	provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
	// 		let linePrefix = document.lineAt(position).text.substr(0, position.character);
	// 		if (!linePrefix.endsWith('tw.')) {
	// 			return undefined;
	// 		}
	// 	}
	// },
	// 	'.' // triggered whenever a '.' is being typed
	// );



	console.log('Congratulations, your extension "ibm-bpm-vscode-extension" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	// let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
	// The code you place here will be executed every time your command is executed

	// Display a message box to the user
	// 	vscode.window.showInformationMessage('Hello World!');
	// });

	// context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
