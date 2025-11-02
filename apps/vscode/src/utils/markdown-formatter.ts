/**
 * Fogó VSCode Extension - Markdown Formatter
 *
 * @where apps/fogo/src/utils/markdown-formatter.ts
 * @what Formats DOMElementReference data as structured markdown for AI consumption
 * @why Provides consistent, parseable clipboard output for AI workflows
 * @exports formatMarkdown
 * @date 2025-11-01
 * @author Claude Code <noreply@anthropic.com>
 */

import type { DOMElementReference } from '@/types';

/**
 * Formats element data as markdown with sections
 *
 * Output structure:
 * - Heading: Element text or tag name
 * - ELEMENT: Full opening tag
 * - PATH: CSS selector
 * - ATTRIBUTES: Table of attributes
 * - COMPUTED STYLES: Table of key styles
 * - POSITION & SIZE: Table of dimensions
 * - INNER TEXT: Text content
 *
 * @param data - Complete DOM element reference
 * @returns Formatted markdown string
 */
/** Maximum length for element label in heading */
const MAX_LABEL_LENGTH = 50;

export function formatMarkdown(data: DOMElementReference): string {
  // Extract element text or use tag name for heading
  const elementLabel = data.innerText.trim()
    ? `${data.innerText.substring(0, MAX_LABEL_LENGTH)}${data.innerText.length > MAX_LABEL_LENGTH ? '...' : ''}`
    : `<${data.tagName}>`;

  // Build markdown sections
  const markdown = `## Selected Element: ${elementLabel}

**ELEMENT**
${data.outerHTML}

**PATH**
\`${data.path}\`

**ATTRIBUTES**
| Attribute | Value |
|-----------|-------|
${formatAttributesTable(data.attributes)}

**COMPUTED STYLES**
| Property | Value |
|----------|-------|
| color | ${data.computedStyles.color} |
| backgroundColor | ${data.computedStyles.backgroundColor} |
| fontSize | ${data.computedStyles.fontSize} |
| fontFamily | ${data.computedStyles.fontFamily} |
| display | ${data.computedStyles.display} |
| position | ${data.computedStyles.position} |

**POSITION & SIZE**
| Property | Value |
|----------|-------|
| top | ${data.position.top.toFixed(2)}px |
| left | ${data.position.left.toFixed(2)}px |
| width | ${data.position.width.toFixed(2)}px |
| height | ${data.position.height.toFixed(2)}px |

**INNER TEXT**
${data.innerText || '(empty)'}

${formatPageMetadata(data)}`;

  return markdown.trim();
}

/**
 * Formats page metadata section (if available from browser extension)
 *
 * @param data - Element data with optional pageTitle and url
 * @returns Markdown table or empty string if no metadata
 */
function formatPageMetadata(data: DOMElementReference): string {
  if (!data.pageTitle && !data.url) {
    return '';
  }

  const timestamp = new Date().toISOString();

  return `
**PAGE METADATA**
| Property | Value |
|----------|-------|
${data.pageTitle ? `| Page Title | ${data.pageTitle} |` : ''}
${data.url ? `| URL | ${data.url} |` : ''}
| Timestamp | ${timestamp} |`;
}

/**
 * Formats attributes object as markdown table rows
 *
 * @param attributes - Element attributes
 * @returns Markdown table rows (or placeholder if empty)
 */
function formatAttributesTable(attributes: Record<string, string>): string {
  const entries = Object.entries(attributes);

  if (entries.length === 0) {
    return '| (no attributes) | |';
  }

  return entries
    .map(([key, value]) => {
      // Truncate long values
      const truncatedValue = value.length > 100 ? `${value.substring(0, 100)}...` : value;
      // Escape pipe characters in values
      const escapedValue = truncatedValue.replace(/\|/g, '\\|');
      return `| ${key} | ${escapedValue} |`;
    })
    .join('\n');
}
