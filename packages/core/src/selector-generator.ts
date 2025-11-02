/**
 * Fogó Core - Selector Generator
 *
 * @what Generates unique CSS selectors for DOM elements using css-selector-generator
 * @why Provides stable, testable selectors prioritizing data-testid and ARIA attributes
 * @exports generateSelector
 */

import { getCssSelector } from 'css-selector-generator';

/**
 * Utility class filtering regex for Tailwind/Bootstrap classes
 * Matches: flex, grid, p-*, m-*, text-*, bg-*, border-*
 */
const UTILITY_CLASS_REGEX = /^(flex|grid|p-\d+|m-\d+|text-|bg-|border-)/;

/**
 * Generates unique CSS selector for a DOM element
 *
 * Priority order:
 * 1. data-testid, data-qa, data-cy (testing attributes)
 * 2. ARIA attributes (role, aria-label)
 * 3. Element ID
 * 4. Semantic classes (excluding utility classes)
 * 5. DOM path fallback (max 5 levels)
 *
 * @param element - DOM element to generate selector for
 * @returns Unique CSS selector string
 * @throws Error if selector is not unique
 */
export function generateSelector(element: Element): string {
  const selector = getCssSelector(element, {
    // Selector type priority: attribute (for data-testid, aria-*), id, class, tag
    selectors: ['attribute', 'id', 'class', 'tag', 'nthchild'],

    // Whitelist: Prioritize stable attributes (data-testid, data-qa, aria-*, role)
    whitelist: [/^data-testid$/, /^data-qa$/, /^data-cy$/, /^aria-label$/, /^role$/],

    // Blacklist: Filter out utility classes
    blacklist: [UTILITY_CLASS_REGEX],

    // Max depth for path-based selectors
    maxCombinations: 5,

    // Prefer shorter selectors
    maxCandidates: 10,
  });

  // Validate uniqueness
  const matches = document.querySelectorAll(selector);
  if (matches.length !== 1) {
    throw new Error(
      `Generated selector is not unique: "${selector}" matches ${matches.length} elements`
    );
  }

  return selector;
}
