# Changelog

All notable changes to Fogó DOM Picker browser extension.

## [1.0.0] - 2025-11-02

### 🎉 Initial Public Release

**Fogó** (Hungarian for "grabber/catcher") - Pick DOM elements from any webpage and export as markdown.

### Added

- **DOM element picker** with visual hover highlighting (red outline)
- **Markdown export** with comprehensive element data:
  - Element HTML
  - CSS selector path
  - Attributes table
  - Computed styles
  - Position & dimensions
  - Inner text content
  - Page URL
- **Toast notifications** (Sonner-inspired design)
  - Auto-copy to clipboard
  - "Save as markdown" button
  - Close button (X)
  - Auto-dismiss after 5 seconds
  - Toast stacking for multiple picks
- **Keyboard shortcut** - `Cmd/Ctrl+Shift+E` to activate picker
- **Context menu** - Right-click "Pick Element with Fogó"
- **Toolbar badge** - ON/OFF state indicator
- **Cross-browser support** - Chrome, Firefox, Edge, Brave
- **Zero data collection** - 100% offline, no analytics, no tracking
- **Open source** - MIT licensed

### Technical Details

- **Languages**: Vanilla JavaScript (ES modules)
- **Build tool**: esbuild
- **Bundle size**: ~34KB (content script)
- **Dependencies**: css-selector-generator (3.6.0)
- **Manifest**: V3 (Chrome/Firefox compatible)
- **Permissions**: activeTab, contextMenus, storage, notifications
- **Architecture**: Modular design (6 files, avg 108 LOC/file)

### File Structure

```
src/
├── background/
│   └── markdown.js (65 LOC)
├── content/
│   ├── picker.js (156 LOC)
│   ├── toast.js (108 LOC)
│   ├── utils.js (91 LOC)
│   └── app.css (137 LOC)
└── shared/
    └── constants.js (9 LOC)
```

### Privacy & Security

- ✅ Zero data collection
- ✅ No external network requests
- ✅ All processing happens locally
- ✅ Open source code (auditable)
- ✅ Minimal permissions
- ✅ MIT licensed

### Documentation

- README.md - Installation & usage guide
- PRIVACY.md - Privacy policy (zero data collection)
- CONTRIBUTING.md - Contribution guidelines
- CODE_OF_CONDUCT.md - Contributor Covenant
- SECURITY.md - Security policy
- LICENSE - MIT License

---

## Previous Development (Internal)

**Note**: Versions 0.1.0 - 0.5.0 were internal development builds before public release. The extension was previously known as "Selecto" and was part of the NQH monorepo.

### [0.5.0] - 2025-11-01 (Internal)
- Switched from inline CSS to external stylesheet (app.css)
- Added modular architecture (split monolithic files)
- Improved code organization (350 LOC limit per file)

### [0.4.0] - 2025-11-01 (Internal)
- Added toast notification system
- Added toolbar badge ON/OFF toggle
- Added page metadata to markdown output

### [0.3.0] - 2025-11-01 (Internal)
- Converted from bookmarklet to Chrome extension
- Added context menu integration
- Added keyboard shortcuts

### [0.2.0] - 2025-10-31 (Internal)
- Initial bookmarklet prototype
- Basic element picker functionality

### [0.1.0] - 2025-10-30 (Internal)
- VSCode extension integration (removed in public release)

---

## Versioning

This project follows [Semantic Versioning](https://semver.org/):
- **MAJOR** version for incompatible changes
- **MINOR** version for backward-compatible features
- **PATCH** version for backward-compatible bug fixes
