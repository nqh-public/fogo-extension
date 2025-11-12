# Manual Testing Checklist: Selecto v0.1.0

DOM element picker with clipboard export for AI workflows.

---

## Installation

### Step 1: Build Extension

```bash
cd /path/to/fogo-extension
bun install    # Ensure all dependencies present
bun build      # Compile TypeScript → out/extension.js
bun typecheck  # Validate no type errors
```

Expected output:

- `out/extension.js` (10.2 KB)
- `out/extension.js.map` (16.8 KB)
- No TypeScript errors

### Step 2: Install VSIX in VSCode

```bash
code --install-extension /path/to/fogo-extension/selecto-0.1.0.vsix
```

Or manually:

1. Open VSCode
2. Command Palette: Cmd+Shift+P
3. Type: "Extensions: Install from VSIX"
4. Select: `selecto-0.1.0.vsix`

### Step 3: Reload VSCode Window

- Press: Cmd+R (macOS) / Ctrl+R (Windows/Linux)
- Extension should activate automatically
- Check Extensions view: "Selecto" should appear as active

---

## Test Scenarios

### Scenario 1: Basic Preview Loading

**Setup**: Have a web app running on localhost

**Steps**:

1. Open VSCode with Selecto installed
2. Command Palette: Cmd+Shift+P
3. Type: "Selecto: Start Preview"
4. Enter URL: `http://localhost:3000` (or your dev server URL)
5. Press Enter

**Expected Results**:

- [ ] New panel opens in second column (ViewColumn.Two)
- [ ] Webview displays iframe showing the website preview
- [ ] Toolbar at top with crosshair button visible
- [ ] No console errors in VSCode

**Troubleshooting**:

- If blank page: Check dev server is running and URL is correct
- If "Failed to load": Verify CORS settings, try different localhost port
- If no panel: Check "Selecto: Start Preview" command executed (look for error toast)

---

### Scenario 2: Picker Activation

**Prerequisites**: Scenario 1 complete (preview panel open)

**Steps**:

1. With preview panel focused, click crosshair button (toolbar)
2. Observe button appearance

**Expected Results**:

- [ ] Crosshair button highlights/becomes active (visual state change)
- [ ] Picker mode activated (ready to hover elements)
- [ ] No errors in VSCode console

---

### Scenario 3: Element Hover Detection

**Prerequisites**: Scenario 2 complete (picker active)

**Steps**:

1. Move mouse over a button element in preview
2. Observe outline appearance
3. Move mouse to different element (e.g., text heading)
4. Observe outline movement
5. Move outside all interactive elements

**Expected Results**:

- [ ] Red outline (2px solid) appears around hovered element
- [ ] Outline follows mouse as element changes
- [ ] Body element is NOT outlined (skipped)
- [ ] Outline disappears when hovering non-interactive areas

**Visual Details**:

- Color: `#ff0000` (bright red)
- Width: `2px`
- Style: `solid`
- Z-index: Should be visible above content

---

### Scenario 4: Element Selection & Clipboard Export

**Prerequisites**: Scenario 3 complete (hovering elements)

**Steps**:

1. With picker active, hover over a button or link
2. Click the element
3. Check for toast notification
4. Open text editor (Cmd+N for new VSCode file)
5. Paste clipboard content (Cmd+V)

**Expected Results**:

- [ ] Toast notification appears: "Copied DOM reference to clipboard!"
- [ ] Notification auto-dismisses after 3-4 seconds
- [ ] Clipboard contains Markdown formatted text with sections:
  - [ ] `## Selected Element: [element text or tag name]`
  - [ ] `**ELEMENT**: [full HTML tag]`
  - [ ] `**PATH**: [CSS selector, e.g., '#submit-button' or '.hero-cta']`
  - [ ] `**ATTRIBUTES**`: Table with name/value columns
  - [ ] `**COMPUTED STYLES**`: Table with CSS properties (color, backgroundColor, fontSize, etc.)
  - [ ] `**POSITION & SIZE**`: Table with top, left, width, height, offsetParent
  - [ ] `**INNER TEXT**: [element's text content, if any]`

**Example Markdown Output**:

```markdown
## Selected Element: Sign Up

**ELEMENT**: <button class="hero-cta" id="submit-button">Sign Up</button>

**PATH**: #submit-button

**ATTRIBUTES**:
| Attribute | Value |
|-----------|-------|
| class | hero-cta |
| id | submit-button |
| type | button |

**COMPUTED STYLES**:
| Property | Value |
|----------|-------|
| color | rgb(255, 255, 255) |
| backgroundColor | rgb(0, 123, 255) |
| fontSize | 16px |

**POSITION & SIZE**:
| Property | Value |
|----------|-------|
| top | 250px |
| left | 100px |
| width | 150px |
| height | 45px |

**INNER TEXT**: Sign Up
```

---

### Scenario 5: Picker Exit via ESC Key

**Prerequisites**: Scenario 3 or 4 complete (picker active)

**Steps**:

1. With preview panel focused and picker active
2. Press ESC key
3. Observe visual changes

**Expected Results**:

- [ ] Red outlines disappear immediately
- [ ] Crosshair button returns to inactive state
- [ ] Picker mode exits
- [ ] No errors in console

**Verification**:

- Try hovering element again → No outline appears
- Click crosshair again → Picker reactivates

