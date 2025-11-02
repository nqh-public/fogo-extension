# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |

## Reporting a Vulnerability

**Please DO NOT open public issues for security vulnerabilities.**

Instead, email: **fogo@ngoquochuy.com**

### What to Include

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

### Response Time

- **Initial response:** Within 48 hours
- **Status update:** Within 7 days
- **Fix timeline:** Depends on severity (critical issues prioritized)

### Disclosure Policy

- We will work with you to understand and fix the issue
- We will credit you in the fix (unless you prefer to remain anonymous)
- We will coordinate disclosure timing with you
- Security patches will be released as soon as possible

## Security Best Practices

Fogó follows these security principles:

- ✅ **Zero network requests** - No data leaves your browser
- ✅ **Minimal permissions** - Only request what's necessary
- ✅ **Content Security Policy** - Strict CSP in manifest
- ✅ **No eval()** - No dynamic code execution
- ✅ **Open source** - All code is auditable
- ✅ **Regular updates** - Dependencies kept current

## Known Security Considerations

### Permissions Required

- `activeTab` - Required to access page DOM
- `storage` - Required for ON/OFF state (local only)
- `contextMenus` - Required for right-click menu
- `notifications` - Required for toast notifications

### What Fogó Does NOT Do

- ❌ Does not send data to external servers
- ❌ Does not execute remote code
- ❌ Does not access browsing history
- ❌ Does not track user behavior
- ❌ Does not inject ads or tracking scripts

## Security Updates

Security patches will be released as:
- **Critical:** Immediate release
- **High:** Within 7 days
- **Medium:** Within 30 days
- **Low:** Next regular release

Users will be notified via:
- Extension update (auto-update in stores)
- GitHub Security Advisories
- CHANGELOG.md

## Contact

Security concerns: fogo@ngoquochuy.com
