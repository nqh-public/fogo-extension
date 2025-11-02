# Fogó Browser Extension

Browser extension for picking DOM elements from any webpage and sending them to VSCode for AI-assisted development.

## Features

- ✅ **One-time installation** - Install once, use on any website
- ✅ **Toggle on/off** - Activate via toolbar icon, keyboard shortcut, or context menu
- ✅ **Page metadata** - Auto-includes URL and page title in DOM reference
- ✅ **Cross-browser** - Works on Chrome, Firefox, Edge, Brave, Safari
- ✅ **Seamless integration** - Communicates with VSCode extension via HTTP

## Installation

### Chrome / Edge / Brave (Developer Mode)

1. **Build the extension** (if needed):

   ```bash
   # Extension files are ready to use in apps/selecto-extension/
   # No build step required for unpacked extension
   ```

2. **Load in browser**:
   - Open `chrome://extensions/` (or `edge://extensions/`)
   - Enable "Developer mode" (toggle in top-right)
   - Click "Load unpacked"
   - Select `/path/to/fogo-extension/`

3. **Verify installation**:
   - Extension icon appears in toolbar (red crosshair)
   - Name: "Fogó DOM Picker"

### Firefox (Temporary Add-on)

1. **Open debugging page**:
   - Navigate to `about:debugging#/runtime/this-firefox`

2. **Load temporary add-on**:
   - Click "Load Temporary Add-on"
   - Select `apps/selecto-extension/manifest.json`

3. **Note**: Extension is removed when Firefox closes
   - For permanent installation, sign and publish to AMO (not recommended for personal use)

### Safari (requires Xcode)

1. **Convert web extension to Safari**:

   ```bash
   cd apps/selecto-extension/dist/safari
   xcrun safari-web-extension-converter \
     /path/to/fogo-extension
     --app-name "Fogó Picker" \
     --bundle-identifier "com.nqh.selecto"
   ```

2. **Open in Xcode**:
   - Open `Fogó Picker.xcodeproj`
   - Build and run (⌘+R)

3. **Enable in Safari**:
   - Safari → Preferences → Extensions
   - Enable "Fogó Picker"

## Usage

### Prerequisites

1. **VSCode extension must be running**:
   - The Fogó VSCode extension starts automatically
   - Server runs on `localhost:9876` (or ports 9877-9880 as fallback)
   - Check VSCode Output panel → "Fogó" for status

### Activation Methods

**Method 1: Toolbar Icon**

- Click the red crosshair icon in browser toolbar
- Click again to toggle off

**Method 2: Keyboard Shortcut**

- **Mac**: `Cmd+Shift+E`
- **Windows/Linux**: `Ctrl+Shift+E`
- Press again to toggle off

**Method 3: Context Menu**

- Right-click anywhere on page
- Select "Pick Element with Fogó"

**Method 4: ESC Key**

- Press `ESC` to deactivate while picker is active

### Picking Elements

1. **Activate picker** (any method above)
   - Cursor changes to crosshair
   - Elements get red outline (2px) on hover

2. **Hover over elements**
   - Move mouse to inspect different elements
   - Red outline shows current target

3. **Click to select**
   - Click the element you want
   - DOM reference auto-copies to VSCode clipboard
   - Picker deactivates automatically

4. **Paste in VSCode**
   - Return to VSCode
   - Paste (`Cmd+V` / `Ctrl+V`)
   - Formatted markdown appears

### Expected Output

