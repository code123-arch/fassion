// Cart page — renders TacetCart.getCart() and wires up qty/remove controls.
// Relies on the js/cart.js contract from ticket 00 (TacetCart.getCart /
// updateQty / removeItem / getSubtotal). Written against that signature so
// it works as soon as js/cart.js is merged.
(function () {
  const emptyEl = document.getElementById('cart-empty');
  const contentEl = document.getElementById('cart-content');
  const listEl = document.getElementById('cart-list');
  const subtotalEl = document.getElementById('cart-subtotal');
  const totalEl = document.getElementById('cart-total');

  function formatPrice(amount) {
    return `¥${amount.toLocaleString('ja-JP')}`;
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    }[c]));
  }

  // item.image is either a real asset path (assets/images/...) or, as a
  // fallback, a `.ph-N` placeholder class name.
  function renderMedia(value, alt) {
    const v = value || 'ph-1';
    if (v.indexOf('/') !== -1) {
      return `<img class="cart-item-image ph" src="${escapeHtml(v)}" alt="${escapeHtml(alt || '')}" loading="lazy" style="display:block;object-fit:cover;">`;
    }
    return `<div class="cart-item-image ph ${escapeHtml(v)}"></div>`;
  }

  function itemTemplate(item) {
    return `
      <div class="cart-item" data-id="${escapeHtml(item.id)}" data-color="${escapeHtml(item.color)}" data-size="${escapeHtml(item.size)}">
        ${renderMedia(item.image, item.name)}
        <div class="cart-item-info">
          <p class="cart-item-name">${escapeHtml(item.name)}</p>
          <p class="cart-item-variant">${escapeHtml(item.color)} / ${escapeHtml(item.size)}</p>
          <p class="cart-item-price">${formatPrice(item.price)}</p>
        </div>
        <div class="cart-item-qty">
          <button type="button" class="qty-btn" data-action="decrease" aria-label="数量を減らす">−</button>
          <input type="number" class="qty-input" value="${item.qty}" min="1" max="99" inputmode="numeric" aria-label="数量">
          <button type="button" class="qty-btn" data-action="increase" aria-label="数量を増やす">+</button>
        </div>
        <div class="cart-item-subtotal">${formatPrice(item.price * item.qty)}</div>
        <button type="button" class="cart-item-remove" aria-label="カートから削除">削除</button>
      </div>
    `;
  }

  function render() {
    if (!window.TacetCart) return;

    const items = TacetCart.getCart();

    if (!items.length) {
      emptyEl.hidden = false;
      contentEl.hidden = true;
      return;
    }

    emptyEl.hidden = true;
    contentEl.hidden = false;
    listEl.innerHTML = items.map(itemTemplate).join('');

    const subtotal = TacetCart.getSubtotal();
    subtotalEl.textContent = formatPrice(subtotal);
    totalEl.textContent = formatPrice(subtotal);
  }

  function readItemKey(el) {
    return { id: el.dataset.id, color: el.dataset.color, size: el.dataset.size };
  }

  function applyQty(el, qty) {
    const { id, color, size } = readItemKey(el);
    const safeQty = Math.max(1, Math.min(99, qty || 1));
    TacetCart.updateQty(id, color, size, safeQty);
    render();
  }

  function handleListClick(event) {
    const itemEl = event.target.closest('.cart-item');
    if (!itemEl) return;

    if (event.target.closest('.cart-item-remove')) {
      const { id, color, size } = readItemKey(itemEl);
      TacetCart.removeItem(id, color, size);
      render();
      return;
    }

    const stepButton = event.target.closest('.qty-btn');
    if (!stepButton) return;

    const input = itemEl.querySelector('.qty-input');
    const current = parseInt(input.value, 10) || 1;
    const next = stepButton.dataset.action === 'increase' ? current + 1 : current - 1;
    applyQty(itemEl, next);
  }

  function handleListChange(event) {
    if (!event.target.matches('.qty-input')) return;
    const itemEl = event.target.closest('.cart-item');
    applyQty(itemEl, parseInt(event.target.value, 10));
  }

  document.addEventListener('DOMContentLoaded', () => {
    render();
    listEl.addEventListener('click', handleListClick);
    listEl.addEventListener('change', handleListChange);
  });
})();
