// Cart CRUD backed by localStorage. Shared by Product Detail / Cart / Checkout.
// Storage key and data shape must stay in sync with js/main.js, which also
// reads 'tacet_cart' to render the header cart count.
(function () {
  const CART_KEY = 'tacet_cart';

  function readCart() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch {
      return [];
    }
  }

  function writeCart(items) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    refreshHeaderCount();
  }

  function refreshHeaderCount() {
    const el = document.querySelector('[data-cart-count]');
    if (!el) return;
    const count = readCart().reduce((sum, item) => sum + item.qty, 0);
    el.textContent = `(${count})`;
  }

  window.TacetCart = {
    getCart: readCart,

    // item: { id, name, price, color, size, qty, image }
    addItem(item) {
      const items = readCart();
      const existing = items.find(
        (i) => i.id === item.id && i.color === item.color && i.size === item.size
      );
      if (existing) {
        existing.qty += item.qty;
      } else {
        items.push(item);
      }
      writeCart(items);
    },

    removeItem(id, color, size) {
      const items = readCart().filter(
        (i) => !(i.id === id && i.color === color && i.size === size)
      );
      writeCart(items);
    },

    updateQty(id, color, size, qty) {
      const items = readCart();
      const target = items.find((i) => i.id === id && i.color === color && i.size === size);
      if (target) target.qty = qty;
      writeCart(items.filter((i) => i.qty > 0));
    },

    getSubtotal() {
      return readCart().reduce((sum, i) => sum + i.price * i.qty, 0);
    },

    clearCart() {
      writeCart([]);
    },
  };

  document.addEventListener('DOMContentLoaded', refreshHeaderCount);
})();
