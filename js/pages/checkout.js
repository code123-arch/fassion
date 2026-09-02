// Checkout page: renders the cart summary, mocks the "place order" flow
// (no payment/API calls), then clears the cart on confirmation.
(function () {
  const formatPrice = (value) => `¥${value.toLocaleString('ja-JP')}`;

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
      return `<img class="ph" src="${escapeHtml(v)}" alt="${escapeHtml(alt || '')}" loading="lazy" style="display:block;object-fit:cover;">`;
    }
    return `<div class="ph ${escapeHtml(v)}"></div>`;
  }

  const emptyEl = document.querySelector('[data-checkout-empty]');
  const formSectionEl = document.querySelector('[data-checkout-form]');
  const completeEl = document.querySelector('[data-checkout-complete]');
  const orderForm = document.querySelector('[data-order-form]');
  const itemsEl = document.querySelector('[data-order-items]');
  const subtotalEl = document.querySelector('[data-order-subtotal]');
  const totalEl = document.querySelector('[data-order-total]');
  const orderNumberEl = document.querySelector('[data-order-number]');

  function renderSummary() {
    const cart = TacetCart.getCart();

    if (cart.length === 0) {
      emptyEl.hidden = false;
      formSectionEl.hidden = true;
      return false;
    }

    emptyEl.hidden = true;
    formSectionEl.hidden = false;

    itemsEl.innerHTML = cart
      .map((item) => {
        return `
          <li class="order-item">
            ${renderMedia(item.image, item.name)}
            <div class="order-item-meta">
              <h3>${item.name}</h3>
              <p>${item.color} / ${item.size} × ${item.qty}</p>
            </div>
            <div class="order-item-price">${formatPrice(item.price * item.qty)}</div>
          </li>
        `;
      })
      .join('');

    const subtotal = TacetCart.getSubtotal();
    subtotalEl.textContent = formatPrice(subtotal);
    totalEl.textContent = formatPrice(subtotal);

    return true;
  }

  function generateOrderNumber() {
    const now = new Date();
    const datePart = now.toISOString().slice(0, 10).replace(/-/g, '');
    const randPart = Math.random().toString(36).slice(2, 8).toUpperCase();
    return `TACET-${datePart}-${randPart}`;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!orderForm.reportValidity()) return;

    orderNumberEl.textContent = `注文番号: ${generateOrderNumber()}`;

    formSectionEl.hidden = true;
    emptyEl.hidden = true;
    completeEl.hidden = false;

    TacetCart.clearCart();
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderSummary();
    if (orderForm) orderForm.addEventListener('submit', handleSubmit);
  });
})();
