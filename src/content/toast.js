/**
 * @what Toast notification management system
 * @why Handles toast UI creation, stacking, dismissal, and download
 * @exports showToast
 */

// Toast state
let toasts = [];  // Array of { id, element, timeout }

/**
 * Show a toast notification for picked element
 * @param {string} markdown - Formatted markdown content
 * @param {Object} elementData - Element data with tagName
 */
export function showToast(markdown, elementData) {
  const toastId = Date.now();

  // Create toast container
  const toastElement = document.createElement('div');
  toastElement.className = 'fogo-toast';
  toastElement.dataset.toastId = toastId;
  toastElement.style.setProperty('--toast-index', toasts.length);
  toastElement.innerHTML = `
    <button class="fogo-close-btn" aria-label="Close">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    </button>
    <div class="fogo-toast-content">
      <div class="fogo-toast-header">
        <span>Copied &lt;${elementData.tagName}></span>
      </div>
      <div class="fogo-toast-actions">
        <button class="fogo-download-btn">
          Save as markdown
        </button>
      </div>
    </div>
  `;

  // Styles are loaded via app.css in manifest.json

  // Auto-copy to clipboard
  navigator.clipboard.writeText(markdown).catch(() => {
    console.warn('[Fogó] Failed to auto-copy');
  });

  // Helper function to remove toast
  function removeToast(id) {
    const index = toasts.findIndex(t => t.id === id);
    if (index === -1) return;

    const toast = toasts[index];
    clearTimeout(toast.timeout);
    toast.element.classList.add('fogo-fade-out');

    setTimeout(() => {
      toast.element.remove();
      toasts.splice(index, 1);
      updateToastPositions();
    }, 200);
  }

  // Helper function to update all toast positions
  function updateToastPositions() {
    toasts.forEach((toast, index) => {
      toast.element.style.setProperty('--toast-index', index);
    });
  }

  // Close button handler
  const closeBtn = toastElement.querySelector('.fogo-close-btn');
  closeBtn.addEventListener('click', () => {
    removeToast(toastId);
  });

  // Download button handler
  const downloadBtn = toastElement.querySelector('.fogo-download-btn');
  downloadBtn.addEventListener('click', () => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    const filename = `element-${timestamp}.md`;
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);

    // Show feedback and dismiss
    downloadBtn.textContent = '✓ Downloaded!';
    setTimeout(() => {
      removeToast(toastId);
    }, 1000);
  });

  // Append to body
  document.body.appendChild(toastElement);

  // Auto-dismiss after 5 seconds
  const timeout = setTimeout(() => {
    removeToast(toastId);
  }, 5000);

  // Add to toasts array
  toasts.push({ id: toastId, element: toastElement, timeout });
  updateToastPositions();
}
