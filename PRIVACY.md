# Privacy Policy

**Last Updated:** November 2, 2025

## Summary

Fogó ("the Extension") is committed to protecting your privacy. **This extension collects zero data.** All processing happens locally on your device.

## Data Collection

**We do NOT collect, store, or transmit any of the following:**

- ❌ Browsing history
- ❌ Personal information
- ❌ Usage analytics or telemetry
- ❌ Cookies or tracking identifiers
- ❌ DOM content from web pages
- ❌ Clipboard data
- ❌ URLs or page titles (except for local processing)

## How the Extension Works

### Chrome/Firefox Extension

1. **Local Processing Only**: When you activate the picker and select an element, all data extraction happens locally in your browser's JavaScript environment
2. **No External Servers**: The extension does not communicate with any external servers or APIs
3. **Clipboard Access**: The extension copies extracted data to your system clipboard only when you click an element - this data never leaves your device
4. **Optional VSCode Integration**: If you use the VSCode extension, data is sent to `localhost` (your own computer) only - never to external servers

### VSCode Extension

1. **Local HTTP Server**: Runs a small HTTP server on `localhost:9876-9880` (configurable)
2. **Device-Local Communication**: Only accepts connections from your own machine (loopback address `127.0.0.1`)
3. **No Internet Access**: Does not make outbound requests to the internet
4. **No Logging**: Does not log or store received data beyond the current session

### Vite Plugin

1. **Development Tool Only**: Runs during development, not in production
2. **No Data Collection**: Only listens for local connections during `vite dev`
3. **No Telemetry**: Does not send any data to external services

## Third-Party Services

The Extension does **NOT** use any third-party services, including:

- ❌ Analytics (e.g., Google Analytics, Mixpanel)
- ❌ Error reporting (e.g., Sentry, Rollbar)
- ❌ Advertising networks
- ❌ CDNs for loading remote code
- ❌ Cloud storage or databases

## Permissions Explained

### Chrome Extension Permissions

The extension requests the following permissions for functionality:

| Permission       | Purpose                                | Data Access                                           |
| ---------------- | -------------------------------------- | ----------------------------------------------------- |
| `activeTab`      | Access the currently active tab's DOM  | DOM read access when picker is activated (local only) |
| `contextMenus`   | Add "Pick Element" to right-click menu | No data access                                        |
| `storage`        | Save extension enabled/disabled state  | Stores boolean locally in browser storage             |
| `notifications`  | Show confirmation toasts               | No data access                                        |
| `clipboardWrite` | Copy extracted data to clipboard       | One-time write when you click an element              |

**Important:** None of these permissions are used to collect or transmit data externally.

### VSCode Extension Permissions

The VSCode extension uses standard Node.js APIs to:

- Create a local HTTP server (`http` module)
- Open a webview panel in VSCode (`vscode.window.createWebviewPanel`)
- No telemetry or external network requests

## Data Storage

### Local Storage Only

- **Chrome Extension**: Uses `chrome.storage.local` to store only the extension's enabled/disabled state (1 boolean value)
- **VSCode Extension**: Does not persist any data to disk
- **No Cloud Storage**: The extension does not use cloud storage or sync data across devices

## Security

### Content Security Policy

The VSCode extension webview uses a strict Content Security Policy (CSP):

```
default-src 'none';
script-src 'nonce-<random>' 'unsafe-inline';
style-src 'unsafe-inline';
```

This prevents:

- Loading scripts from external domains
- Executing inline scripts without nonces
- Data exfiltration

### Same-Origin Policy

The extension respects browser same-origin policies and **cannot** access:

- Cross-origin iframes
- Pages with restrictive Content Security Policies
- Browser internal pages (chrome://, about://, etc.)

## Children's Privacy

The Extension is not directed toward children under the age of 13. We do not knowingly collect any information from children.

## Changes to This Policy

We may update this Privacy Policy from time to time. The "Last Updated" date at the top of this document indicates when the policy was last revised.

## Open Source Transparency

Fogó is **100% open source**. You can audit the code yourself:

- **GitHub Repository**: https://github.com/nqh-public/fogo-extension
- **License**: MIT License
- **All Code is Public**: No proprietary or closed-source components

## Contact

If you have questions about this Privacy Policy or data practices, please contact:

- **Email**: repo@ngoquochuy.com
- **GitHub Issues**: https://github.com/nqh-public/fogo-extension/issues

## Compliance

This extension complies with:

- ✅ **GDPR** (General Data Protection Regulation) - No personal data collected
- ✅ **CCPA** (California Consumer Privacy Act) - No personal data collected
- ✅ **Chrome Web Store Privacy Requirements** - Zero data collection declared
- ✅ **Firefox Add-ons Privacy Policy Requirements** - Zero data collection declared

## Your Rights

Since we collect zero data, there is no data to:

- Request access to
- Request deletion of
- Request correction of
- Opt-out of

The extension is designed with privacy-by-default architecture.
