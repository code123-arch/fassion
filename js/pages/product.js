// Product Detail page: renders a single product from js/products.js and
// wires up color/size/qty selection + add-to-cart via js/cart.js.
// Depends on the TacetProducts / TacetCart contract from ticket 00 —
// written against the signature so this works unmodified once that
// ticket lands.
(function () {
  const notFoundEl = document.getElementById('product-not-found');
  const detailEl = document.getElementById('product-detail');

  const params = new URLSearchParams(location.search);
  const id = params.get('id');

  const product =
    window.TacetProducts && typeof window.TacetProducts.getById === 'function'
      ? window.TacetProducts.getById(id)
      : undefined;

  if (!product) {
    notFoundEl.hidden = false;
    detailEl.hidden = true;
    return;
  }

  notFoundEl.hidden = true;
  detailEl.hidden = false;
  document.title = `${product.name} — TACET`;

  let selectedColor = null;
  let selectedSize = null;
  let feedbackTimer = null;

  renderGallery();
  renderInfo();
  renderOptions();
  bindQty();
  bindAddToCart();

  // Product.images entries are either a real asset path (assets/images/...)
  // or, as a fallback, a `.ph-N` placeholder class name.
  function renderMedia(value, alt) {
    const v = value || 'ph-1';
    if (v.indexOf('/') !== -1) {
      return `<img class="ph" src="${escapeHtml(v)}" alt="${escapeHtml(alt || '')}" loading="lazy" style="display:block;width:100%;object-fit:cover;">`;
    }
    return `<div class="ph ${escapeHtml(v)}"></div>`;
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (ch) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }[ch]));
  }

  function renderGallery() {
    const gallery = document.getElementById('product-gallery');
    const images = product.images && product.images.length ? product.images : ['ph-1'];
    gallery.innerHTML = images.map((src) => renderMedia(src, product.name)).join('');
  }

  function renderInfo() {
    document.getElementById('product-category').textContent = product.category;
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('product-price').textContent = formatPrice(product.price);
    document.getElementById('product-description').textContent = product.description;
  }

  function renderOptions() {
    const colorWrap = document.getElementById('color-options');
    const sizeWrap = document.getElementById('size-options');

    colorWrap.innerHTML = (product.colors || [])
      .map((color) => `<button type="button" class="option-btn" data-color="${color}">${color}</button>`)
      .join('');

    sizeWrap.innerHTML = (product.sizes || [])
      .map((size) => `<button type="button" class="option-btn" data-size="${size}">${size}</button>`)
      .join('');

    colorWrap.addEventListener('click', (event) => {
      const btn = event.target.closest('[data-color]');
      if (!btn) return;
      selectedColor = btn.dataset.color;
      Array.from(colorWrap.children).forEach((b) => b.classList.toggle('is-selected', b === btn));
      updateAddToCartState();
    });

    sizeWrap.addEventListener('click', (event) => {
      const btn = event.target.closest('[data-size]');
      if (!btn) return;
      selectedSize = btn.dataset.size;
      Array.from(sizeWrap.children).forEach((b) => b.classList.toggle('is-selected', b === btn));
      updateAddToCartState();
    });
  }

  function bindQty() {
    const input = document.getElementById('qty-input');

    document.getElementById('qty-decrement').addEventListener('click', () => {
      input.value = clampQty(parseInt(input.value, 10) - 1);
    });

    document.getElementById('qty-increment').addEventListener('click', () => {
      input.value = clampQty(parseInt(input.value, 10) + 1);
    });

    input.addEventListener('change', () => {
      input.value = clampQty(parseInt(input.value, 10));
    });
  }

  function clampQty(value) {
    if (Number.isNaN(value)) return 1;
    return Math.min(99, Math.max(1, value));
  }

  function bindAddToCart() {
    const button = document.getElementById('add-to-cart');
    const feedback = document.getElementById('cart-feedback');

    button.addEventListener('click', () => {
      if (!selectedColor || !selectedSize) return;

      const qty = clampQty(parseInt(document.getElementById('qty-input').value, 10));

      if (window.TacetCart && typeof window.TacetCart.addItem === 'function') {
        window.TacetCart.addItem({
          id: product.id,
          name: product.name,
          price: product.price,
          color: selectedColor,
          size: selectedSize,
          qty,
          image: (product.images && product.images[0]) || 'ph-1',
        });
      }

      feedback.textContent = 'カートに追加しました。';
      feedback.hidden = false;
      window.clearTimeout(feedbackTimer);
      feedbackTimer = window.setTimeout(() => {
        feedback.hidden = true;
      }, 3000);
    });
  }

  function updateAddToCartState() {
    const button = document.getElementById('add-to-cart');
    const hint = document.getElementById('selection-hint');
    const ready = Boolean(selectedColor && selectedSize);
    button.disabled = !ready;
    hint.hidden = ready;
  }

  function formatPrice(price) {
    return `¥${Number(price).toLocaleString('ja-JP')}`;
  }
})();
