/**
 * Fogó Core - Constants
 *
 * @what Centralized configuration values for picker behavior and styling
 * @why All magic numbers and strings defined here for maintainability
 * @exports MAX_SELECTOR_DEPTH, OUTLINE_COLOR, OUTLINE_WIDTH, DEBOUNCE_DELAY
 */

/**
 * Maximum depth for CSS selector path generation
 * Prevents overly specific/fragile selectors
 */
export const MAX_SELECTOR_DEPTH = 10;

/**
 * Element outline color during hover in picker mode
 */
export const OUTLINE_COLOR = '#ff0000';

/**
 * Element outline width during hover in picker mode
 */
export const OUTLINE_WIDTH = '2px';

/**
 * Debounce delay for hover events (milliseconds)
 * Prevents excessive re-rendering during rapid mouse movement
 */
export const DEBOUNCE_DELAY = 500;
