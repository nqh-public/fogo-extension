/**
 * Fogó Browser Extension - Content Script
 *
 * @what DOM element picker that runs in webpage context
 * @why Browser extension content script with message passing to background
 * @date 2025-11-01
 */

import { showToast } from './toast.js';
import { extractElementData } from './utils.js';
import { OUTLINE_COLOR, OUTLINE_WIDTH } from '../shared/constants.js';

// Picker state
const state = {
  active: false,
  hoveredElement: null,
  previousOutline: '',
};

// Activate picker
function activatePicker() {
  if (state.active) return;

  state.active = true;
  document.body.style.cursor = 'crosshair';

  // Attach event listeners
  document.addEventListener('mouseover', handleMouseOver);
  document.addEventListener('mouseout', handleMouseOut);
  document.addEventListener('click', handleClick, true); // Capture phase
  document.addEventListener('keydown', handleKeyDown);
}

// Deactivate picker
function deactivatePicker() {
  if (!state.active) return;

  state.active = false;
  document.body.style.cursor = '';

  // Restore outline if element still hovered
  if (state.hoveredElement) {
    state.hoveredElement.style.outline = state.previousOutline;
    state.hoveredElement = null;
  }

  // Remove event listeners
  document.removeEventListener('mouseover', handleMouseOver);
  document.removeEventListener('mouseout', handleMouseOut);
  document.removeEventListener('click', handleClick, true);
  document.removeEventListener('keydown', handleKeyDown);
}

// Toggle picker
function togglePicker() {
  if (state.active) {
    deactivatePicker();
  } else {
    activatePicker();
  }
}

// Mouseover handler: Apply red outline
function handleMouseOver(event) {
  if (!state.active) return;

  const target = event.target;

  // Skip body element
  if (target.tagName.toLowerCase() === 'body') {
    return;
  }

  // Store original outline and apply highlight
  state.previousOutline = target.style.outline;
  target.style.outline = OUTLINE_WIDTH + ' solid ' + OUTLINE_COLOR;
  state.hoveredElement = target;
}

// Mouseout handler: Remove red outline
function handleMouseOut(event) {
  if (!state.active) return;

  const target = event.target;

  // Restore original outline
  if (state.hoveredElement === target) {
    target.style.outline = state.previousOutline;
    state.hoveredElement = null;
    state.previousOutline = '';
  }
}

// Click handler: Extract element data and send to background
function handleClick(event) {
  if (!state.active) return;

  // Prevent default behavior and stop propagation
  event.preventDefault();
  event.stopPropagation();

  const target = event.target;

  // Extract element data
  try {
    const elementData = extractElementData(target);

    // Send to background script
    chrome.runtime.sendMessage({
      action: 'elementPicked',
      data: elementData,
    });

    // Deactivate picker after successful selection
    deactivatePicker();
  } catch (error) {
    console.error('[Fogó] Extraction error:', error);
    alert('Fogó: ' + (error.message || 'Unknown error during element extraction'));
  }
}

// ESC key handler: Deactivate picker
function handleKeyDown(event) {
  if (!state.active) return;

  // Check for ESC key
  if (event.keyCode === 27 || event.key === 'Escape') {
    deactivatePicker();
  }
}

// Listen for messages from background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'toggle') {
    togglePicker();
    sendResponse({ active: state.active });
  } else if (message.action === 'activate') {
    activatePicker();
    sendResponse({ active: state.active });
  } else if (message.action === 'deactivate') {
    deactivatePicker();
    sendResponse({ active: state.active });
  } else if (message.action === 'extensionStateChanged') {
    // Extension was disabled/enabled via toolbar badge
    if (!message.enabled && state.active) {
      // Extension disabled while picker active - deactivate picker
      deactivatePicker();
    }
    sendResponse({ active: state.active });
  } else if (message.action === 'showToast') {
    // Show sonner-style toast notification
    showToast(message.markdown, message.elementData);
    sendResponse({ success: true });
  }
  return true; // Keep message channel open for async response
});
