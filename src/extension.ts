// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { json } from 'stream/consumers';
import * as vscode from 'vscode';


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	vscode.commands.registerCommand('tainter.addexpr', () => {
		let ext = context.extension;
		if (ext) {
			const grammarFilePath = ext.extensionPath + `\\syntaxes\\tainter_syntax.grammer.json`;
			if (grammarFilePath) {
				const grammarFileUri = vscode.Uri.file(grammarFilePath);
				vscode.workspace.fs.readFile(grammarFileUri).then(data => {
				const grammarContent = data.toString();
	
				const grammar = JSON.parse(grammarContent);
	
				const editor = vscode.window.activeTextEditor;
				if (editor) {
					const selection = editor.selection;
					let myExpr = editor.document.getText(selection);

					grammar.patterns.push({
						  match: myExpr,
						  name: 'expression.tainted'
					});
					
					const updatedGrammarContent = JSON.stringify(grammar, null, 2);
					const updatedGrammarBuffer = Buffer.from(updatedGrammarContent, 'utf8');
					vscode.workspace.fs.writeFile(grammarFileUri, updatedGrammarBuffer);
					vscode.commands.executeCommand("workbench.action.reloadWindow");
				}
			});
		}
	}
	});

	vscode.commands.registerCommand('tainter.tclean', () => {
		let ext = context.extension;
		if (ext) {
			const grammarFilePath = ext.extensionPath + `\\syntaxes\\tainter_syntax.grammer.json`;
			if (grammarFilePath) {
				const grammarFileUri = vscode.Uri.file(grammarFilePath);
				vscode.workspace.fs.readFile(grammarFileUri).then(data => {
				const grammarContent = data.toString();
	
				const grammar = JSON.parse(grammarContent);
	
				const editor = vscode.window.activeTextEditor;
				if (editor) {
					const selection = editor.selection;
					let myExpr = editor.document.getText(selection);

					grammar.patterns = [];
					
					const updatedGrammarContent = JSON.stringify(grammar, null, 2);
					const updatedGrammarBuffer = Buffer.from(updatedGrammarContent, 'utf8');
					vscode.workspace.fs.writeFile(grammarFileUri, updatedGrammarBuffer);
					vscode.commands.executeCommand("workbench.action.reloadWindow");
				}
			});
		}
	}
	});
}

export function deactivate() {}
