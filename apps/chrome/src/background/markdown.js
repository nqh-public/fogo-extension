/**
 * @what Element data to Markdown converter
 * @why Reusable formatting logic for element data export
 * @exports formatMarkdown
 */

/**
 * Format element data as markdown
 * @param {Object} data - Element data
 * @returns {string} Formatted markdown
 */
export function formatMarkdown(data) {
  const elementLabel = data.innerText.trim()
    ? data.innerText.substring(0, 50) + (data.innerText.length > 50 ? '...' : '')
    : '<' + data.tagName + '>';

  const attributeEntries = Object.entries(data.attributes);
  const attributeRows = attributeEntries.length === 0
    ? '| (no attributes) | |'
    : attributeEntries.map(([key, value]) => {
        const truncatedValue = value.length > 100 ? value.substring(0, 100) + '...' : value;
        const escapedValue = truncatedValue.replace(/\|/g, '\\|');
        return '| ' + key + ' | ' + escapedValue + ' |';
      }).join('\n');

  return `## Selected Element: ${elementLabel}

**ELEMENT**
${data.outerHTML}

**PATH**
\`${data.path}\`

**ATTRIBUTES**
| Attribute | Value |
|-----------|-------|
${attributeRows}

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

**PAGE METADATA**
| Property | Value |
|----------|-------|
| URL | ${data.url} |
`;
}
