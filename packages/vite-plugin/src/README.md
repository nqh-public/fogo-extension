# @nqh/vite-plugins

Shared Vite plugins for NQH monorepo applications.

## Plugins

### `fogo-listener`

Auto-injects Fogó VSCode extension message listener into HTML during development.

**Purpose**: Enables DOM element picking without manual script setup in every app.

**Usage**:

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import { fogoListener } from '@nqh/vite-plugins/fogo-listener';

export default defineConfig({
  plugins: [
    fogoListener(), // Add this line
    // ... other plugins
  ],
});
```

**Features**:
- ✅ Dev-only (`apply: 'serve'` - not included in production builds)
- ✅ Zero runtime overhead
- ✅ Works with TanStack Start, Vite, SvelteKit, Nuxt
- ✅ Automatic script injection via `transformIndexHtml`

**How it works**:
1. Plugin injects listener script into `<head>` during dev server startup
2. Script listens for `injectPickerScript` message from Fogó extension
3. When message received, executes picker script via `new Function()`
4. Picker enables hover/click element selection with clipboard export

**Compatibility**:
- Vite 5.x, 6.x
- TanStack Start (via Vinxi)
- SvelteKit
- Nuxt 3
- Plain Vite apps

**Security**:
- Only active in development mode
- Uses `new Function()` (similar to `eval`) - safe for localhost dev
- NO production bundle inclusion

## Development

No build step required - apps import TypeScript source directly.

```bash
# After adding new plugin
pnpm registry:update
```
