# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Reporting a Vulnerability

**Please do NOT report security vulnerabilities through public GitHub issues.**

Instead, please report security vulnerabilities via email to:

**repo@ngoquochuy.com**

Include in your report:

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if available)

### What to Expect

- **Acknowledgment**: Within 48 hours
- **Initial assessment**: Within 5 business days
- **Status updates**: Every 7 days until resolved
- **Fix timeline**: Depends on severity
  - Critical: 24-48 hours
  - High: 7 days
  - Medium: 30 days
  - Low: 90 days

### Disclosure Policy

- We will coordinate disclosure with you
- Security fixes will be released as patches
- Credit will be given to reporters (unless anonymous preferred)

## Security Best Practices

When using Fogó:

1. **VSCode Extension**:
   - Only preview trusted websites
   - Be cautious with URLs from untrusted sources
   - Extension has no network access (local-only)

2. **Chrome Extension**:
   - Extension runs in isolation (no site data access)
   - Picker script injected only on user action
   - Clipboard access requires user permission

3. **Data Privacy**:
   - Zero data collection
   - No telemetry or analytics
   - All processing happens locally

## Known Limitations

- **Same-origin policy**: Cannot pick elements in cross-origin iframes
- **CSP restrictions**: Some sites may block script injection
- **Permissions**: VSCode/Chrome may prompt for clipboard access

## Security Contacts

- Email: repo@ngoquochuy.com
- GitHub: [@nqh-public](https://github.com/nqh-public)

Thank you for helping keep Fogó secure!
