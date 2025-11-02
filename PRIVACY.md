# Privacy Policy

**Last Updated:** November 2, 2025

## Summary

Fogó DOM Picker **does not collect, transmit, or store any user data**. Period.

## Data Collection

- ✅ **ZERO data collection**
- ✅ **ZERO external network requests**
- ✅ **ZERO analytics or tracking**
- ✅ **ZERO user data stored on remote servers**

The extension operates entirely locally in your browser.

## Permissions Explanation

Fogó requests the following permissions for core functionality:

### `activeTab`
**Why:** Access the current tab's DOM elements when you activate the picker
**What it does:** Allows Fogó to read page content ONLY when you explicitly click an element
**What it doesn't do:** Does not access tabs in the background or read browsing history

### `contextMenus`
**Why:** Add "Pick Element with Fogó" to right-click menu
**What it does:** Registers a context menu item for quick activation
**What it doesn't do:** Does not track what you right-click on

### `storage`
**Why:** Remember your ON/OFF preference
**What it does:** Stores extension state (enabled/disabled) in `chrome.storage.local`
**What it doesn't do:** Never synced to cloud, never transmitted externally

### `notifications`
**Why:** Show toast notifications when you copy an element
**What it does:** Displays a local notification with the copied element's tag name
**What it doesn't do:** Does not send notifications to external services

## Local Storage

The extension stores **only** one piece of data locally:

```javascript
{
  "enabled": true  // Extension ON/OFF state
}
```

This data:
- ✅ Stays on your device
- ✅ Is never synced
- ✅ Is never transmitted
- ✅ Can be cleared by uninstalling the extension

## Third-Party Services

**NONE.** Fogó does not communicate with any external servers, APIs, or services.

## Source Code

Fogó is open source. You can inspect every line of code:
- GitHub: https://github.com/nqh-public/fogo-extension
- All source code is available for review
- No minified or obfuscated code in production

## Changes to This Policy

If we ever change this privacy policy (unlikely, since we collect zero data), we will:
1. Update the "Last Updated" date
2. Post changes to this document
3. Notify users via extension update notes

## Contact

Questions about privacy?
- Email: fogo@ngoquochuy.com
- GitHub Issues: https://github.com/nqh-public/fogo-extension/issues

## Compliance

This extension complies with:
- ✅ GDPR (General Data Protection Regulation)
- ✅ CalOPPA (California Online Privacy Protection Act)
- ✅ Chrome Web Store Privacy Requirements
- ✅ Firefox Add-ons Privacy Requirements
