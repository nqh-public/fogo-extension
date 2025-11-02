# Fogó Extension - Quick Start

## Installation (Chrome)

1. Open Chrome
2. Navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle top-right)
4. Click "Load unpacked"
5. Select `/path/to/fogo-extension/`

## Features

### ✅ Toolbar Badge Toggle

- **Click toolbar icon** → Toggles extension ON/OFF
- **Badge shows state**: Green "ON" / Gray "OFF"
- **State persists** across browser sessions

### ✅ Toast Popup with Copy Button

- **Shows automatically** after picking element
- **Two modes**:
  - ✅ **VSCode online**: "Element data copied to clipboard!"
  - ⚠️ **VSCode offline**: "Failed to copy to clipboard. Use button below:"
- **Copy button**: Manual clipboard copy
- **Close button**: Dismiss popup
- **Keyboard shortcuts**:
  - `ESC` - Close popup
  - `Cmd/Ctrl+C` - Copy to clipboard

### ✅ Page Metadata in Output

Markdown now includes at bottom:

```markdown
**PAGE METADATA**
| Property | Value |
|----------|-------|
| Page Title | Example Page |
| URL | https://example.com |
| Timestamp | 2025-11-01T23:15:00.000Z |
```

## Usage Flow

### When VSCode Extension Running

1. **Click toolbar icon** (or `Cmd+Shift+E` or right-click → "Pick Element")
2. **Hover** over element (red outline appears)
3. **Click** element
4. **Toast popup shows**: ✅ "Element data copied to clipboard!"
5. **Paste in VSCode** (`Cmd/Ctrl+V`) - markdown appears
6. **Close toast** (click "Close" or press `ESC`)

### When VSCode Extension Offline

1. **Click toolbar icon**
2. **Hover** over element
3. **Click** element
4. **Toast popup shows**: ⚠️ "Failed to copy to clipboard. Use button below:"
5. **Click "Copy to Clipboard"** button
6. **Button changes to**: "Copied!" (green, 2 seconds)
7. **Paste anywhere** (`Cmd/Ctrl+V`)

## Disable Extension

**Click toolbar icon** → Badge changes to gray "OFF"

**All activation methods disabled**:

- ❌ Toolbar click (toggles ON/OFF instead)
- ❌ Keyboard shortcut (`Cmd+Shift+E`) → Shows notification "Fogó Disabled"
- ❌ Context menu → Shows notification "Fogó Disabled"

**To re-enable**: Click toolbar icon again → Badge changes to green "ON"

## File Structure

```
apps/selecto-extension/
├── manifest.json              # Chrome manifest (v3)
├── background.js              # Service worker (badge, HTTP, toast)
├── content/
│   ├── picker.js             # DOM picker with message passing
│   ├── styles.css            # (empty - uses inline styles)
│   └── toast.html            # Popup window with copy button
├── icons/
│   ├── icon-16.svg
│   ├── icon-48.svg
│   └── icon-128.svg
└── README.md                 # Full documentation
```

## Permissions

- `activeTab` - Access current tab DOM
- `contextMenus` - Add right-click menu
- `storage` - Persist ON/OFF state
- `notifications` - Show "Fogó Disabled" messages

## Troubleshooting

### Badge not showing

- Reload extension: `chrome://extensions/` → Click reload icon
- Or restart Chrome

### Toast popup doesn't appear

- Check browser console (`F12`) for errors
- Verify popup blocker not blocking

### "Failed to copy to clipboard"

- VSCode extension not running
- Start VSCode or use "Copy to Clipboard" button in toast

### Extension disabled after restart

- Check `chrome://extensions/` - extension should auto-load
- If missing, click "Load unpacked" again

## Next Steps

- [ ] Test in Chrome
- [ ] Test in Firefox (`about:debugging#/runtime/this-firefox`)
- [ ] Create Safari build (requires Xcode)
- [ ] Update VSCode extension to handle new data format
