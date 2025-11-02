/**
 * Fogó VSCode Extension - Constants
 *
 * @what Centralized configuration values for picker behavior and styling
 * @why All magic numbers and strings defined here for maintainability (Principle X: No magic numbers)
 * @exports MAX_SELECTOR_DEPTH, OUTLINE_COLOR, OUTLINE_WIDTH, DEBOUNCE_DELAY, NONCE_LENGTH
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

/**
 * Length of generated nonce for Content Security Policy
 * 32 characters provides sufficient entropy for CSP nonce
 */
export const NONCE_LENGTH = 32;

/**
 * HTTP server port configuration for bookmarklet server
 */
export const SERVER_PORT = 9876;
const PORT_OFFSET_1 = 1;
const PORT_OFFSET_2 = 2;
const PORT_OFFSET_3 = 3;
const PORT_OFFSET_4 = 4;
export const FALLBACK_PORTS = [
  SERVER_PORT + PORT_OFFSET_1,
  SERVER_PORT + PORT_OFFSET_2,
  SERVER_PORT + PORT_OFFSET_3,
  SERVER_PORT + PORT_OFFSET_4,
];

/**
 * HTTP status codes
 */
export const HTTP_STATUS = {
  OK: 200,
  NO_CONTENT: 204,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
} as const;
