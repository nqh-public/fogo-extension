# Contributing to Fogó

Thank you for your interest in contributing to Fogó! This document provides guidelines for contributing to the project.

## Code of Conduct

Be respectful, inclusive, and professional in all interactions.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/nqh-public/fogo-extension/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Browser/VSCode version
   - Screenshots if applicable

### Suggesting Features

1. Check [Issues](https://github.com/nqh-public/fogo-extension/issues) for existing feature requests
2. Create a new issue with:
   - Clear use case description
   - Expected behavior
   - Why this benefits users

### Pull Requests

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/your-feature-name`
3. **Install dependencies**: `pnpm install`
4. **Make your changes**:
   - Follow existing code style (TypeScript, ESLint)
   - Add tests if applicable
   - Update documentation
5. **Test your changes**:
   - VSCode extension: `cd apps/vscode && pnpm build`
   - Chrome extension: `cd apps/chrome && pnpm build`
   - Core package: Verify types compile
6. **Commit with clear messages**:
   - Use conventional commits: `feat:`, `fix:`, `docs:`, `refactor:`
   - Include line references for changes
7. **Push to your fork**: `git push origin feature/your-feature-name`
8. **Open a pull request**:
   - Describe what changed and why
   - Link related issues
   - Add screenshots/videos if UI changed

### Development Setup

```bash
# Clone repository
git clone https://github.com/nqh-public/fogo-extension.git
cd fogo-extension

# Install dependencies
pnpm install

# Build packages
pnpm build

# Development workflow
cd apps/vscode && pnpm dev     # VSCode extension
cd apps/chrome && pnpm dev     # Chrome extension
```

### Code Style

- **TypeScript**: Strict mode enabled
- **Formatting**: Prettier (if available)
- **Naming**: camelCase (variables/functions), PascalCase (types/components)
- **File headers**: Include `@what`, `@why`, `@exports` comments

### Project Structure

```
fogo-extension/
  packages/
    core/           # Shared DOM picker logic (@fogo/core)
    vite-plugin/    # Vite auto-injection plugin (@fogo/vite-plugin)
  apps/
    vscode/         # VSCode extension
    chrome/         # Chrome extension
```

### Shared Logic (packages/core)

Changes to `packages/core/` affect **both** VSCode and Chrome extensions. Always test both after modifying core logic.

### Testing

- Manual testing required (no automated tests yet)
- Test picker in both extensions
- Verify markdown output format
- Check selector uniqueness

### Documentation

- Update README.md for user-facing changes
- Update inline comments for code changes
- Add examples for new features

## Questions?

Open a [Discussion](https://github.com/nqh-public/fogo-extension/discussions) or comment on relevant issues.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
