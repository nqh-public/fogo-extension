# Contributing to Fogó

Thank you for considering contributing to Fogó! 🎉

## How to Contribute

### Reporting Bugs

1. Check existing issues to avoid duplicates
2. Use the Bug Report template
3. Include browser version, extension version, and steps to reproduce
4. Add screenshots if applicable

### Suggesting Features

1. Check existing feature requests
2. Use the Feature Request template
3. Explain the problem it solves
4. Describe your proposed solution

### Code Contributions

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
   - Follow existing code style (vanilla JS, JSDoc comments)
   - Keep files under 350 LOC
   - Test on Chrome, Firefox, and Edge
4. **Commit your changes**
   ```bash
   git commit -m "feat: add amazing feature"
   ```
5. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

## Development Setup

```bash
git clone https://github.com/nqh-public/fogo-extension.git
cd fogo-extension
npm install
npm run build
```

### Load Unpacked Extension

**Chrome:**
1. Go to `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select `dist/` folder

**Firefox:**
1. Go to `about:debugging#/runtime/this-firefox`
2. Click "Load Temporary Add-on"
3. Select `dist/manifest.json`

## Code Style

- Use vanilla JavaScript (no frameworks)
- Add JSDoc comments for all functions
- Follow existing naming conventions
- Format with Prettier (if you have it)

## Testing

Before submitting a PR, test:
- ✅ Element picking works
- ✅ Toast notifications display
- ✅ Markdown export is correct
- ✅ Keyboard shortcuts work
- ✅ Close and download buttons work
- ✅ No console errors

## Questions?

- Email: fogo@ngoquochuy.com
- Open an issue for questions
