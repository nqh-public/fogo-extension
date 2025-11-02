# Fogó Extension

**Purpose**: DOM element picker for AI workflows (VSCode + Chrome extensions)
**Status**: Production-ready with testing, CI/CD, and quality enforcement
**Repository**: Standalone public repo + NQH monorepo subtree

---

## Project Overview

Fogó enables AI assistants to precisely reference DOM elements by clicking. Outputs structured markdown with CSS selectors, text content, and visual context.

**Core functionality**:
- Visual element selection with overlay UI
- Intelligent CSS selector generation
- Markdown-formatted output for AI context
- Works in VSCode preview panels + Chrome browser

---

## Architecture

**Monorepo structure** (subtree root: `apps/fogo-extension/`):
```
packages/
  core/           @fogo/core - Shared picker logic (TypeScript)
  vite-plugin/    @fogo/vite-plugin - Auto-injection for Vite apps
apps/
  vscode/         VSCode extension (imports @fogo/core)
  chrome/         Chrome extension (imports @fogo/core)
```

**Key principle**: Shared logic in `@fogo/core`, platform-specific code in apps.

---

## Tech Stack

- **Language**: TypeScript (strict mode)
- **Testing**: Vitest + happy-dom (97% coverage target)
- **Build**: Custom build scripts (VSCode: vsce, Chrome: custom bundler)
- **Quality**: ESLint + Prettier + Husky pre-commit hooks
- **CI/CD**: GitHub Actions (typecheck, lint, test, build)

---

## Code Quality Standards

**Pre-commit enforcement** (from NQH monorepo):
- File headers with `@what`, `@why`, `@exports` tags
- File size limits (≤350 LOC)
- Circular dependency detection
- Semantic duplication detection (Rule of 3)
- ESLint + Prettier auto-fix

**Run checks**:
```bash
pnpm lint        # ESLint
pnpm format      # Prettier
pnpm typecheck   # TypeScript
pnpm test        # Vitest
```

---

## Development Workflow

**Setup**:
```bash
pnpm install
pnpm build       # Build all packages + extensions
```

**Testing**:
```bash
pnpm test              # Run tests
pnpm test:coverage     # With coverage report
pnpm test:ui           # Visual test UI
```

**Build for distribution**:
```bash
# VSCode extension
cd apps/vscode && pnpm build

# Chrome extension
cd apps/chrome && pnpm build
```

---

## Key Constraints

1. **VSCode API limitations**:
   - Preview panels use iframes (same-origin policy applies)
   - Picker script injected via postMessage
   - No direct DOM access from extension

2. **Chrome extension**:
   - Content scripts run in isolated context
   - Background scripts handle messaging
   - CSP restrictions on inline scripts

3. **Shared core package**:
   - Must work in both Node.js (VSCode) and browser (Chrome)
   - No platform-specific APIs in `@fogo/core`

---

## File Organization

**Monorepo imports**: Use workspace protocol for local dev, published npm for production
```typescript
// packages/core/package.json
"name": "@fogo/core"

// apps/vscode/package.json
"dependencies": {
  "@fogo/core": "workspace:*"  // Local dev
}
```

**Import patterns**:
```typescript
// ✅ Correct
import { formatMarkdown } from '@fogo/core'

// ❌ Wrong (no relative imports across packages)
import { formatMarkdown } from '../../packages/core/src/markdown-formatter'
```

---

## Testing Philosophy

**TDD workflow**: RED → GREEN → REFACTOR

**Coverage targets**:
- Unit tests: 97% (current)
- Core package: 100% (critical path)
- UI components: 80% (interaction-heavy)

**Test location**: Co-located with source (`*.test.ts` next to `*.ts`)

---

## Distribution

**Public repository**: `github.com/nqh-public/fogo-extension`
**NQH monorepo subtree**: `apps/fogo-extension/`

**Sync strategy**:
- Monorepo → Public: Manual push via `git subtree push`
- Public → Monorepo: Daily automated sync at 7 AM UTC (GitHub Actions)

---

## Important Reminders

- **No invention**: Follow existing patterns in `@fogo/core`
- **Test-first**: Write tests before implementation
- **File size**: Keep files ≤350 LOC (enforced by pre-commit)
- **Atomic commits**: Use line references in commit messages (e.g., `file.ts:42`)
- **Evidence-based**: No "completed" without line references

---

## Common Tasks

**Add new selector strategy**:
1. Add to `packages/core/src/selector-generator.ts`
2. Write tests in `selector-generator.test.ts`
3. Update both VSCode + Chrome apps (no code change needed if using `@fogo/core`)

**Fix picker UI bug**:
1. Locate issue in `apps/vscode/src/picker-script.ts` or `apps/chrome/src/content/picker.js`
2. Fix platform-specific code
3. Test in respective environment

**Update markdown output format**:
1. Modify `packages/core/src/markdown-formatter.ts`
2. Update tests in `markdown-formatter.test.ts`
3. Verify both platforms automatically get the update

---

**Created**: 2025-11-02
**Last updated**: 2025-11-02
