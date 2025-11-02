/**
 * Fogó Browser Extension - Background Service Worker
 *
 * @what Handles toolbar clicks, keyboard shortcuts, context menu, and clipboard
 * @why Service worker runs independently, coordinates between content scripts
 * @date 2025-11-01
 */

import { formatMarkdown } from './background/markdown.js';

// Extension state (persisted in storage)
let extensionEnabled = true;

// Initialize state and badge on startup
chrome.runtime.onStartup.addListener(async () => {
  const { enabled = true } = await chrome.storage.local.get('enabled');
  extensionEnabled = enabled;
  updateBadge();
});

// Initialize on installation
chrome.runtime.onInstalled.addListener(async () => {
  // Set default enabled state
  await chrome.storage.local.set({ enabled: true });
  extensionEnabled = true;
  updateBadge();

  // Create context menu
  chrome.contextMenus.create({
    id: 'fogo-pick-element',
    title: 'Pick Element with Fogó',
    contexts: ['page'],
  });
});

// Update badge to show ON/OFF state
async function updateBadge() {
  if (extensionEnabled) {
    await chrome.action.setBadgeText({ text: 'ON' });
    await chrome.action.setBadgeBackgroundColor({ color: '#10b981' });
  } else {
    await chrome.action.setBadgeText({ text: 'OFF' });
    await chrome.action.setBadgeBackgroundColor({ color: '#6b7280' });
  }
}

// Toolbar icon click handler - toggles extension ON/OFF
chrome.action.onClicked.addListener(async () => {
  // Toggle extension state
  extensionEnabled = !extensionEnabled;
  await chrome.storage.local.set({ enabled: extensionEnabled });
  updateBadge();

  // Notify all tabs about state change
  const tabs = await chrome.tabs.query({});
  for (const tab of tabs) {
    try {
      await chrome.tabs.sendMessage(tab.id, {
        action: 'extensionStateChanged',
        enabled: extensionEnabled,
      });
    } catch {
      // Tab doesn't have content script, ignore
    }
  }
});

// Context menu click handler
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === 'fogo-pick-element') {
    if (!extensionEnabled) {
      // Show notification that extension is disabled
      chrome.notifications.create({
        type: 'basic',
        title: 'Fogó Disabled',
        message: 'Click the toolbar icon to enable Fogó',
      });
      return;
    }

    try {
      await chrome.tabs.sendMessage(tab.id, { action: 'activate' });
    } catch (error) {
      console.error('[Fogó] Failed to activate picker:', error);
    }
  }
});

// Keyboard shortcut handler
chrome.commands.onCommand.addListener(async command => {
  if (command === 'activate-picker') {
    if (!extensionEnabled) {
      // Show notification that extension is disabled
      chrome.notifications.create({
        type: 'basic',
        title: 'Fogó Disabled',
        message: 'Click the toolbar icon to enable Fogó',
      });
      return;
    }

    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tab?.id) {
        // Check if content script is loaded
        try {
          await chrome.tabs.sendMessage(tab.id, { action: 'toggle' });
        } catch {
          // Content script not loaded (restricted page or not yet injected)
          chrome.notifications.create({
            type: 'basic',
            title: 'Fogó Unavailable',
            message: 'Cannot activate on this page (restricted or not loaded)',
          });
        }
      }
    } catch (error) {
      console.error('[Fogó] Failed to handle keyboard shortcut:', error);
    }
  }
});

// Receive picked element data from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'elementPicked') {
    handleElementPicked(message.data)
      .then(() => {
        sendResponse({ success: true });
      })
      .catch(error => {
        console.error('[Fogó] Failed to handle element:', error);
        sendResponse({ success: false, error: error.message });
      });
    return true; // Keep message channel open for async response
  }
});

/**
 * Handle picked element: copy to clipboard and show toast notification
 * @param {Object} data - Element data with pageTitle and url
 */
async function handleElementPicked(data) {
  // Format markdown
  const markdown = formatMarkdown(data);

  // Send to content script to show toast and handle clipboard
  chrome.tabs.query({ active: true, currentWindow: true }, async tabs => {
    if (tabs[0]?.id) {
      await chrome.tabs.sendMessage(tabs[0].id, {
        action: 'showToast',
        markdown: markdown,
        elementData: data,
      });
    }
  });
}
