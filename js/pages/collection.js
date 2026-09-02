// Collection page — renders the product grid from TACET_PRODUCTS and wires
// up client-side category filtering. Depends on js/products.js (ticket 00);
// safe to load before that file exists since nothing here runs until
// DOMContentLoaded, by which point the real data/API should be in place.
(function () {
  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (ch) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }[ch]));
  }

  function formatPrice(price) {
    return `¥${Number(price).toLocaleString('ja-JP')}`;
  }

  // Product.images entries are either a real asset path (assets/images/...)
  // or, as a fallback, a `.ph-N` placeholder class name.
  function renderMedia(value, alt) {
    const v = value || 'ph-1';
    if (v.indexOf('/') !== -1) {
      return `<img class="ph" src="${escapeHtml(v)}" alt="${escapeHtml(alt || '')}" loading="lazy" style="display:block;width:100%;object-fit:cover;">`;
    }
    return `<div class="ph ${escapeHtml(v)}"></div>`;
  }

  function getProductsByCategory(category) {
    if (window.TacetProducts && typeof window.TacetProducts.getByCategory === 'function') {
      return window.TacetProducts.getByCategory(category);
    }
    const all = window.TACET_PRODUCTS || [];
    if (!category || category === 'All') return all;
    return all.filter((p) => p.category === category);
  }

  function renderProductCard(product) {
    const image = (product.images && product.images[0]) || 'ph-1';
    return `
      <a class="product-card" href="product.html?id=${encodeURIComponent(product.id)}">
        ${renderMedia(image, product.name)}
        <p class="cat">${escapeHtml(product.category)}</p>
        <h3>${escapeHtml(product.name)}</h3>
        <p class="price">${formatPrice(product.price)}</p>
      </a>
    `;
  }

  function renderGrid(category) {
    const grid = document.querySelector('[data-product-grid]');
    if (!grid) return;

    const products = getProductsByCategory(category);

    if (!products.length) {
      grid.innerHTML = '<p class="empty-state">該当する商品がありません。</p>';
      return;
    }

    grid.innerHTML = products.map(renderProductCard).join('');
  }

  function initFilterBar() {
    const filterBar = document.querySelector('[data-filter-bar]');
    if (!filterBar) return;

    filterBar.addEventListener('click', (event) => {
      const button = event.target.closest('[data-filter]');
      if (!button) return;

      filterBar.querySelectorAll('.filter-btn').forEach((btn) => {
        btn.classList.toggle('is-active', btn === button);
      });

      renderGrid(button.dataset.filter);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initFilterBar();
    renderGrid('All');
  });
})();
