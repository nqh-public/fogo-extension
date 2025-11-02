# Changelog

All notable changes to the Selecto Browser Extension.

## [0.4.0] - 2025-11-01

### Added
- **Toast popup with copy button** - Dark theme popup window shows markdown preview with manual copy fallback
- **Toolbar badge toggle** - Click toolbar icon to enable/disable extension (ON/OFF badge persists)
- **Page metadata in output** - Markdown now includes page title, URL, and timestamp at bottom
- **Keyboard shortcuts in toast** - ESC to close, Cmd/Ctrl+C to copy
- **Extension state notifications** - Shows "Selecto Disabled" when trying to use disabled extension

### Changed
- **Toolbar icon behavior** - Now toggles extension ON/OFF instead of activating picker
- **Clipboard handling** - Dual mode: VSCode clipboard (if online) + manual copy button (always available)
- **Markdown format** - Added **PAGE METADATA** section at bottom with title/URL/timestamp

### Fixed
- Clipboard access no longer required - toast popup provides manual copy fallback
- Extension state persists across browser sessions via chrome.storage.local
- Picker auto-deactivates when extension disabled via toolbar

### Technical Details
- Added permissions: `storage`, `notifications`
- New file: `content/toast.html` (5.8KB)
- Updated: `background.js` (265 LOC), `content/picker.js` (235 LOC)
- Badge colors: Green (#10b981) for ON, Gray (#6b7280) for OFF

## [0.3.0] - 2025-11-01

### Added
- Browser extension architecture (Chrome/Firefox/Safari)
- Toolbar icon activation
- Keyboard shortcut (Cmd/Shift+E)
- Context menu "Pick Element with Selecto"
- Toggle on/off functionality
- Message passing (background ↔ content scripts)
- HTTP communication with VSCode extension (localhost:9876-9880)

### Changed
- Complete rewrite from bookmarklet to browser extension
- 90% code reuse from v0.2.0 (selector generation, element extraction)

### Technical Details
- Manifest V3 (Chrome/Firefox compatible)
- Service worker background script
- Content script with message passing
- Cross-browser support (Chrome, Firefox, Edge, Brave)
- Safari support via xcrun converter

## Related: VSCode Extension

See `apps/selecto/CHANGELOG.md` for VSCode extension changes (v0.2.0 bookmarklet server).

## License

Internal tool for NQH monorepo. Not for public distribution.
