// app.js
(function () {
  function formatCurrency(n){
    return new Intl.NumberFormat('es-EC', { style: 'currency', currency: 'USD' }).format(n || 0);
  }

  const PLACEHOLDER_FALLBACK = 'data:image/svg+xml;utf8,' + encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800">
      <defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
        <stop stop-color="#1c1c1c" offset="0"/><stop stop-color="#2a2a2a" offset="1"/>
      </linearGradient></defs>
      <rect width="100%" height="100%" fill="url(#g)"/>
      <text x="50%" y="50%" fill="#D4AF37" font-size="36" font-family="Arial" text-anchor="middle" dominant-baseline="middle">
        Imagen no disponible
      </text></svg>`
  );

  function handleImgError(e){
    const imgEl = e.currentTarget;
    if (imgEl.dataset.fallbackTried === '1') {
      imgEl.src = PLACEHOLDER_FALLBACK;
      return;
    }
    imgEl.dataset.fallbackTried = '1';
    imgEl.src = PLACEHOLDER_FALLBACK;
  }

  function createCard(p){
    const card = document.createElement('article');
    card.className = 'card product-card';

    const imgWrap = document.createElement('div');
    imgWrap.className = 'card__media';
    const img = document.createElement('img');
    img.className = 'card__img';
    img.src = (p.imagenes && p.imagenes[0]) ? p.imagenes[0] : PLACEHOLDER_FALLBACK;
    img.alt = `${p.nombre} – ${p.material || ''}`;
    img.loading = 'lazy';
    img.decoding = 'async';
    img.width = 600; img.height = 600;
    img.addEventListener('error', handleImgError);
    imgWrap.appendChild(img);

    if (p.nuevo === true) {
      const badge = document.createElement('span');
      badge.className = 'badge badge--new';
      badge.textContent = 'Nuevo';
      imgWrap.appendChild(badge);
    }

    const body = document.createElement('div');
    body.className = 'card__body';

    const title = document.createElement('h3');
    title.className = 'card__title';
    title.textContent = p.nombre || 'Producto';

    const price = document.createElement('div');
    price.className = 'card__price';
    price.innerHTML = `<span class="price-current">${formatCurrency(p.precio)}</span>`;

    const actions = document.createElement('div');
    actions.className = 'card__actions';

    const btnDetail = document.createElement('button');
    btnDetail.className = 'btn btn--ghost';
    btnDetail.type = 'button';
    btnDetail.textContent = 'Ver detalle';
    btnDetail.dataset.id = p.id;

    const btnAdd = document.createElement('button');
    btnAdd.className = 'btn btn--primary';
    btnAdd.type = 'button';
    btnAdd.textContent = 'Agregar';
    btnAdd.dataset.id = p.id;

    actions.append(btnDetail, btnAdd);
    body.append(title, price, actions);
    card.append(imgWrap, body);
    return card;
  }

  function getGridContainer(){
    return (
      document.querySelector('[data-catalog-grid]') ||
      document.getElementById('catalogoGrid') ||
      document.getElementById('gridCatalogo')
    );
  }

  function renderCatalog(list){
    const grid = getGridContainer();
    if (!grid) return;
    grid.innerHTML = '';
    (list || []).forEach(p => {
      try { grid.appendChild(createCard(p)); } catch (err) {}
    });
  }

  function initCatalog(){
    if (!Array.isArray(window.productos)) return;
    renderCatalog(window.productos);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCatalog);
  } else {
    initCatalog();
  }
})();
