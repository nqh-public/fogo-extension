/**
 * Fogó VSCode Extension - Preview Provider
 *
 * @what Webview panel management for web page preview
 * @why Manages panel lifecycle and extension-webview communication (FR-003: Webview panel creation)
 * @exports PreviewProvider
 */

import { randomBytes } from 'crypto';
import * as vscode from 'vscode';
import type { DOMElementReference } from '@fogo/core';
import { formatMarkdown } from '@fogo/core';
import { NONCE_LENGTH } from './constants';
import { generatePickerScript } from './picker-script';

/**
 * Manages webview panel for web page preview with element picker
 */
export class PreviewProvider {
  private panel?: vscode.WebviewPanel;
  private currentUrl?: string;

  /**
   * Creates a new webview panel with the specified URL
   */
  public createPanel(url: string): void {
    // Dispose existing panel if present
    if (this.panel) {
      this.panel.dispose();
    }

    // Store URL for reload functionality
    this.currentUrl = url;

    // Create webview panel
    this.panel = vscode.window.createWebviewPanel(
      'fogo.preview',
      'Selecto Preview',
      vscode.ViewColumn.Two,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
      }
    );

    // Set initial HTML content
    this.panel.webview.html = this.getWebviewHtml(url);

    // Handle messages from webview
    this.panel.webview.onDidReceiveMessage(async (message) => {
      switch (message.command) {
        case 'activatePicker':
          // Inject picker script into iframe
          if (!this.panel) {
            vscode.window.showErrorMessage('No preview panel is active');
            break;
          }
          try {
            const pickerScript = generatePickerScript();
            await this.panel.webview.postMessage({
              command: 'injectPickerScript',
              script: pickerScript,
            });
          } catch (error) {
            vscode.window.showErrorMessage(
              `Failed to activate picker: ${error instanceof Error ? error.message : 'Unknown error'}`
            );
          }
          break;

        case 'elementSelected':
          // Copy element data to clipboard as markdown
          if (message.data) {
            try {
              const markdown = this.formatAsMarkdown(message.data);
              await vscode.env.clipboard.writeText(markdown);
              vscode.window.showInformationMessage('Copied DOM reference to clipboard!');
            } catch (error) {
              vscode.window.showErrorMessage(
                `Failed to copy to clipboard: ${error instanceof Error ? error.message : 'Unknown error'}`
              );
            }
          }
          break;

        case 'pickerError':
          // Show error notification
          vscode.window.showErrorMessage(
            `Picker error: ${message.error || 'Unknown error'}`
          );
          break;

        case 'iframeDetected':
          // Warn user about iframe limitation
          vscode.window.showWarningMessage(
            'Iframe content not selectable (same-origin restriction)'
          );
          break;

        case 'pickerDeactivated':
          // Picker was deactivated via ESC key, no action needed
          break;
      }
    });