```markdown
## Selected Element: Submit

**ELEMENT**
<button class="btn btn-primary" data-testid="submit-btn">Submit</button>

**PATH**
`.btn.btn-primary[data-testid="submit-btn"]`

**PAGE**

- **Title**: Example Page
- **URL**: https://example.com/form

**ATTRIBUTES**
| Attribute | Value |
|-----------|-------|
| class | btn btn-primary |
| data-testid | submit-btn |
| type | button |

**COMPUTED STYLES**
| Property | Value |
|----------|-------|
| color | rgb(255, 255, 255) |
| backgroundColor | rgb(0, 123, 255) |
| fontSize | 16px |
| fontFamily | Arial, sans-serif |
| display | inline-block |
| position | static |

**POSITION & SIZE**
| Property | Value |
|----------|-------|
| top | 342.50px |
| left | 120.00px |
| width | 100.00px |
| height | 40.00px |

**INNER TEXT**
Submit
```

## Troubleshooting

### "Failed to send to VSCode"

**Cause**: VSCode extension not running or ports blocked

**Solutions**:

1. Check VSCode Output → "Fogó" channel for server status
2. Restart VSCode extension:
   - VSCode Command Palette (`Cmd/Ctrl+Shift+P`)
   - Run: "Developer: Reload Window"
3. Check firewall/antivirus blocking localhost:9876

### Picker doesn't activate

**Cause**: Content script not injected or JavaScript blocked

**Solutions**:

1. Reload the webpage (`Cmd/Ctrl+R`)
2. Check browser console for errors
3. Verify extension is enabled (`chrome://extensions/`)
4. Check Content Security Policy (CSP) restrictions

### Wrong element selected

**Cause**: Overlapping elements or z-index issues

**Solutions**:

1. Zoom in on target element
2. Use browser DevTools to inspect first
3. Click during brief hover (outline appears)

### Extension removed after browser restart (Firefox)

**Cause**: Loaded as temporary add-on

**Solutions**:

- Accept this limitation (load each session)
- OR sign and self-host on AMO (advanced)

## Development

### File Structure

```
apps/selecto-extension/
├── manifest.json           # Chrome/Firefox manifest
├── manifest-safari.json    # Safari overrides (not created yet)
├── background.js           # Service worker
├── content/
│   ├── picker.js          # DOM picker logic
│   └── styles.css         # Content script styles
├── icons/                 # Extension icons (SVG)
│   ├── icon-16.svg
│   ├── icon-48.svg
│   └── icon-128.svg
└── dist/                  # Build outputs
    ├── chrome/
    ├── firefox/
    └── safari/
```

### Debugging

**Chrome/Edge**:

- `chrome://extensions/` → Click "Inspect views: service worker"
- View background script console

**Firefox**:

- `about:debugging#/runtime/this-firefox` → Click "Inspect"
- View background script console

**Content Script**:

- Regular browser DevTools (`F12`)
- Console shows `[Fogó]` prefixed messages

## Technical Details

### Communication Flow

```
User Action (toolbar/keyboard/context menu)
    ↓
Background Script (background.js)
    ↓ chrome.tabs.sendMessage
Content Script (content/picker.js)
    ↓ Activate picker, wait for click
User Clicks Element
    ↓ Extract data (selector, styles, position, pageTitle, url)
Content Script
    ↓ chrome.runtime.sendMessage
Background Script
    ↓ HTTP POST to localhost:9876/element-data
VSCode Extension (BookmarkletServer)
    ↓ Copy to clipboard
VSCode Clipboard
```

### Permissions

- `activeTab` - Access current tab DOM
- `contextMenus` - Add right-click menu item

### Code Reuse from v0.2.0

- **90% reuse**: CSS selector generation, element data extraction, markdown formatting
- **New**: Message passing (background ↔ content), toggle state management, page metadata

## Version History

### v0.3.0 (2025-11-01)

- ✅ Browser extension with Chrome/Firefox support
- ✅ Toolbar icon, keyboard shortcut, context menu activation
- ✅ Toggle on/off functionality
- ✅ Page title and URL in output
- ✅ HTTP communication with VSCode extension

### Related: VSCode Extension v0.2.0

- Bookmarklet approach (predecessor)
- HTTP server on localhost:9876
- See `apps/selecto/CHANGELOG.md`

## License

Internal tool for NQH monorepo. Not for public distribution.
