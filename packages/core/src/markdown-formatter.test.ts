/**
 * @what Unit tests for markdown formatter
 * @why Ensures consistent markdown output for AI consumption
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { formatMarkdown } from './markdown-formatter';
import type { DOMElementReference } from './types';

describe('formatMarkdown', () => {
  let mockElementData: DOMElementReference;

  beforeEach(() => {
    // Mock Date to have consistent timestamps
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-11-02T12:00:00Z'));

    mockElementData = {
      tagName: 'button',
      selector: '[data-testid="submit-btn"]',
      innerText: 'Submit Form',
      outerHTML: '<button data-testid="submit-btn" class="btn">Submit Form</button>',
      attributes: {
        'data-testid': 'submit-btn',
        class: 'btn',
      },
      computedStyles: {
        color: 'rgb(255, 255, 255)',
        backgroundColor: 'rgb(0, 123, 255)',
        fontSize: '16px',
        fontFamily: 'Arial, sans-serif',
        display: 'inline-block',
        position: 'relative',
      },
      position: {
        top: 100.5,
        left: 200.75,
        width: 120.25,
        height: 40.5,
      },
      path: '[data-testid="submit-btn"]',
    };
  });

  it('should format complete element data as markdown', () => {
    const result = formatMarkdown(mockElementData);

    expect(result).toContain('## Selected Element: Submit Form');
    expect(result).toContain('**ELEMENT**');
    expect(result).toContain('<button data-testid="submit-btn" class="btn">Submit Form</button>');
    expect(result).toContain('**PATH**');
    expect(result).toContain('`[data-testid="submit-btn"]`');
  });

  it('should format attributes table correctly', () => {
    const result = formatMarkdown(mockElementData);

    expect(result).toContain('**ATTRIBUTES**');
    expect(result).toContain('| Attribute | Value |');
    expect(result).toContain('| data-testid | submit-btn |');
    expect(result).toContain('| class | btn |');
  });

  it('should handle elements with no attributes', () => {
    mockElementData.attributes = {};
    const result = formatMarkdown(mockElementData);

    expect(result).toContain('| (no attributes) | |');
  });

  it('should format computed styles table', () => {
    const result = formatMarkdown(mockElementData);

    expect(result).toContain('**COMPUTED STYLES**');
    expect(result).toContain('| color | rgb(255, 255, 255) |');
    expect(result).toContain('| backgroundColor | rgb(0, 123, 255) |');
    expect(result).toContain('| fontSize | 16px |');
    expect(result).toContain('| fontFamily | Arial, sans-serif |');
    expect(result).toContain('| display | inline-block |');
    expect(result).toContain('| position | relative |');
  });

  it('should format position and size with fixed decimals', () => {
    const result = formatMarkdown(mockElementData);

    expect(result).toContain('**POSITION & SIZE**');
    expect(result).toContain('| top | 100.50px |');
    expect(result).toContain('| left | 200.75px |');
    expect(result).toContain('| width | 120.25px |');
    expect(result).toContain('| height | 40.50px |');
  });

  it('should include inner text section', () => {
    const result = formatMarkdown(mockElementData);

    expect(result).toContain('**INNER TEXT**');
    expect(result).toContain('Submit Form');
  });

  it('should handle empty inner text', () => {
    mockElementData.innerText = '';
    const result = formatMarkdown(mockElementData);

    expect(result).toContain('**INNER TEXT**');
    expect(result).toContain('(empty)');
  });

  it('should truncate long inner text in heading', () => {
    mockElementData.innerText = 'A'.repeat(60);
    const result = formatMarkdown(mockElementData);

    expect(result).toContain(`## Selected Element: ${'A'.repeat(50)}...`);
  });

  it('should use tag name for heading when no inner text', () => {
    mockElementData.innerText = '';
    const result = formatMarkdown(mockElementData);

    expect(result).toContain('## Selected Element: <button>');
  });

  it('should include page metadata when provided', () => {
    mockElementData.pageTitle = 'Test Page';
    mockElementData.url = 'https://example.com/test';
    const result = formatMarkdown(mockElementData);

    expect(result).toContain('**PAGE METADATA**');
    expect(result).toContain('| Page Title | Test Page |');
    expect(result).toContain('| URL | https://example.com/test |');
    expect(result).toContain('| Timestamp | 2025-11-02T12:00:00.000Z |');
  });

  it('should omit page metadata when not provided', () => {
    const result = formatMarkdown(mockElementData);

    expect(result).not.toContain('**PAGE METADATA**');
  });

  it('should include page metadata with only pageTitle', () => {
    mockElementData.pageTitle = 'Test Page';
    const result = formatMarkdown(mockElementData);

    expect(result).toContain('**PAGE METADATA**');
    expect(result).toContain('| Page Title | Test Page |');
    expect(result).not.toContain('| URL |');
  });

  it('should include page metadata with only url', () => {
    mockElementData.url = 'https://example.com';
    const result = formatMarkdown(mockElementData);

    expect(result).toContain('**PAGE METADATA**');
    expect(result).toContain('| URL | https://example.com |');
    expect(result).not.toContain('| Page Title |');
  });

  it('should escape pipe characters in attribute values', () => {
    mockElementData.attributes = {
      'data-value': 'option1|option2|option3',
    };
    const result = formatMarkdown(mockElementData);

    expect(result).toContain('| data-value | option1\\|option2\\|option3 |');
  });

  it('should truncate long attribute values', () => {
    mockElementData.attributes = {
      'data-long': 'A'.repeat(150),
    };
    const result = formatMarkdown(mockElementData);

    expect(result).toContain(`| data-long | ${'A'.repeat(100)}... |`);
  });

  it('should trim whitespace from inner text for heading', () => {
    mockElementData.innerText = '   Submit Form   ';
    const result = formatMarkdown(mockElementData);

    // The heading trims whitespace via innerText.trim()
    expect(result).toMatch(/## Selected Element: Submit Form/);
  });

  it('should handle all markdown sections in correct order', () => {
    mockElementData.pageTitle = 'Test';
    mockElementData.url = 'https://example.com';
    const result = formatMarkdown(mockElementData);

    const elementIndex = result.indexOf('**ELEMENT**');
    const pathIndex = result.indexOf('**PATH**');
    const attrsIndex = result.indexOf('**ATTRIBUTES**');
    const stylesIndex = result.indexOf('**COMPUTED STYLES**');
    const positionIndex = result.indexOf('**POSITION & SIZE**');
    const textIndex = result.indexOf('**INNER TEXT**');
    const metaIndex = result.indexOf('**PAGE METADATA**');

    expect(elementIndex).toBeLessThan(pathIndex);
    expect(pathIndex).toBeLessThan(attrsIndex);
    expect(attrsIndex).toBeLessThan(stylesIndex);
    expect(stylesIndex).toBeLessThan(positionIndex);
    expect(positionIndex).toBeLessThan(textIndex);
    expect(textIndex).toBeLessThan(metaIndex);
  });
});
