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
