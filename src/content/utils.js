/**
 * @what Utility functions for DOM element selection and data extraction
 * @why Reusable helpers for picker functionality
 * @exports generateSelector, extractElementData
 */

import { getCssSelector } from 'css-selector-generator';

const UTILITY_CLASS_REGEX = /^(flex|grid|p-\d+|m-\d+|text-|bg-|border-)/;

/**
 * Generate unique CSS selector for an element
 * @param {HTMLElement} element - Target DOM element
 * @returns {string} Unique CSS selector
 * @throws {Error} If selector is not unique
 */
export function generateSelector(element) {
  const selector = getCssSelector(element, {
    selectors: ['attribute', 'id', 'class', 'tag', 'nthchild'],
    whitelist: [
      /^data-testid$/,
      /^data-qa$/,
      /^data-cy$/,
      /^aria-label$/,
      /^role$/,
    ],
    blacklist: [UTILITY_CLASS_REGEX],
    maxCombinations: 5,
    maxCandidates: 10,
  });

  const matches = document.querySelectorAll(selector);
  if (matches.length !== 1) {
    throw new Error(
      'Generated selector is not unique: "' + selector + '" matches ' + matches.length + ' elements'
    );
  }

  return selector;
}

/**
 * Extract all element data for AI context
 * @param {HTMLElement} element - Target DOM element
 * @returns {Object} Element data (tagName, selector, styles, position, etc.)
 */
export function extractElementData(element) {
  // Get computed styles
  const computedStyle = window.getComputedStyle(element);
  const computedStyles = {
    color: computedStyle.color,
    backgroundColor: computedStyle.backgroundColor,
    fontSize: computedStyle.fontSize,
    fontFamily: computedStyle.fontFamily,
    display: computedStyle.display,
    position: computedStyle.position
  };

  // Get position and dimensions
  const rect = element.getBoundingClientRect();
  const position = {
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height
  };

  // Extract attributes
  const attributes = {};
  for (let i = 0; i < element.attributes.length; i++) {
    const attr = element.attributes[i];
    attributes[attr.name] = attr.value;
  }

  // Generate unique CSS selector using library
  const selector = generateSelector(element);

  return {
    tagName: element.tagName.toLowerCase(),
    selector: selector,
    innerText: element.innerText || '',
    outerHTML: element.outerHTML.substring(0, 500), // First 500 chars
    attributes: attributes,
    computedStyles: computedStyles,
    position: position,
    path: selector,
    // Include page metadata
    pageTitle: document.title,
    url: window.location.href
  };
}