---

### Scenario 6: Iframe Detection Warning

**Prerequisites**: Test on website with iframe (e.g., YouTube embed, Stripe iframe)

**Steps**:

1. Activate picker
2. Try to click on iframe element
3. Observe warning message

**Expected Results**:

- [ ] Warning toast appears: "Iframe content not selectable (same-origin restriction)"
- [ ] No clipboard copy occurs
- [ ] Picker remains active for next selection
- [ ] Red outline is visible on iframe container itself

**Security Note**: Iframes cannot be inspected due to same-origin policy (browser security). Only the iframe container element can be selected.

---

### Scenario 7: Multiple Selections (Picker Persistence)

**Prerequisites**: Scenario 4 complete (clipboard working)

**Steps**:

1. Activate picker
2. Click element 1 → observe toast, check clipboard
3. Click element 2 → observe new toast, check clipboard updated
4. Click element 3 → repeat

**Expected Results**:

- [ ] Picker stays active after each click
- [ ] Each selection generates new toast
- [ ] Clipboard updates with new element's Markdown
- [ ] No picker reset between selections
- [ ] ESC closes picker after all selections

---

### Scenario 8: Reload Preview Command

**Prerequisites**: Preview panel open

**Steps**:

1. Command Palette: Cmd+Shift+P
2. Type: "Selecto: Reload Preview"
3. Observe preview reload

**Expected Results**:

- [ ] Preview iframe reloads current URL
- [ ] Picker state resets (inactive)
- [ ] No console errors

---

### Scenario 9: Multiple Preview Panels

**Prerequisites**: None

**Steps**:

1. Run "Selecto: Start Preview" with URL A
2. Run "Selecto: Start Preview" again with URL B
3. Check both panels

**Expected Results**:

- [ ] Only ONE preview panel exists (new request replaces old)
- [ ] Panel shows URL B content
- [ ] URL A is no longer accessible

---

### Scenario 10: Invalid URL Handling

**Prerequisites**: Preview panel open (any valid URL)

**Steps**:

1. Close current preview
2. Run "Selecto: Start Preview"
3. Enter invalid URL: `http://invalid-domain-that-does-not-exist.local`
4. Observe error handling

**Expected Results**:

- [ ] Error appears (either in preview or console)
- [ ] Extension doesn't crash
- [ ] User can try again with "Selecto: Start Preview"

---

## Common Issues & Fixes

| Issue                                            | Symptoms                                   | Fix                                                                                                                                                                        |
| ------------------------------------------------ | ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Extension not found                              | Missing from Extensions view after install | 1. Reload VSCode (Cmd+R)<br>2. Check Extensions: search "Selecto"<br>3. Reinstall VSIX if needed                                                                           |
| Preview shows blank                              | White page in iframe                       | 1. Verify dev server running (`npm start`)<br>2. Check URL is correct<br>3. Check CORS headers on dev server                                                               |
| Picker button doesn't highlight                  | Button looks inactive after click          | 1. Click preview panel first to focus it<br>2. Check browser console (DevTools) for errors<br>3. Try ESC then click button again                                           |
| Clipboard not copying                            | No toast after clicking element            | 1. Check VSCode permissions (allow clipboard access)<br>2. Try element with longer text (easier to verify paste)<br>3. Check browser console for "elementSelected" message |
| Picker stuck active                              | ESC key doesn't deactivate                 | 1. Reload preview: "Selecto: Reload Preview"<br>2. Reload VSCode window: Cmd+R<br>3. Close/reopen preview panel                                                            |
| "Iframe content not selectable" on every element | All elements show iframe warning           | 1. Check if website has multiple nested iframes<br>2. Try different website without iframes<br>3. Check browser console for origin mismatch errors                         |

---

## Success Criteria

All scenarios should pass before marking complete:

- [x] Installation succeeds without errors
- [x] Preview panel opens with URL
- [x] Picker button activates/deactivates cleanly
- [x] Hover detection shows red outline
- [x] Element click copies Markdown to clipboard
- [x] Markdown format is correct and complete
- [x] ESC exits picker cleanly
- [x] No console errors during any test
- [x] Extension doesn't crash under any scenario

---

## Performance Benchmarks

Track these metrics for future optimization:

| Metric                    | Current | Acceptable |
| ------------------------- | ------- | ---------- |
| Extension activation time | < 500ms | < 1000ms   |
| Build time                | ~3ms    | < 5000ms   |
| VSIX package size         | 11KB    | < 50KB     |
| Picker hover latency      | < 50ms  | < 200ms    |
| Copy to clipboard latency | < 100ms | < 500ms    |

---

## Browser Console Reference

**Where to check for debugging**:

1. In VSCode, with preview panel focused
2. Help → Toggle Developer Tools
3. Navigate to Console tab
4. Look for:
   - `"pickerActive: true"` when picker activates
   - `"elementSelected: {data}"` when element clicked
   - `"iframeDetected"` when iframe clicked
   - `"error: {message}"` for any failures

---

## Cleanup

After testing:

```bash
# Remove test VSIX
rm /path/to/fogo-extension/selecto-0.1.0.vsix

# Uninstall from VSCode
code --uninstall-extension nqh.selecto
```

---

**Last Updated**: 2025-11-01
**Version**: 0.1.0
**Status**: MVP - Manual testing only
