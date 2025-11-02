# Fogó DOM Picker

> Pick DOM elements from any webpage and export as markdown

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Chrome](https://img.shields.io/badge/Chrome-Supported-green.svg)](https://www.google.com/chrome/)
[![Firefox](https://img.shields.io/badge/Firefox-Supported-orange.svg)](https://www.mozilla.org/firefox/)
[![Edge](https://img.shields.io/badge/Edge-Supported-blue.svg)](https://www.microsoft.com/edge)

**Fogó** (Hungarian for "grabber/catcher") is a lightweight browser extension that lets you pick any DOM element from a webpage and export its details as markdown. Perfect for developers, designers, and web inspectors.

## ✨ Features

- 🎯 **Visual element picker** - Hover to highlight, click to select
- 📝 **Markdown export** - Complete element data in markdown format
- ⌨️ **Keyboard shortcuts** - `Cmd/Ctrl+Shift+E` for quick activation
- 🌐 **Cross-browser** - Works on Chrome, Firefox, Edge, and Brave
- 🔒 **Privacy-first** - Zero data collection, works 100% offline
- 🎨 **Clean UI** - Sonner-inspired toast notifications
- 💾 **Download option** - Save as `.md` file with one click
- 🚫 **No tracking** - Open source, no analytics, no external requests

## 📦 Installation

### Chrome / Edge / Brave

1. Download the latest release from [Releases](https://github.com/nqh-public/fogo-extension/releases)
2. Unzip the downloaded file
3. Open `chrome://extensions/` (or `edge://extensions/`)
4. Enable "Developer mode" (toggle in top-right)
5. Click "Load unpacked"
6. Select the `dist/` folder from the unzipped files

### Firefox

1. Download the latest `.xpi` file from [Releases](https://github.com/nqh-public/fogo-extension/releases)
2. Open `about:addons`
3. Click the gear icon → "Install Add-on From File"
4. Select the downloaded `.xpi` file

### From Source

```bash
git clone https://github.com/nqh-public/fogo-extension.git
cd fogo-extension
npm install
npm run build
# Then load the dist/ folder as unpacked extension
```

## 🚀 Usage

### Activate the Picker

**Method 1: Keyboard Shortcut**
- Press `Cmd+Shift+E` (Mac) or `Ctrl+Shift+E` (Windows/Linux)

**Method 2: Toolbar Icon**
- Click the Fogó icon in your browser toolbar
- Click again to toggle ON/OFF

**Method 3: Right-Click Menu**
- Right-click anywhere on the page
- Select "Pick Element with Fogó"

### Pick an Element

1. Activate the picker (see above)
2. Hover over any element - it will highlight in red
3. Click to select the element
4. Toast notification appears with "Copied <tagName>"

### Export Data

The selected element's data is automatically copied to your clipboard in markdown format:

```markdown
## Selected Element: <button>

**ELEMENT**
<button class="btn btn-primary" id="submit">Submit</button>

**PATH**
`#submit`

**ATTRIBUTES**
| Attribute | Value |
|-----------|-------|
| class | btn btn-primary |
| id | submit |

**COMPUTED STYLES**
| Property | Value |
|----------|-------|
| color | rgb(255, 255, 255) |
| backgroundColor | rgb(13, 110, 253) |
...
```

### Save as File

Click "Save as markdown" in the toast notification to download the data as a `.md` file.

### Cancel

Press `ESC` key to deactivate the picker at any time.

## 🛠️ Development

### Prerequisites

- Node.js 18+
- npm or pnpm

### Local Setup

```bash
# Clone repository
git clone https://github.com/nqh-public/fogo-extension.git
cd fogo-extension

# Install dependencies
npm install

# Build extension
npm run build

# Watch mode (rebuilds on change)
npm run watch

# Clean dist folder
npm run clean
```

### Load Unpacked Extension

**Chrome/Edge:**
1. Go to `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select `dist/` folder

**Firefox:**
1. Go to `about:debugging#/runtime/this-firefox`
2. Click "Load Temporary Add-on"
3. Select `dist/manifest.json`

### Project Structure

```
fogo-extension/
├── src/
│   ├── background/
│   │   └── markdown.js       # Markdown formatter
│   ├── content/
│   │   ├── picker.js         # Main content script
│   │   ├── toast.js          # Toast notifications
│   │   ├── utils.js          # Utilities (selector, extractor)
│   │   └── app.css           # Styles
│   ├── shared/
│   │   └── constants.js      # Shared constants
│   └── background.js         # Background service worker
├── static/
│   ├── icons/                # Extension icons
│   └── manifest.json         # Extension manifest
├── build.mjs                 # esbuild build script
└── package.json
```

### Build Process

Uses [esbuild](https://esbuild.github.io/) to bundle:
- `src/content/picker.js` → `dist/content/picker.js` (with dependencies)
- `src/background.js` → `dist/background.js`
- `src/content/app.css` → `dist/content/app.css`
- Static files copied to `dist/`

## 🧪 Testing

Before submitting changes, test:
- ✅ Element picking works on various websites
- ✅ Toast notification displays correctly
- ✅ Markdown export includes all data
- ✅ Keyboard shortcut activates picker
- ✅ Close button dismisses toast
- ✅ Download button saves file
- ✅ Multiple toasts stack correctly
- ✅ No console errors (check DevTools)

Test on:
- Chrome (latest)
- Firefox (latest)
- Edge (latest)

## 🤝 Contributing

Contributions welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Quick Start

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly
5. Commit (`git commit -m 'feat: add amazing feature'`)
6. Push (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 🐛 Bug Reports

Found a bug? Please:
1. Check existing [Issues](https://github.com/nqh-public/fogo-extension/issues)
2. If new, create a detailed bug report
3. Include browser version, extension version, steps to reproduce

## 💡 Feature Requests

Have an idea? Create a [Feature Request](https://github.com/nqh-public/fogo-extension/issues/new)

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

Copyright (c) 2025 Ngo Quoc Huy

## 🔒 Privacy

Fogó collects **ZERO user data**. No analytics, no tracking, no external requests. Everything happens locally in your browser.

See [PRIVACY.md](PRIVACY.md) for full privacy policy.

## 📝 Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history.

## 🔐 Security

Security issues? Please email **fogo@ngoquochuy.com** (do not open public issues).

See [SECURITY.md](SECURITY.md) for details.

## 🌟 Support

If you find Fogó useful:
- ⭐ Star this repo on GitHub
- 🐛 Report bugs to help improve it
- 💡 Suggest features
- 📢 Share with others

## 📧 Contact

- Email: fogo@ngoquochuy.com
- Issues: [GitHub Issues](https://github.com/nqh-public/fogo-extension/issues)
- Website: https://ngoquochuy.com

## 🙏 Acknowledgments

- Inspired by browser DevTools element inspection
- Toast UI inspired by [Sonner](https://sonner.emilkowal.ski/)
- CSS selector generation powered by [css-selector-generator](https://github.com/fczbkk/css-selector-generator)

---

Made with ❤️ by [Ngo Quoc Huy](https://ngoquochuy.com)
