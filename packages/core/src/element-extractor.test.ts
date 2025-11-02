/**
 * @what Unit tests for element extractor
 * @why Ensures complete and accurate DOM element data extraction
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { extractElementData } from './element-extractor';

// Mock the selector generator to avoid happy-dom CSS selector issues
vi.mock('./selector-generator', () => ({
  generateSelector: vi.fn((el: HTMLElement) => {
    // Simple mock implementation
    if (el.hasAttribute('data-testid')) {
      return `[data-testid="${el.getAttribute('data-testid')}"]`;
    }
    if (el.id) {
      return `#${el.id}`;
    }
    return el.tagName.toLowerCase();
  }),
}));

describe('extractElementData', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should extract basic element data', () => {
    document.body.innerHTML = '<button data-testid="btn">Click me</button>';
    const element = document.querySelector('[data-testid="btn"]') as HTMLElement;

    const result = extractElementData(element);

    expect(result.tagName).toBe('button');
    expect(result.innerText).toBe('Click me');
    expect(result.outerHTML).toContain('Click me');
    expect(result.selector).toBeTruthy();
    expect(result.path).toBeTruthy();
  });

  it('should extract all attributes', () => {
    document.body.innerHTML = `
      <button
        id="submit"
        data-testid="submit-btn"
        class="btn primary"
        aria-label="Submit form"
      >
        Submit
      </button>
    `;
    const element = document.getElementById('submit') as HTMLElement;

    const result = extractElementData(element);

    expect(result.attributes).toEqual({
      id: 'submit',
      'data-testid': 'submit-btn',
      class: 'btn primary',
      'aria-label': 'Submit form',
    });
  });

  it('should extract computed styles', () => {
    document.body.innerHTML = '<div data-testid="styled">Content</div>';
    const element = document.querySelector('[data-testid="styled"]') as HTMLElement;

    // Set inline styles for testing
    element.style.color = 'rgb(255, 0, 0)';
    element.style.backgroundColor = 'rgb(0, 0, 255)';
    element.style.fontSize = '20px';
    element.style.display = 'flex';
    element.style.position = 'absolute';

    const result = extractElementData(element);

    expect(result.computedStyles.color).toBe('rgb(255, 0, 0)');
    expect(result.computedStyles.backgroundColor).toBe('rgb(0, 0, 255)');
    expect(result.computedStyles.fontSize).toBe('20px');
    expect(result.computedStyles.display).toBe('flex');
    expect(result.computedStyles.position).toBe('absolute');
    expect(result.computedStyles.fontFamily).toBeTruthy();
  });

  it('should extract position and dimensions', () => {
    document.body.innerHTML = '<div data-testid="box">Box</div>';
    const element = document.querySelector('[data-testid="box"]') as HTMLElement;

    // Mock getBoundingClientRect
    vi.spyOn(element, 'getBoundingClientRect').mockReturnValue({
      top: 100,
      left: 200,
      width: 300,
      height: 150,
      right: 500,
      bottom: 250,
      x: 200,
      y: 100,
      toJSON: () => ({}),
    });

    const result = extractElementData(element);

    expect(result.position).toEqual({
      top: 100,
      left: 200,
      width: 300,
      height: 150,
    });
  });

  it('should truncate long outerHTML', () => {
    const longContent = 'A'.repeat(600);
    document.body.innerHTML = `<div data-testid="long">${longContent}</div>`;
    const element = document.querySelector('[data-testid="long"]') as HTMLElement;

    const result = extractElementData(element);

    expect(result.outerHTML.length).toBeLessThanOrEqual(500);
  });

  it('should handle elements with no inner text', () => {
    document.body.innerHTML = '<div data-testid="empty"></div>';
    const element = document.querySelector('[data-testid="empty"]') as HTMLElement;

    const result = extractElementData(element);

    expect(result.innerText).toBe('');
  });

  it('should handle elements with no attributes', () => {
    document.body.innerHTML = '<div>Plain div</div>';
    const element = document.querySelector('div') as HTMLElement;

    const result = extractElementData(element);

    expect(result.attributes).toEqual({});
  });

  it('should include page metadata when provided', () => {
    document.body.innerHTML = '<button data-testid="btn">Click</button>';
    const element = document.querySelector('[data-testid="btn"]') as HTMLElement;

    const result = extractElementData(element, {
      pageTitle: 'Test Page',
      url: 'https://example.com/test',
    });

    expect(result.pageTitle).toBe('Test Page');
    expect(result.url).toBe('https://example.com/test');
  });

  it('should omit page metadata when not provided', () => {
    document.body.innerHTML = '<button data-testid="btn">Click</button>';
    const element = document.querySelector('[data-testid="btn"]') as HTMLElement;

    const result = extractElementData(element);

    expect(result.pageTitle).toBeUndefined();
    expect(result.url).toBeUndefined();
  });

  it('should extract tag name as lowercase', () => {
    document.body.innerHTML = '<BUTTON data-testid="btn">Click</BUTTON>';
    const element = document.querySelector('[data-testid="btn"]') as HTMLElement;

    const result = extractElementData(element);

    expect(result.tagName).toBe('button');
  });

  it('should generate selector and path fields', () => {
    document.body.innerHTML = '<button data-testid="submit">Submit</button>';
    const element = document.querySelector('[data-testid="submit"]') as HTMLElement;

    const result = extractElementData(element);

    expect(result.selector).toBeTruthy();
    expect(result.path).toBeTruthy();
    expect(result.selector).toBe(result.path);
  });

  it('should handle nested elements correctly', () => {
    document.body.innerHTML = `
      <div id="container">
        <div class="row">
          <button data-testid="nested-btn">
            <span>Click</span>
            <span>Me</span>
          </button>
        </div>
      </div>
    `;
    const element = document.querySelector('[data-testid="nested-btn"]') as HTMLElement;

    const result = extractElementData(element);

    expect(result.tagName).toBe('button');
    expect(result.innerText).toContain('Click');
    expect(result.innerText).toContain('Me');
    expect(result.selector).toContain('nested-btn');
  });

  it('should handle input elements with value attribute', () => {
    document.body.innerHTML = '<input data-testid="email" type="email" value="test@example.com" />';
    const element = document.querySelector('[data-testid="email"]') as HTMLElement;

    const result = extractElementData(element);

    expect(result.tagName).toBe('input');
    expect(result.attributes.type).toBe('email');
    expect(result.attributes.value).toBe('test@example.com');
  });

  it('should extract styles from elements with inline styles', () => {
    document.body.innerHTML = `
      <div
        data-testid="styled"
        style="color: red; background-color: blue; font-size: 18px;"
      >
        Styled
      </div>
    `;
    const element = document.querySelector('[data-testid="styled"]') as HTMLElement;

    const result = extractElementData(element);

    expect(result.computedStyles.color).toContain('red');
    expect(result.computedStyles.backgroundColor).toContain('blue');
    expect(result.computedStyles.fontSize).toBe('18px');
  });

  it('should handle self-closing elements', () => {
    document.body.innerHTML = '<img data-testid="logo" src="logo.png" alt="Logo" />';
    const element = document.querySelector('[data-testid="logo"]') as HTMLElement;

    const result = extractElementData(element);

    expect(result.tagName).toBe('img');
    expect(result.attributes.src).toBe('logo.png');
    expect(result.attributes.alt).toBe('Logo');
    expect(result.innerText).toBe('');
  });
});
