/**
 * @what Vite plugin that auto-injects Fogó VSCode extension message listener
 * @why Eliminates manual script setup in every TanStack Start/Vite app
 * @exports fogoListener
 */

import type { Plugin } from 'vite';

/**
 * Vite plugin that injects Fogó listener script into HTML during development
 *
 * The listener receives picker script from Fogó VSCode extension via postMessage
 * and executes it to enable DOM element selection with clipboard export.
 *
 * @returns Vite plugin object
 *
 * @example
 * ```ts
 * // vite.config.ts
 * import { fogoListener } from '@nqh/vite-plugins/fogo-listener';
 *
 * export default defineConfig({
 *   plugins: [fogoListener()]
 * });
 * ```
 */
export function fogoListener(): Plugin {
  return {
    name: 'fogo-listener',
    apply: 'serve', // Dev mode only

    transformIndexHtml() {
      return [
        {
          tag: 'script',
          injectTo: 'head',
          children: `
            // Fogó VSCode Extension Listener
            window.addEventListener('message', (e) => {
              if (e.data.command === 'injectPickerScript') {
                try {
                  new Function(e.data.script)();
                  console.log('[Fogó] Picker script injected successfully');
                } catch (err) {
                  console.error('[Fogó] Injection failed:', err);
                }
              }
            });
          `,
        },
      ];
    },
  };
}
