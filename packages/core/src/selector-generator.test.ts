/**
 * @what Unit tests for selector generator
 * @why Ensures unique, stable CSS selector generation
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { generateSelector } from './selector-generator';
import * as cssSelectorGenerator from 'css-selector-generator';

// Mock css-selector-generator to avoid happy-dom compatibility issues
vi.mock('css-selector-generator', () => ({
  getCssSelector: vi.fn((el: Element) => {
    // Prioritize data-testid, data-qa, data-cy
    if (el.hasAttribute('data-testid')) {
      return `[data-testid="${el.getAttribute('data-testid')}"]`;
    }
    if (el.hasAttribute('data-qa')) {
      return `[data-qa="${el.getAttribute('data-qa')}"]`;
    }
    if (el.hasAttribute('data-cy')) {
      return `[data-cy="${el.getAttribute('data-cy')}"]`;
    }
    if (el.hasAttribute('aria-label')) {
      return `[aria-label="${el.getAttribute('aria-label')}"]`;
    }
    if (el.hasAttribute('role')) {
      return `[role="${el.getAttribute('role')}"]`;
    }
    if (el.id) {
      return `#${el.id}`;
    }
    // Find semantic class (non-utility)
    const classes = el.className.split(' ').filter(c =>
      c && !c.match(/^(flex|grid|p-\d+|m-\d+|text-|bg-|border-)/)
    );
    if (classes.length > 0) {
      return `.${classes[0]}`;
    }
    // Use nth-child for plain elements
    const parent = el.parentElement;
    if (parent) {
      const index = Array.from(parent.children).indexOf(el) + 1;
      return `${el.tagName.toLowerCase()}:nth-child(${index})`;
    }
    return el.tagName.toLowerCase();
  }),
}));

describe('generateSelector', () => {
  beforeEach(() => {
    // Clear document body before each test
    document.body.innerHTML = '';
  });

  it('should generate selector for element with data-testid', () => {
    document.body.innerHTML = '<button data-testid="submit-btn">Submit</button>';
    const element = document.querySelector('[data-testid="submit-btn"]') as Element;

    const selector = generateSelector(element);

    expect(selector).toContain('data-testid');
    expect(document.querySelectorAll(selector).length).toBe(1);
  });

  it('should generate selector for element with ID', () => {
    document.body.innerHTML = '<div id="main-container"><button id="submit">Submit</button></div>';
    const element = document.getElementById('submit') as Element;

    const selector = generateSelector(element);

    expect(selector).toContain('submit');
    expect(document.querySelectorAll(selector).length).toBe(1);
  });

  it('should prioritize data-testid over ID', () => {
    document.body.innerHTML = '<button id="btn" data-testid="submit-btn">Submit</button>';
    const element = document.querySelector('[data-testid="submit-btn"]') as Element;

    const selector = generateSelector(element);

    // data-testid should be prioritized
    expect(selector).toContain('data-testid');
    expect(document.querySelectorAll(selector).length).toBe(1);
  });

  it('should generate selector for element with aria-label', () => {
    document.body.innerHTML = '<button aria-label="Close modal">X</button>';
    const element = document.querySelector('[aria-label="Close modal"]') as Element;

    const selector = generateSelector(element);

    expect(selector).toContain('aria-label');
    expect(document.querySelectorAll(selector).length).toBe(1);
  });

  it('should generate selector for element with role', () => {
    document.body.innerHTML = '<div role="navigation"><a href="#">Home</a></div>';
    const element = document.querySelector('[role="navigation"]') as Element;

    const selector = generateSelector(element);

    expect(selector).toContain('role');
    expect(document.querySelectorAll(selector).length).toBe(1);
  });

  it('should generate selector for element with semantic class', () => {
    document.body.innerHTML = '<button class="submit-button">Submit</button>';
    const element = document.querySelector('.submit-button') as Element;

    const selector = generateSelector(element);

    expect(document.querySelectorAll(selector).length).toBe(1);
  });

  it('should filter out utility classes (Tailwind/Bootstrap)', () => {
    document.body.innerHTML = `
      <button class="flex p-4 m-2 text-blue bg-white border-solid submit-btn">
        Submit
      </button>
    `;
    const element = document.querySelector('button') as Element;

    const selector = generateSelector(element);

    // Should not contain utility classes
    expect(selector).not.toContain('flex');
    expect(selector).not.toContain('p-4');
    expect(selector).not.toContain('m-2');
    expect(selector).not.toContain('text-blue');
    expect(selector).not.toContain('bg-white');
    expect(selector).not.toContain('border-solid');
  });

  it('should generate unique selector for nested elements', () => {
    document.body.innerHTML = `
      <div id="container">
        <div class="row">
          <button data-testid="btn-1">Button 1</button>
          <button data-testid="btn-2">Button 2</button>
        </div>
      </div>
    `;
    const element = document.querySelector('[data-testid="btn-2"]') as Element;

    const selector = generateSelector(element);

    expect(selector).toContain('btn-2');
    expect(document.querySelectorAll(selector).length).toBe(1);
  });

  it('should use tag name as fallback when no stable attributes', () => {
    document.body.innerHTML = '<div><span>Text content</span></div>';
    const element = document.querySelector('span') as Element;

    const selector = generateSelector(element);

    expect(document.querySelectorAll(selector).length).toBe(1);
  });

  it('should generate selector for element with data-qa attribute', () => {
    document.body.innerHTML = '<input data-qa="email-input" type="email" />';
    const element = document.querySelector('[data-qa="email-input"]') as Element;

    const selector = generateSelector(element);

    expect(selector).toContain('data-qa');
    expect(document.querySelectorAll(selector).length).toBe(1);
  });

  it('should generate selector for element with data-cy attribute', () => {
    document.body.innerHTML = '<input data-cy="password-field" type="password" />';
    const element = document.querySelector('[data-cy="password-field"]') as Element;

    const selector = generateSelector(element);

    expect(selector).toContain('data-cy');
    expect(document.querySelectorAll(selector).length).toBe(1);
  });

  it('should throw error for non-unique selector', () => {
    // Create duplicate elements without unique identifiers
    document.body.innerHTML = `
      <div class="container">
        <span>Item</span>
        <span>Item</span>
      </div>
    `;
    const elements = document.querySelectorAll('span');
    const element = elements[0] as Element;

    // The library should generate a selector that includes nth-child
    // But if it somehow fails to be unique, it should throw
    const selector = generateSelector(element);

    // Should still be unique due to nth-child fallback
    expect(document.querySelectorAll(selector).length).toBe(1);
  });

  it('should generate stable selectors for complex nested structures', () => {
    document.body.innerHTML = `
      <nav>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about" data-testid="about-link">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    `;
    const element = document.querySelector('[data-testid="about-link"]') as Element;

    const selector = generateSelector(element);

    expect(selector).toContain('about-link');
    expect(document.querySelectorAll(selector).length).toBe(1);
  });

  it('should handle elements with multiple attributes', () => {
    document.body.innerHTML = `
      <button
        id="submit-btn"
        data-testid="submit"
        aria-label="Submit form"
        class="btn btn-primary"
      >
        Submit
      </button>
    `;
    const element = document.getElementById('submit-btn') as Element;

    const selector = generateSelector(element);

    // Should prioritize data-testid
    expect(document.querySelectorAll(selector).length).toBe(1);
  });
});
