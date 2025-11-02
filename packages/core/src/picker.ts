/**
 * Fogó Core - Picker Module
 *
 * @what Core picker state management and event handling
 * @why Provides shared picker logic for VSCode and Chrome extensions
 * @exports activatePicker, deactivatePicker, PickerCallbacks
 */

import { OUTLINE_COLOR, OUTLINE_WIDTH } from './constants';
import { extractElementData } from './element-extractor';
import type { DOMElementReference, PickerState } from './types';

/**
 * Callbacks for picker events
 */
export interface PickerCallbacks {
  /** Called when user selects an element (click) */
  onElementSelected: (data: DOMElementReference) => void;
  /** Called when picker encounters an error */
  onError: (error: string) => void;
  /** Called when picker is deactivated (ESC key) */
  onDeactivated?: () => void;
}

/** Internal picker state */
const state: PickerState = {
  active: false,
  hoveredElement: null,
  previousOutline: undefined,
};

/** Stored callbacks */
let callbacks: PickerCallbacks | null = null;

/**
 * Mouse over handler - highlights element
 */
function handleMouseOver(event: MouseEvent): void {
  if (!state.active) return;

  const target = event.target as HTMLElement;
  if (!target) return;

  // Save previous outline
  state.previousOutline = target.style.outline;
  state.hoveredElement = target;

  // Apply highlight
  target.style.outline = `${OUTLINE_WIDTH} solid ${OUTLINE_COLOR}`;
}

/**
 * Mouse out handler - restores original outline
 */
function handleMouseOut(event: MouseEvent): void {
  if (!state.active || !state.hoveredElement) return;

  const target = event.target as HTMLElement;
  if (!target) return;

  // Restore original outline
  if (state.previousOutline !== undefined) {
    target.style.outline = state.previousOutline;
  }
}

/**
 * Click handler - extracts element data and sends to callback
 */
function handleClick(event: MouseEvent): void {
  if (!state.active) return;

  event.preventDefault();
  event.stopPropagation();

  const target = event.target as HTMLElement;
  if (!target) return;

  try {
    // Extract element data
    const elementData = extractElementData(target, {
      pageTitle: document.title,
      url: window.location.href,
    });

    // Send to callback
    if (callbacks?.onElementSelected) {
      callbacks.onElementSelected(elementData);
    }

    // Deactivate picker
    deactivatePicker();
  } catch (error) {
    if (callbacks?.onError) {
      callbacks.onError(error instanceof Error ? error.message : 'Unknown error');
    }
  }
}

/**
 * Keydown handler - ESC to deactivate
 */
function handleKeyDown(event: KeyboardEvent): void {
  if (!state.active) return;

  if (event.key === 'Escape') {
    event.preventDefault();
    deactivatePicker();
    if (callbacks?.onDeactivated) {
      callbacks.onDeactivated();
    }
  }
}

/**
 * Activate picker mode
 *
 * Adds event listeners for hover and click
 *
 * @param pickerCallbacks - Callbacks for picker events
 */
export function activatePicker(pickerCallbacks: PickerCallbacks): void {
  if (state.active) return;

  state.active = true;
  callbacks = pickerCallbacks;

  // Add event listeners (capture phase to intercept before other handlers)
  document.addEventListener('mouseover', handleMouseOver, true);
  document.addEventListener('mouseout', handleMouseOut, true);
  document.addEventListener('click', handleClick, true);
  document.addEventListener('keydown', handleKeyDown, true);

  console.log('[Fogó Picker] Activated');
}

/**
 * Deactivate picker mode
 *
 * Removes event listeners and restores UI
 */
export function deactivatePicker(): void {
  if (!state.active) return;

  // Restore outline if element is still hovered
  if (state.hoveredElement && state.previousOutline !== undefined) {
    state.hoveredElement.style.outline = state.previousOutline;
  }

  // Reset state
  state.active = false;
  state.hoveredElement = null;
  state.previousOutline = undefined;
  callbacks = null;

  // Remove event listeners
  document.removeEventListener('mouseover', handleMouseOver, true);
  document.removeEventListener('mouseout', handleMouseOut, true);
  document.removeEventListener('click', handleClick, true);
  document.removeEventListener('keydown', handleKeyDown, true);

  console.log('[Fogó Picker] Deactivated');
}
