/**
 * Fogó Core - Package Exports
 *
 * @what Barrel export for all core picker functionality
 * @why Single import point for VSCode and Chrome extensions
 */

// Constants
export { MAX_SELECTOR_DEPTH, OUTLINE_COLOR, OUTLINE_WIDTH, DEBOUNCE_DELAY } from './constants';

// Types
export type { Position, ComputedStyles, DOMElementReference, PickerState } from './types';

// Utilities
export { generateSelector } from './selector-generator';
export { formatMarkdown } from './markdown-formatter';
export { extractElementData } from './element-extractor';

// Picker
export { activatePicker, deactivatePicker } from './picker';
export type { PickerCallbacks } from './picker';
