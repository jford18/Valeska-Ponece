(function () {
  const { BRAND_NAME, TAGLINE, CURRENCY, PHONE_WHATSAPP, EMAIL } = BRAND_CONFIG;

  const selectors = {
    menu: document.getElementById('menu'),
    toggle: document.querySelector('.header__toggle'),
    cartButton: document.querySelector('[data-open-cart]'),
    cartCount: document.querySelector('.header__cart-count'),
    productGrid: document.getElementById('product-grid'),
    search: document.getElementById('search'),
    filterCategory: document.getElementById('filter-category'),
    filterMaterial: document.getElementById('filter-material'),
    filterPrice: document.getElementById('filter-price'),
    sort: document.getElementById('sort'),
    modal: document.getElementById('product-modal'),
    modalImage: document.getElementById('modal-image'),
    modalTitle: document.getElementById('product-modal-title'),
    modalDescription: document.getElementById('modal-description'),
    modalMaterial: document.getElementById('modal-material'),
    modalSize: document.getElementById('modal-size'),
    modalWeight: document.getElementById('modal-weight'),
    modalStock: document.getElementById('modal-stock'),
    modalPrice: document.getElementById('modal-price'),
    modalQuantity: document.getElementById('modal-quantity'),
    modalAdd: document.getElementById('modal-add'),
    cartPanel: document.getElementById('cart-panel'),
    cartItems: document.getElementById('cart-items'),
    cartSubtotal: document.getElementById('cart-subtotal'),
    cartDiscount: document.getElementById('cart-discount'),
    cartTotal: document.getElementById('cart-total'),
    goCheckout: document.getElementById('go-checkout'),
    checkoutForm: document.getElementById('checkout-form'),
    summaryBody: document.getElementById('summary-body'),
    summarySubtotal: document.getElementById('summary-subtotal'),
    summaryDiscount: document.getElementById('summary-discount'),
    summaryTotal: document.getElementById('summary-total'),
    checkoutSuccess: document.querySelector('.checkout__success'),
    orderNumber: document.getElementById('order-number'),
    printButton: document.getElementById('print-order'),
    formFeedback: document.querySelector('.form-feedback'),
    whatsapp: document.getElementById('whatsapp'),
    year: document.getElementById('year')
  };

  const storageKey = 'jfjoyas-cart';
  const currencyFormatter = new Intl.NumberFormat('es-EC', {
    style: 'currency',
    currency: CURRENCY
  });

  // Normaliza cantidades evitando valores NaN o fuera de rango.
  function sanitizeQuantity(rawValue, maxStock = 99, enforceDefault = false) {
    if (rawValue === '' || rawValue === null || rawValue === undefined) {
      return enforceDefault ? 1 : null;
    }
    const parsed = parseInt(String(rawValue), 10);
    if (!Number.isFinite(parsed)) {
      return enforceDefault ? 1 : null;
    }
    const limitedStock = Math.min(maxStock ?? 99, 99);
    return Math.min(Math.max(parsed, 1), limitedStock);
  }

  // Formateo consistente de moneda en USD.
  function formatCurrency(value) {
    return currencyFormatter.format(Number(value) || 0);
  }

  function loadCart() {
    try {
      const stored = localStorage.getItem(storageKey);
      if (!stored) return [];
      const parsed = JSON.parse(stored);
      if (!Array.isArray(parsed)) return [];
      return parsed.map((item) => ({
        ...item,
        cantidad: sanitizeQuantity(item.cantidad, item.stock, true)
      }));
    } catch (error) {
      console.error('No se pudo cargar el carrito', error);
      return [];
    }
  }

  function saveCart() {
    localStorage.setItem(storageKey, JSON.stringify(state.cart));
  }

  function getFinalPrice(product) {
    return product.nuevo ? product.precio * 0.9 : product.precio;
  }

  const state = {
    products: PRODUCTS.slice(),
    filteredProducts: PRODUCTS.slice(),
    search: '',
    filters: {
      category: 'all',
      material: 'all',
      price: 'all'
    },
    sort: 'default',
    cart: loadCart(),
    modalProduct: null,
    modalImageIndex: 0,
    lastFocusedElement: null
  };

  function initBranding() {
    document.title = `${BRAND_NAME} | ${TAGLINE}`;
    document.querySelector('meta[name="description"]').setAttribute('content', `${BRAND_NAME}, catálogo de joyería fina y moderna.`);
    document.querySelector('meta[property="og:title"]').setAttribute('content', BRAND_NAME);
    document.getElementById('hero-title').textContent = TAGLINE;
    const phoneDigits = PHONE_WHATSAPP.replace(/[^\d]/g, '');
    selectors.whatsapp.href = `https://wa.me/${phoneDigits}?text=Hola%20${encodeURIComponent(BRAND_NAME)},%20quiero%20más%20información`;
    document.querySelectorAll('[data-phone]').forEach((anchor) => {
      anchor.href = `tel:${phoneDigits}`;
      anchor.textContent = PHONE_WHATSAPP;
    });
    document.querySelectorAll('[data-email]').forEach((anchor) => {
      anchor.href = `mailto:${EMAIL}`;
      anchor.textContent = EMAIL;
    });
    selectors.year.textContent = new Date().getFullYear();
  }

  function populateFilters() {
    const categories = Array.from(new Set(PRODUCTS.map((p) => p.categoria)));
    const materials = Array.from(new Set(PRODUCTS.map((p) => p.material)));

    categories.forEach((cat) => {
      const option = document.createElement('option');
      option.value = cat;
      option.textContent = cat;
      selectors.filterCategory.appendChild(option);
    });

    materials.forEach((mat) => {
      const option = document.createElement('option');
      option.value = mat;
      option.textContent = mat;
      selectors.filterMaterial.appendChild(option);
    });
  }

  function applyFilters() {
    state.filteredProducts = state.products.filter((product) => {
      const matchesSearch = product.nombre.toLowerCase().includes(state.search) || product.descripcion.toLowerCase().includes(state.search);
      if (!matchesSearch) return false;
      const matchesCategory = state.filters.category === 'all' || product.categoria === state.filters.category;
      const matchesMaterial = state.filters.material === 'all' || product.material === state.filters.material;
      const matchesPrice = filterPrice(product.precio);
      return matchesCategory && matchesMaterial && matchesPrice;
    });
    applySort();
    renderProductGrid();
  }

  function filterPrice(price) {
    switch (state.filters.price) {
      case 'under150':
        return price < 150;
      case '150-300':
        return price >= 150 && price <= 300;
      case '300-600':
        return price > 300 && price <= 600;
      case 'above600':
        return price > 600;
      default:
        return true;
    }
  }

  function applySort() {
    const sort = state.sort;
    state.filteredProducts.sort((a, b) => {
      if (sort === 'price-asc') {
        return getFinalPrice(a) - getFinalPrice(b);
      }
      if (sort === 'price-desc') {
        return getFinalPrice(b) - getFinalPrice(a);
      }
      if (sort === 'newest') {
        return Number(b.nuevo) - Number(a.nuevo);
      }
      return a.nombre.localeCompare(b.nombre);
    });
  }

  function createStars(rating) {
    const stars = [];
    for (let i = 1; i <= 5; i += 1) {
      stars.push(`<span aria-hidden="true">${i <= Math.round(rating) ? '★' : '☆'}</span>`);
    }
    return `<div class="card__rating" aria-label="Calificación ${rating.toFixed(1)} de 5">${stars.join('')}</div>`;
  }

  function renderProductGrid() {
    selectors.productGrid.innerHTML = '';
    if (!state.filteredProducts.length) {
      const empty = document.createElement('p');
      empty.textContent = 'No encontramos resultados para tu búsqueda. Ajusta los filtros para ver más piezas.';
      empty.className = 'catalogo__empty';
      selectors.productGrid.appendChild(empty);
      return;
    }

    state.filteredProducts.forEach((product) => {
      const card = document.createElement('article');
      card.className = 'card';
      const finalPrice = getFinalPrice(product);
      const hasDiscount = finalPrice !== product.precio;
      card.innerHTML = `
        <div class="card__img">
          ${product.nuevo ? '<span class="card__badge">Nuevo</span>' : ''}
          <img src="${product.imagenes[0]}" alt="${product.nombre}" loading="lazy" width="320" height="320">
        </div>
        <h3 class="card__title">${product.nombre}</h3>
        <div class="card__price">${hasDiscount ? `<del>${formatCurrency(product.precio)}</del>` : ''}<span>${formatCurrency(finalPrice)}</span></div>
        ${createStars(product.rating)}
        <div class="card__actions">
          <button class="btn btn--outline" data-action="detail" data-id="${product.id}">Ver detalle</button>
          <button class="btn btn--primary" data-action="add" data-id="${product.id}">Agregar</button>
        </div>
      `;
      selectors.productGrid.appendChild(card);
    });
  }

  function openModal(product, trigger) {
    state.modalProduct = product;
    state.modalImageIndex = 0;
    state.lastFocusedElement = trigger || document.activeElement;
    updateModal();
    selectors.modal.hidden = false;
    document.body.classList.add('is-locked');
    selectors.modal.setAttribute('data-open', 'true');
    trapFocus(selectors.modal.querySelector('.modal__content'));
    selectors.modal.querySelector('.modal__close').focus();
  }

  function closeModal() {
    if (selectors.modal.hidden) return;
    selectors.modal.hidden = true;
    selectors.modal.removeAttribute('data-open');
    document.body.classList.remove('is-locked');
    releaseFocus();
    if (state.lastFocusedElement) {
      state.lastFocusedElement.focus();
    }
  }

  function updateModal() {
    const product = state.modalProduct;
    if (!product) return;
    selectors.modalTitle.textContent = product.nombre;
    selectors.modalDescription.textContent = product.descripcion;
    selectors.modalMaterial.textContent = product.material;
    selectors.modalSize.textContent = product.talla;
    selectors.modalWeight.textContent = product.peso;
    selectors.modalStock.textContent = `${product.stock} disponibles`;
    selectors.modalImage.src = product.imagenes[state.modalImageIndex];
    selectors.modalImage.alt = `${product.nombre} vista ${state.modalImageIndex + 1}`;
    selectors.modalQuantity.value = 1;
    const finalPrice = getFinalPrice(product);
    selectors.modalPrice.innerHTML = `${finalPrice !== product.precio ? `<del>${formatCurrency(product.precio)}</del>` : ''}<span>${formatCurrency(finalPrice)}</span>`;
  }

  function addToCart(product, quantity) {
    const normalizedQty = sanitizeQuantity(quantity, product.stock, true);
    const finalPrice = getFinalPrice(product);
    const existing = state.cart.find((item) => item.id === product.id);
    if (existing) {
      existing.cantidad = Math.min(existing.cantidad + normalizedQty, Math.min(product.stock, 99));
    } else {
      state.cart.push({
        id: product.id,
        nombre: product.nombre,
        precioBase: product.precio,
        precioFinal: finalPrice,
        cantidad: normalizedQty,
        imagen: product.imagenes[0],
        nuevo: product.nuevo,
        stock: product.stock
      });
    }
    saveCart();
    renderCart();
  }

  function removeFromCart(id) {
    state.cart = state.cart.filter((item) => item.id !== id);
    saveCart();
    renderCart();
  }

  function updateCartQuantity(id, value) {
    const item = state.cart.find((i) => i.id === id);
    if (!item) return;
    const sanitized = sanitizeQuantity(value, item.stock);
    if (sanitized === null) {
      return;
    }
    item.cantidad = sanitized;
    saveCart();
    renderCart();
  }

  function forceCartQuantity(id, value) {
    const item = state.cart.find((i) => i.id === id);
    if (!item) return;
    const sanitized = sanitizeQuantity(value, item.stock, true);
    item.cantidad = sanitized;
    saveCart();
    renderCart();
  }

  function calculateTotals() {
    return state.cart.reduce(
      (acc, item) => {
        const lineSubtotal = item.precioFinal * item.cantidad;
        const lineDiscount = (item.precioBase - item.precioFinal) * item.cantidad;
        acc.subtotal += item.precioBase * item.cantidad;
        acc.discount += lineDiscount;
        acc.total += lineSubtotal;
        return acc;
      },
      { subtotal: 0, discount: 0, total: 0 }
    );
  }

  function renderCart() {
    selectors.cartItems.innerHTML = '';
    if (!state.cart.length) {
      const empty = document.createElement('p');
      empty.textContent = 'Tu carrito está vacío. Agrega productos para continuar.';
      empty.className = 'cart__empty';
      selectors.cartItems.appendChild(empty);
    } else {
      state.cart.forEach((item) => {
        const row = document.createElement('article');
        row.className = 'cart-item';
        row.innerHTML = `
          <div class="cart-item__thumb"><img src="${item.imagen}" alt="${item.nombre}" loading="lazy" width="72" height="72"></div>
          <div class="cart-item__info">
            <div class="cart-item__title">${item.nombre}</div>
            <div class="cart-item__price">${formatCurrency(item.precioFinal)} ${item.nuevo ? '<span class="badge">-10%</span>' : ''}</div>
            <div class="cart-item__controls">
              <button type="button" data-cart-decrease data-id="${item.id}">−</button>
              <input type="number" inputmode="numeric" min="1" max="${Math.min(item.stock, 99)}" value="${item.cantidad}" data-cart-qty data-id="${item.id}">
              <button type="button" data-cart-increase data-id="${item.id}">+</button>
              <button type="button" data-cart-remove data-id="${item.id}" aria-label="Eliminar ${item.nombre}">✕</button>
            </div>
          </div>
        `;
        selectors.cartItems.appendChild(row);
      });
    }

    const totals = calculateTotals();
    selectors.cartSubtotal.textContent = formatCurrency(totals.subtotal);
    selectors.cartDiscount.textContent = totals.discount ? `− ${formatCurrency(totals.discount)}` : formatCurrency(0);
    selectors.cartTotal.textContent = formatCurrency(totals.total);
    selectors.cartCount.textContent = state.cart.reduce((sum, item) => sum + item.cantidad, 0);
    updateSummary(totals);
  }

  function updateSummary(totals) {
    selectors.summaryBody.innerHTML = '';
    if (!state.cart.length) {
      const empty = document.createElement('tr');
      empty.innerHTML = '<td colspan="3">Tu carrito está vacío.</td>';
      selectors.summaryBody.appendChild(empty);
    } else {
      state.cart.forEach((item) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${item.nombre}</td>
          <td>${item.cantidad}</td>
          <td>${formatCurrency(item.precioFinal * item.cantidad)}</td>
        `;
        selectors.summaryBody.appendChild(tr);
      });
    }
    selectors.summarySubtotal.textContent = formatCurrency(totals.subtotal);
    selectors.summaryDiscount.textContent = totals.discount ? `− ${formatCurrency(totals.discount)}` : formatCurrency(0);
    selectors.summaryTotal.textContent = formatCurrency(totals.total);
  }

  function openCart(trigger) {
    state.lastFocusedElement = trigger || document.activeElement;
    selectors.cartPanel.hidden = false;
    document.body.classList.add('is-locked');
    trapFocus(selectors.cartPanel.querySelector('.cart__content'));
    selectors.cartPanel.querySelector('.cart__close').focus();
  }

  function closeCart() {
    if (selectors.cartPanel.hidden) return;
    selectors.cartPanel.hidden = true;
    document.body.classList.remove('is-locked');
    releaseFocus();
    if (state.lastFocusedElement) {
      state.lastFocusedElement.focus();
    }
  }

  function trapFocus(container) {
    const focusable = Array.from(
      container.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ).filter((el) => !el.hasAttribute('disabled'));
    if (!focusable.length) return;

    let first = focusable[0];
    let last = focusable[focusable.length - 1];

    function handleKeydown(event) {
      if (event.key === 'Tab') {
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
      if (event.key === 'Escape') {
        if (!selectors.modal.hidden) {
          closeModal();
        }
        if (!selectors.cartPanel.hidden) {
          closeCart();
        }
      }
    }

    container.addEventListener('keydown', handleKeydown);
    container.setAttribute('data-trap', 'true');
    container.dataset.firstFocus = first;
    container.dataset.lastFocus = last;
    container.__handleKeydown = handleKeydown;
  }

  function releaseFocus() {
    document.querySelectorAll('[data-trap="true"]').forEach((container) => {
      container.removeEventListener('keydown', container.__handleKeydown);
      delete container.__handleKeydown;
      container.removeAttribute('data-trap');
      delete container.dataset.firstFocus;
      delete container.dataset.lastFocus;
    });
  }

  function handleProductGridClick(event) {
    const target = event.target.closest('button[data-action]');
    if (!target) return;
    const product = state.products.find((p) => p.id === target.dataset.id);
    if (!product) return;
    if (target.dataset.action === 'detail') {
      openModal(product, target);
    } else if (target.dataset.action === 'add') {
      addToCart(product, 1);
      openCart(target);
    }
  }

  function handleModalNavigation(event) {
    if (!state.modalProduct) return;
    if (event.target.matches('[data-gallery-next]')) {
      state.modalImageIndex = (state.modalImageIndex + 1) % state.modalProduct.imagenes.length;
      updateModal();
    }
    if (event.target.matches('[data-gallery-prev]')) {
      state.modalImageIndex = (state.modalImageIndex - 1 + state.modalProduct.imagenes.length) % state.modalProduct.imagenes.length;
      updateModal();
    }
    if (event.target.matches('[data-close-modal]')) {
      closeModal();
    }
  }

  function handleModalQuantity(event) {
    if (!state.modalProduct) return;
    if (event.target.matches('[data-qty-increase]')) {
      const next = sanitizeQuantity(Number(selectors.modalQuantity.value) + 1, state.modalProduct.stock, true);
      selectors.modalQuantity.value = next;
    }
    if (event.target.matches('[data-qty-decrease]')) {
      const next = sanitizeQuantity(Number(selectors.modalQuantity.value) - 1, state.modalProduct.stock, true);
      selectors.modalQuantity.value = next;
    }
  }

  function handleModalAdd() {
    if (!state.modalProduct) return;
    addToCart(state.modalProduct, selectors.modalQuantity.value);
    closeModal();
    openCart(selectors.cartButton);
  }

  function handleCartInteraction(event) {
    const decrease = event.target.closest('[data-cart-decrease]');
    const increase = event.target.closest('[data-cart-increase]');
    const remove = event.target.closest('[data-cart-remove]');
    const input = event.target.closest('[data-cart-qty]');

    if (decrease) {
      const id = decrease.dataset.id;
      const item = state.cart.find((i) => i.id === id);
      if (!item) return;
      forceCartQuantity(id, item.cantidad - 1);
    }
    if (increase) {
      const id = increase.dataset.id;
      const item = state.cart.find((i) => i.id === id);
      if (!item) return;
      forceCartQuantity(id, item.cantidad + 1);
    }
    if (remove) {
      removeFromCart(remove.dataset.id);
    }
    if (input) {
      updateCartQuantity(input.dataset.id, input.value);
    }
  }

  function handleCartQuantityBlur(event) {
    const input = event.target.closest('[data-cart-qty]');
    if (!input) return;
    forceCartQuantity(input.dataset.id, input.value);
  }

  function handleSearch(event) {
    state.search = event.target.value.trim().toLowerCase();
    applyFilters();
  }

  function handleFilterChange() {
    state.filters.category = selectors.filterCategory.value;
    state.filters.material = selectors.filterMaterial.value;
    state.filters.price = selectors.filterPrice.value;
    applyFilters();
  }

  function handleSortChange() {
    state.sort = selectors.sort.value;
    applySort();
    renderProductGrid();
  }

  function handleCheckoutNavigate() {
    closeCart();
    document.getElementById('checkout').scrollIntoView({ behavior: 'smooth' });
    selectors.checkoutForm.querySelector('input, textarea, select').focus({ preventScroll: true });
  }

  function validateForm() {
    let valid = true;
    selectors.formFeedback.textContent = '';
    if (!state.cart.length) {
      selectors.formFeedback.textContent = 'Tu carrito está vacío. Agrega productos antes de confirmar el pedido.';
      return false;
    }
    Array.from(selectors.checkoutForm.elements).forEach((field) => {
      if (field.hasAttribute('required')) {
        if (!field.value.trim()) {
          field.classList.add('invalid');
          valid = false;
        } else {
          field.classList.remove('invalid');
        }
      }
      if (field.type === 'email' && field.value) {
        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);
        if (!emailValid) {
          field.classList.add('invalid');
          valid = false;
        }
      }
      if (field.type === 'tel' && field.value) {
        const phoneValid = /[\d\s+()-]{6,}/.test(field.value);
        if (!phoneValid) {
          field.classList.add('invalid');
          valid = false;
        }
      }
    });
    if (!valid) {
      selectors.formFeedback.textContent = 'Revisa los campos obligatorios y verifica tu email y teléfono.';
    }
    return valid;
  }

  function handleCheckoutSubmit(event) {
    event.preventDefault();
    if (!validateForm()) return;
    const orderId = `JF-${Math.floor(Math.random() * 900000 + 100000)}`;
    selectors.orderNumber.textContent = `Número de pedido: ${orderId}`;
    selectors.checkoutSuccess.hidden = false;
    selectors.formFeedback.textContent = '¡Gracias! Hemos registrado tu pedido. Te contactaremos en breve.';
    selectors.checkoutForm.reset();
    state.cart = [];
    saveCart();
    renderCart();
  }

  function handlePrint() {
    window.print();
  }

  function setupMenu() {
    if (!selectors.toggle) return;
    selectors.toggle.addEventListener('click', () => {
      const expanded = selectors.toggle.getAttribute('aria-expanded') === 'true';
      selectors.toggle.setAttribute('aria-expanded', String(!expanded));
      selectors.menu.setAttribute('aria-expanded', String(!expanded));
      selectors.menu.style.display = expanded ? 'none' : 'grid';
    });
  }

  function setupEventListeners() {
    selectors.productGrid.addEventListener('click', handleProductGridClick);
    selectors.modal.addEventListener('click', handleModalNavigation);
    selectors.modal.addEventListener('click', handleModalQuantity);
    selectors.modalAdd.addEventListener('click', handleModalAdd);
    selectors.cartButton.addEventListener('click', (event) => openCart(event.currentTarget));
    selectors.cartPanel.addEventListener('click', (event) => {
      if (event.target.matches('[data-close-cart]')) {
        closeCart();
      }
    });
    selectors.cartItems.addEventListener('click', handleCartInteraction);
    selectors.cartItems.addEventListener('input', handleCartInteraction);
    selectors.cartItems.addEventListener('blur', handleCartQuantityBlur, true);
    selectors.goCheckout.addEventListener('click', handleCheckoutNavigate);
    selectors.search.addEventListener('input', handleSearch);
    selectors.filterCategory.addEventListener('change', handleFilterChange);
    selectors.filterMaterial.addEventListener('change', handleFilterChange);
    selectors.filterPrice.addEventListener('change', handleFilterChange);
    selectors.sort.addEventListener('change', handleSortChange);
    selectors.checkoutForm.addEventListener('submit', handleCheckoutSubmit);
    selectors.printButton.addEventListener('click', handlePrint);
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeModal();
        closeCart();
      }
    });
    selectors.modal.addEventListener('click', (event) => {
      if (event.target === selectors.modal.querySelector('.modal__overlay')) {
        closeModal();
      }
    });
  }

  function init() {
    initBranding();
    populateFilters();
    applyFilters();
    renderCart();
    setupMenu();
    setupEventListeners();
  }

  init();
})();
