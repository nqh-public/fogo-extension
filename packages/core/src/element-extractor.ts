/**
 * Fogó Core - Element Extractor
 *
 * @what Extracts complete DOM element data for AI context
 * @why Central function for gathering all element information (styles, position, attributes)
 * @exports extractElementData
 */

import { generateSelector } from './selector-generator';
import type { DOMElementReference } from './types';

/** Maximum length for outerHTML to prevent excessive data */
const MAX_OUTER_HTML_LENGTH = 500;

/**
 * Extract all element data for AI context
 *
 * Gathers:
 * - Tag name, selector, inner text, outer HTML
 * - All element attributes
 * - Computed styles (color, background, font, display, position)
 * - Position and dimensions (bounding rect)
 * - Optional page metadata (title, URL)
 *
 * @param element - Target DOM element
 * @param options - Optional metadata (pageTitle, url)
 * @returns Complete element reference with all data
 */
export function extractElementData(
  element: HTMLElement,
  options?: { pageTitle?: string; url?: string }
): DOMElementReference {
  // Get computed styles
  const computedStyle = window.getComputedStyle(element);
  const computedStyles = {
    color: computedStyle.color,
    backgroundColor: computedStyle.backgroundColor,
    fontSize: computedStyle.fontSize,
    fontFamily: computedStyle.fontFamily,
    display: computedStyle.display,
    position: computedStyle.position,
  };

  // Get position and dimensions
  const rect = element.getBoundingClientRect();
  const position = {
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height,
  };

  // Extract attributes
  const attributes: Record<string, string> = {};
  for (let i = 0; i < element.attributes.length; i++) {
    const attr = element.attributes[i];
    if (attr) {
      attributes[attr.name] = attr.value;
    }
  }

  // Generate unique CSS selector using library
  const selector = generateSelector(element);

  return {
    tagName: element.tagName.toLowerCase(),
    selector: selector,
    innerText: element.innerText || '',
    outerHTML: element.outerHTML.substring(0, MAX_OUTER_HTML_LENGTH),
    attributes: attributes,
    computedStyles: computedStyles,
    position: position,
    path: selector,
    // Include page metadata if provided
    pageTitle: options?.pageTitle,
    url: options?.url,
  };
}
