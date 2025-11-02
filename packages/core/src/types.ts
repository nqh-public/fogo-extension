/**
 * Fogó Core - Type Definitions
 *
 * @what TypeScript interfaces for DOM element references and picker state
 * @why Shared type definitions for VSCode and Chrome extensions
 * @exports Position, ComputedStyles, DOMElementReference, PickerState
 */

/**
 * Element position and dimensions in viewport
 */
export interface Position {
  /** Distance from viewport top (pixels) */
  top: number;
  /** Distance from viewport left (pixels) */
  left: number;
  /** Element width (pixels, >0) */
  width: number;
  /** Element height (pixels, >0) */
  height: number;
}

/**
 * Subset of computed CSS styles relevant for AI context
 */
export interface ComputedStyles {
  /** Text color (e.g., "rgb(0, 0, 0)") */
  color: string;
  /** Background color */
  backgroundColor: string;
  /** Font size (e.g., "16px") */
  fontSize: string;
  /** Font family */
  fontFamily: string;
  /** Display type (e.g., "flex", "block") */
  display: string;
  /** Position type (e.g., "relative", "absolute") */
  position: string;
}

/**
 * Complete technical snapshot of a DOM element for AI context
 */
export interface DOMElementReference {
  /** HTML element tag (lowercase, e.g., "button", "div") */
  tagName: string;
  /** CSS selector path (unique in document) */
  selector: string;
  /** Element text content (may be empty) */
  innerText: string;
  /** Full opening tag with attributes */
  outerHTML: string;
  /** All element attributes */
  attributes: Record<string, string>;
  /** Selected computed style properties */
  computedStyles: ComputedStyles;
  /** Element position and dimensions */
  position: Position;
  /** Hierarchical selector from body (max 10 levels) */
  path: string;
  /** Page title from document.title (optional, from browser extension) */
  pageTitle?: string;
  /** Page URL from window.location.href (optional, from browser extension) */
  url?: string;
}

/**
 * Internal state management for picker mode
 */
export interface PickerState {
  /** Picker mode active/inactive (default false) */
  active: boolean;
  /** Currently hovered element (null if none) */
  hoveredElement: HTMLElement | null;
  /** Original outline style for restoration */
  previousOutline?: string;
}