    // Handle panel disposal
    this.panel.onDidDispose(() => {
      this.panel = undefined;
    });
  }

  /**
   * Generates HTML content for webview panel
   */
  private getWebviewHtml(url: string): string {
    // Generate nonce for CSP
    const nonce = this.generateNonce();

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; frame-src ${url} http: https:; script-src 'nonce-${nonce}'; style-src 'unsafe-inline';">
  <title>Selecto Preview</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { width: 100vw; height: 100vh; overflow: hidden; display: flex; flex-direction: column; }
    #toolbar { display: flex; align-items: center; gap: 8px; padding: 8px; background: var(--vscode-editor-background); border-bottom: 1px solid var(--vscode-panel-border); }
    #picker-button { padding: 6px 12px; background: var(--vscode-button-background); color: var(--vscode-button-foreground); border: none; cursor: pointer; font-size: 14px; }
    #picker-button:hover { background: var(--vscode-button-hoverBackground); }
    #picker-button.active { background: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); }
    #preview-iframe { flex: 1; width: 100%; height: 100%; border: none; }
  </style>
</head>
<body>
  <div id="toolbar">
    <button id="picker-button" title="Toggle element picker (or press ESC to exit)">
      🎯 Pick Element
    </button>
  </div>
  <iframe id="preview-iframe" src="${url}" sandbox="allow-scripts allow-same-origin allow-forms allow-popups"></iframe>

  <script nonce="${nonce}">
    (function() {
      const vscode = acquireVsCodeApi();
      const pickerButton = document.getElementById('picker-button');
      const iframe = document.getElementById('preview-iframe');
      let pickerActive = false;
      let pickerScriptInjected = false;

      // Wait for iframe to load before enabling picker
      iframe.addEventListener('load', () => {
        console.log('[Fogó] Iframe loaded, ready for picker injection');
        pickerScriptInjected = false; // Reset on reload
      });

      // Handle picker button click
      pickerButton.addEventListener('click', () => {
        pickerActive = !pickerActive;
        pickerButton.classList.toggle('active', pickerActive);

        if (pickerActive) {
          // Request picker script injection from extension
          vscode.postMessage({ command: 'activatePicker' });
        } else {
          // Deactivate picker in iframe
          try {
            iframe.contentWindow.postMessage({ command: 'deactivatePicker' }, '*');
          } catch (e) {
            console.error('[Fogó] Failed to deactivate picker:', e);
          }
        }
      });

      // Listen for messages from extension (script injection)
      window.addEventListener('message', (event) => {
        const message = event.data;

        if (message.command === 'injectPickerScript') {
          try {
            // Send injection request to iframe via postMessage
            // The iframe's app must have a listener for this message
            iframe.contentWindow.postMessage({
              command: 'injectPickerScript',
              script: message.script
            }, '*');
            pickerScriptInjected = true;
            console.log('[Fogó] Picker script injection message sent to iframe');
          } catch (error) {
            console.error('[Fogó] Failed to send injection message:', error);
            vscode.postMessage({
              command: 'pickerError',
              error: 'Failed to send injection message: ' + error.message
            });
            pickerActive = false;
            pickerButton.classList.remove('active');
          }
        }
      });

      // Listen for messages from iframe (element selection, errors)
      window.addEventListener('message', (event) => {
        // Only process messages from iframe
        if (event.source !== iframe.contentWindow) return;

        const message = event.data;

        // Forward to extension for handling
        if (message.command === 'elementSelected' ||
            message.command === 'pickerError' ||
            message.command === 'iframeDetected' ||
            message.command === 'pickerDeactivated') {
          vscode.postMessage(message);

          // Update button state on deactivation
          if (message.command === 'pickerDeactivated') {
            pickerActive = false;
            pickerButton.classList.remove('active');
          }
        }
      });
    })();
  </script>
</body>
</html>`;
  }

  /**
   * Generates a cryptographically secure random nonce for CSP
   * Uses Node.js crypto module for strong entropy
   */
  private generateNonce(): string {
    return randomBytes(NONCE_LENGTH / 2).toString('base64');
  }

  /**
   * Formats element data as markdown for AI context
   * Delegates to shared utility function
   */
  private formatAsMarkdown(element: DOMElementReference): string {
    return formatMarkdown(element);
  }

  /**
   * Toggles picker mode in webview
   */
  public togglePicker(): void {
    if (!this.panel) {
      vscode.window.showErrorMessage('No preview panel is active');
      return;
    }

    // Send toggle message to webview (webview script handles state)
    this.panel.webview.postMessage({ type: 'togglePicker' });
  }

  /**
   * Reloads webview content
   */
  public reloadPreview(): void {
    if (!this.panel) {
      vscode.window.showErrorMessage('No preview panel is active');
      return;
    }

    if (!this.currentUrl) {
      vscode.window.showErrorMessage('No URL to reload');
      return;
    }

    // Regenerate webview HTML with current URL
    this.panel.webview.html = this.getWebviewHtml(this.currentUrl);
    vscode.window.showInformationMessage('Preview reloaded');
  }

  /**
   * Cleans up webview panel resources
   */
  public dispose(): void {
    if (this.panel) {
      this.panel.dispose();
      this.panel = undefined;
    }
  }
}
