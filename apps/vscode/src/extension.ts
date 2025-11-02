/**
 * Fogó VSCode Extension - Main Entry Point
 *
 * @what VSCode extension activation and command registration
 * @why Entry point for DOM element picker with clipboard export (FR-001: Command registration)
 * @exports activate, deactivate
 */

import * as vscode from 'vscode';
import { PreviewProvider } from '@/preview-provider';

let previewProvider: PreviewProvider | undefined;

/**
 * Activates the extension when VSCode starts or command is triggered
 */
export function activate(context: vscode.ExtensionContext): void {
  // Initialize preview provider
  previewProvider = new PreviewProvider();

  // Register command: Start Preview
  const startPreviewCommand = vscode.commands.registerCommand('fogo.startPreview', async () => {
    if (!previewProvider) {
      vscode.window.showErrorMessage('Preview provider not initialized');
      return;
    }

    const url = await vscode.window.showInputBox({
      prompt: 'Enter URL to preview',
      placeHolder: 'http://localhost:3000',
      validateInput: value => {
        try {
          new URL(value);
          return null;
        } catch {
          return 'Please enter a valid URL';
        }
      },
    });

    if (url) {
      previewProvider.createPanel(url);
    }
  });

  // Register command: Toggle Picker
  const togglePickerCommand = vscode.commands.registerCommand('fogo.togglePicker', () => {
    if (!previewProvider) {
      vscode.window.showErrorMessage('Preview provider not initialized');
      return;
    }
    previewProvider.togglePicker();
  });

  // Register command: Reload Preview
  const reloadPreviewCommand = vscode.commands.registerCommand('fogo.reloadPreview', () => {
    if (!previewProvider) {
      vscode.window.showErrorMessage('Preview provider not initialized');
      return;
    }
    previewProvider.reloadPreview();
  });

  // Add commands to subscriptions for cleanup
  context.subscriptions.push(startPreviewCommand, togglePickerCommand, reloadPreviewCommand);
}

/**
 * Deactivates the extension and cleans up resources
 */
export function deactivate(): void {
  if (previewProvider) {
    previewProvider.dispose();
    previewProvider = undefined;
  }
}
