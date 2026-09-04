// Shared across all pages: keeps the header cart count in sync with
// whatever is stored in localStorage, regardless of which page wrote it.
(function () {
  const CART_KEY = 'tacet_cart';

  function readCart() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch {
      return [];
    }
  }

  function updateCartCount() {
    const el = document.querySelector('[data-cart-count]');
    if (!el) return;
    const count = readCart().reduce((sum, item) => sum + item.qty, 0);
    el.textContent = `(${count})`;
  }

  document.addEventListener('DOMContentLoaded', updateCartCount);
  window.addEventListener('storage', updateCartCount);
})();

// Mobile/tablet nav toggle: shows the header nav links as a dropdown
// below 1024px, where .main-nav is hidden by default (see style.css).
(function () {
  function initNavToggle() {
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.main-nav');
    if (!toggle || !nav) return;

    toggle.setAttribute('aria-expanded', 'false');

    function setOpen(open) {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
    }

    toggle.addEventListener('click', () => {
      setOpen(!nav.classList.contains('is-open'));
    });

    nav.addEventListener('click', (event) => {
      if (event.target.closest('a')) setOpen(false);
    });

    document.addEventListener('click', (event) => {
      if (!nav.classList.contains('is-open')) return;
      if (nav.contains(event.target) || toggle.contains(event.target)) return;
      setOpen(false);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setOpen(false);
    });
  }

  document.addEventListener('DOMContentLoaded', initNavToggle);
})();
