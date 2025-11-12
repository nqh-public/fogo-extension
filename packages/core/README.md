# @fogo/core

> Shared DOM element picker logic for Fogó browser and VSCode extensions

[![npm version](https://img.shields.io/npm/v/@fogo/core)](https://www.npmjs.com/package/@fogo/core)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)

## Installation

```bash
npm install @fogo/core
```

```bash
bun add @fogo/core
```

```bash
yarn add @fogo/core
```

## Features

- 🎯 **DOM Element Extraction**: Extract complete element data including tag, attributes, styles, and position
- 🔍 **Smart Selector Generation**: Generate unique CSS selectors prioritizing data-testid, ARIA attributes, and semantic classes
- 📝 **Markdown Formatting**: Format element data as AI-friendly markdown
- 🏃 **Zero Dependencies**: Only dependency is `css-selector-generator`
- 📦 **Tree-shakeable**: ESM modules for optimal bundling
- 🔒 **Type-safe**: Written in TypeScript with comprehensive types

## Usage

### Extract Element Data

```typescript
import { extractElementData } from '@fogo/core';

const element = document.querySelector('[data-testid="submit-btn"]');
const data = extractElementData(element, {
  pageTitle: document.title,
  url: window.location.href,
});

console.log(data);
// {
//   tagName: 'button',
//   selector: '[data-testid="submit-btn"]',
//   innerText: 'Submit Form',
//   outerHTML: '<button data-testid="submit-btn" class="btn">Submit Form</button>',
//   attributes: { 'data-testid': 'submit-btn', class: 'btn' },
//   computedStyles: { color: 'rgb(255, 255, 255)', backgroundColor: 'rgb(0, 123, 255)', ... },
//   position: { top: 100, left: 200, width: 120, height: 40 },
//   path: '[data-testid="submit-btn"]',
//   pageTitle: 'My App',
//   url: 'https://example.com'
// }
```

### Generate CSS Selectors

```typescript
import { generateSelector } from '@fogo/core';

const element = document.querySelector('button');
const selector = generateSelector(element);

console.log(selector);
// '[data-testid="submit-btn"]' or '#submit' or '.submit-button'

// Selector is guaranteed to be unique
const matches = document.querySelectorAll(selector);
console.log(matches.length); // 1
```

### Format as Markdown

```typescript
import { formatMarkdown } from '@fogo/core';

const markdown = formatMarkdown(data);

console.log(markdown);
// ## Selected Element: Submit Form
//
// **ELEMENT**
// <button data-testid="submit-btn" class="btn">Submit Form</button>
//
// **PATH**
// `[data-testid="submit-btn"]`
//
// **ATTRIBUTES**
// | Attribute | Value |
// |-----------|-------|
// | data-testid | submit-btn |
// | class | btn |
// ...
```

### Interactive Picker

```typescript
import { initPicker } from '@fogo/core';

const picker = initPicker({
  onPick: data => {
    const markdown = formatMarkdown(data);
    console.log('Element picked:', markdown);
  },
  onError: error => {
    console.error('Picker error:', error);
  },
});

// Activate picker mode
picker.activate();

// Later: deactivate
picker.deactivate();
```

## API Reference

### `extractElementData(element, options?)`

Extracts complete technical data from a DOM element.

**Parameters:**

- `element: HTMLElement` - The DOM element to extract data from
- `options?: { pageTitle?: string; url?: string }` - Optional page metadata

**Returns:** `DOMElementReference`

```typescript
interface DOMElementReference {
  tagName: string; // Lowercase tag name (e.g., "button")
  selector: string; // Unique CSS selector
  innerText: string; // Text content
  outerHTML: string; // Opening tag HTML (max 500 chars)
  attributes: Record<string, string>; // All element attributes
  computedStyles: ComputedStyles; // Key computed CSS properties
  position: Position; // Bounding rect (top, left, width, height)
  path: string; // Same as selector
  pageTitle?: string; // Optional page title
  url?: string; // Optional page URL
}
```

### `generateSelector(element)`

Generates a unique CSS selector for the given element.

**Parameters:**

- `element: Element` - The element to generate a selector for

**Returns:** `string` - Unique CSS selector

**Selector Priority:**

1. `data-testid`, `data-qa`, `data-cy` (testing attributes)
2. ARIA attributes (`aria-label`, `role`)
3. Element ID
4. Semantic classes (excludes utility classes like `flex`, `p-4`, etc.)
5. Tag + nth-child fallback

**Throws:** `Error` if the generated selector is not unique

**Example:**

```typescript
// Element: <button data-testid="login" id="btn" class="flex p-4 submit-btn">
generateSelector(element);
// Returns: '[data-testid="login"]' (prioritizes data-testid)

// Element: <button id="submit">
generateSelector(element);
// Returns: '#submit'

// Element: <button class="flex p-4 submit-btn">
generateSelector(element);
// Returns: '.submit-btn' (filters out 'flex' and 'p-4' utility classes)
```

### `formatMarkdown(data)`

Formats element data as structured markdown optimized for AI consumption.

**Parameters:**

- `data: DOMElementReference` - Complete element data

**Returns:** `string` - Formatted markdown

**Output Sections:**

1. **Heading**: Element text or tag name (max 50 chars)
2. **ELEMENT**: Full opening tag HTML
3. **PATH**: CSS selector in code block
4. **ATTRIBUTES**: Markdown table of attributes
5. **COMPUTED STYLES**: Table of color, background, font, display, position
6. **POSITION & SIZE**: Table with top, left, width, height
7. **INNER TEXT**: Element text content
8. **PAGE METADATA** (optional): Page title, URL, timestamp

### `initPicker(callbacks)`

Initializes interactive element picker mode.

**Parameters:**

- `callbacks: PickerCallbacks`

```typescript
interface PickerCallbacks {
  onPick: (data: DOMElementReference) => void; // Called when element is picked
  onError?: (error: Error) => void; // Called on errors
}
```

**Returns:** `PickerController`

```typescript
interface PickerController {
  activate(): void; // Start picker mode
  deactivate(): void; // Stop picker mode
  isActive(): boolean; // Check if picker is active
}
```

**Behavior:**

- Hover over elements to highlight (red outline)
- Click to pick element (calls `onPick`)
- Press `ESC` to deactivate
- Cursor changes to crosshair when active
- Prevents default click behavior on picked elements

## TypeScript Types

All types are exported from the main entry point:

```typescript
import type {
  DOMElementReference,
  Position,
  ComputedStyles,
  PickerState,
  PickerCallbacks,
  PickerController,
} from '@fogo/core';
```

### `Position`

```typescript
interface Position {
  top: number; // Distance from viewport top (px)
  left: number; // Distance from viewport left (px)
  width: number; // Element width (px)
  height: number; // Element height (px)
}
```

### `ComputedStyles`

```typescript
interface ComputedStyles {
  color: string; // Text color (e.g., "rgb(0, 0, 0)")
  backgroundColor: string; // Background color
  fontSize: string; // Font size (e.g., "16px")
  fontFamily: string; // Font family
  display: string; // Display type (e.g., "flex", "block")
  position: string; // Position type (e.g., "relative", "absolute")
}
```

## Browser Compatibility

- ✅ Chrome 89+
- ✅ Firefox 88+
- ✅ Safari 14.1+
- ✅ Edge 89+
- ✅ Any browser with ES2022 support

## Bundle Size

- **Minified**: ~8 KB
- **Minified + Gzipped**: ~3 KB
- **Dependencies**: `css-selector-generator` (~12 KB)

## Security

- **No External Requests**: All processing happens locally
- **No Data Collection**: Zero telemetry or analytics
- **Same-Origin Policy**: Cannot access cross-origin iframes
- **CSP-Friendly**: Works with Content Security Policies
- **Open Source**: 100% auditable code

## License

MIT © NQH

## Related Packages

- **[@fogo/vite-plugin](https://www.npmjs.com/package/@fogo/vite-plugin)** - Vite plugin for Fogó development integration
- **[fogo-extension](https://github.com/nqh-public/fogo-extension)** - Browser and VSCode extensions

## Contributing

See [CONTRIBUTING.md](https://github.com/nqh-public/fogo-extension/blob/main/CONTRIBUTING.md) in the main repository.

## Support

- 📧 Email: repo@ngoquochuy.com
- 🐛 Issues: https://github.com/nqh-public/fogo-extension/issues
- 💬 Discussions: https://github.com/nqh-public/fogo-extension/discussions
