# Fogó Extension

DOM element picker for AI workflows - VSCode + Chrome extensions with shared core.

## Structure

```
fogo-extension/
  packages/
    core/              # @fogo/core - Shared DOM picker logic
    vite-plugin/       # @fogo/vite-plugin - Auto-injection for Vite apps
  apps/
    vscode/            # VSCode extension (VS Marketplace)
    chrome/            # Chrome extension (Chrome Web Store)
```

## Packages

### @fogo/core

Shared business logic for DOM element picking, selector generation, and markdown formatting.

**Exports:**
- `activatePicker()`, `deactivatePicker()` - Picker state management
- `extractElementData()` - Extract all element info (tag, selector, styles, position)
- `formatMarkdown()` - Convert element data to AI-friendly markdown
- `generateSelector()` - Generate unique CSS selectors with stable attributes
- Types: `DOMElementReference`, `PickerState`, `PickerCallbacks`

**Usage:**
```typescript
import { activatePicker, formatMarkdown } from '@fogo/core';

activatePicker({
  onElementSelected: (data) => {
    const markdown = formatMarkdown(data);
    console.log(markdown);
  },
  onError: (error) => console.error(error),
});
```

### @fogo/vite-plugin

Vite plugin that auto-injects Fogó listener script into HTML during development.

**Usage:**
```typescript
// vite.config.ts
import { fogoListener } from '@fogo/vite-plugin';

export default defineConfig({
  plugins: [fogoListener()],
});
```

**Features:**
- Dev-only (`apply: 'serve'`)
- Zero runtime overhead
- Works with TanStack Start, SvelteKit, Nuxt, plain Vite

## Extensions

### VSCode Extension

**Commands:**
- `Fogó: Start Preview` - Open URL preview in webview
- `Toggle Element Picker` - Activate picker in preview
- `Reload Preview` - Reload webview content

**Build:**
```bash
cd apps/vscode
pnpm build      # Creates fogo-0.1.0.vsix
pnpm package    # Package for VS Marketplace
```

### Chrome Extension

**Features:**
- Click extension icon → activate picker
- Hover + click to select element
- Auto-copy markdown to clipboard
- Toast notification on success

**Build:**
```bash
cd apps/chrome
pnpm build      # Creates dist/ folder
```

## Development

### Local Development (NQH Monorepo)

```bash
# Install dependencies
pnpm install

# Build VSCode extension
cd apps/fogo-extension/apps/vscode
pnpm build

# Build Chrome extension
cd apps/fogo-extension/apps/chrome
pnpm build
```

### Standalone Development

This subtree syncs to `github.com/nqh-public/fogo-extension` for public distribution.

```bash
# Clone standalone repo
git clone https://github.com/nqh-public/fogo-extension.git
cd fogo-extension
pnpm install

# Build all
pnpm build
```

## Publishing

### npm Packages (@fogo/core, @fogo/vite-plugin)

```bash
# Publish core package
cd packages/core
npm publish --access public

# Publish Vite plugin
cd packages/vite-plugin
npm publish --access public
```

### VSCode Extension

```bash
cd apps/vscode
vsce publish
```

### Chrome Extension

1. Build: `cd apps/chrome && pnpm build`
2. Upload `dist/` to Chrome Web Store
3. Submit for review

## Git Subtree Sync

This directory is a git subtree synced between NQH monorepo and standalone repo.

```bash
# Push changes to standalone repo
git subtree push --prefix apps/fogo-extension \
  https://github.com/nqh-public/fogo-extension.git main

# Pull changes from standalone repo
git subtree pull --prefix apps/fogo-extension \
  https://github.com/nqh-public/fogo-extension.git main --squash
```

## Architecture

**Shared Logic (@fogo/core):**
- `picker.ts` - Event handlers (mouseover, click, ESC)
- `selector-generator.ts` - CSS selector generation with `css-selector-generator`
- `markdown-formatter.ts` - Element data → markdown conversion
- `element-extractor.ts` - Extract tag, styles, position, attributes
- `types.ts` - Shared TypeScript interfaces

**Extension-Specific:**
- **VSCode**: Webview panel, postMessage communication, picker script injection
- **Chrome**: Content scripts, background worker, clipboard API, toast notifications

**Deployment:**
- **Local dev**: Workspace protocol (`"@fogo/core": "workspace:*"`)
- **Public npm**: Version-pinned dependencies (`"@fogo/core": "^0.1.0"`)

## License

MIT
