# Changelog

All notable changes to the Fogó VSCode Extension.

## [0.2.0] - 2025-11-01

### Changed
- **BREAKING**: Complete architecture rewrite from webview/iframe to bookmarklet/HTTP server approach
- Replaced webview panel with local HTTP server (localhost:9876)
- Changed picker activation from VSCode panel to browser bookmarklet
- Picker script communication changed from `postMessage` to HTTP `fetch`

### Added
- `BookmarkletServer` class for serving picker script and receiving element data
- HTTP endpoints: GET `/picker.js`, POST `/element-data`
- CORS headers for cross-origin support
- Port fallback mechanism (9876-9880) when primary port occupied
- `selecto.generateBookmarklet` command for bookmarklet setup
- Constants: `SERVER_PORT`, `FALLBACK_PORTS`, `HTTP_STATUS`

### Removed
- `PreviewProvider` class (213 LOC deleted)
- Commands: `selecto.startPreview`, `selecto.togglePicker`, `selecto.reloadPreview`
- Webview panel logic from `extension.ts`
- iframe detection and parent window communication

### Fixed
- TypeScript compilation errors (added `@/` path aliases to tsconfig.json)
- Cross-origin iframe access blocked by browser security
- ESLint violations: magic numbers, import order, unused variables
- CSP nonce generation improved (crypto.randomBytes vs Math.random)

### Technical Details
- 60% code reuse from v0.1.0 (selector-generator, markdown-formatter, types)
- Activation event changed to `onStartupFinished`
- Picker auto-deactivates after element selection
- Server lifecycle managed by extension activate/deactivate

## [0.1.0] - 2025-11-01

### Added
- Initial implementation with webview/iframe approach
- Selector generation using `css-selector-generator`
- Markdown formatting for AI context
- TypeScript types for DOM element references
- Basic preview provider with CSP

### Known Issues
- Cross-origin restrictions prevent iframe script injection (fixed in v0.2.0)
- TypeScript path alias configuration missing (fixed in v0.2.0)
