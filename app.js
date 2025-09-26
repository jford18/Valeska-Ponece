import { productos } from './data.js';

const grid = document.querySelector('[data-product-grid]');
const yearElement = document.getElementById('year');
const toggleButton = document.querySelector('.topbar__toggle');
const topbarNav = document.querySelector('.topbar__nav');

const currencyFormatter = new Intl.NumberFormat('es-EC', {
  style: 'currency',
  currency: 'USD'
});

function createProductCard(producto) {
  const card = document.createElement('article');
  card.className = 'card';

  const imageWrapper = document.createElement('div');
  imageWrapper.className = 'card__img-wrapper';

  const image = document.createElement('img');
  image.className = 'card__img';
  image.src = producto.imagenes?.[0] ?? '';
  image.alt = `${producto.nombre} - joya ${producto.material.toLowerCase()}`;
  image.loading = 'lazy';

  if (producto.nuevo) {
    const badge = document.createElement('span');
    badge.className = 'card__badge';
    badge.textContent = 'NUEVO';
    imageWrapper.appendChild(badge);
  }

  imageWrapper.appendChild(image);
  card.appendChild(imageWrapper);

  const body = document.createElement('div');
  body.className = 'card__body';

  const title = document.createElement('h3');
  title.className = 'card__title';
  title.textContent = producto.nombre;

  const meta = document.createElement('p');
  meta.className = 'card__meta';
  meta.textContent = `${producto.categoria} • ${producto.material}`;

  const price = document.createElement('p');
  price.className = 'card__price';
  price.textContent = currencyFormatter.format(producto.precio);

  const spacer = document.createElement('div');
  spacer.className = 'card__spacer';

  const actions = document.createElement('div');
  actions.className = 'card__actions';

  const detailButton = document.createElement('a');
  detailButton.className = 'btn btn--ghost';
  detailButton.href = '#';
  detailButton.textContent = 'Ver detalle';
  detailButton.setAttribute('role', 'button');

  const addButton = document.createElement('button');
  addButton.className = 'btn btn--gold';
  addButton.type = 'button';
  addButton.textContent = 'Agregar';
  addButton.addEventListener('click', () => {
    // Placeholder action for future integrations
  });

  actions.append(detailButton, addButton);

  body.append(title, meta, price, spacer, actions);
  card.appendChild(body);

  return card;
}

function renderProducts(data) {
  if (!grid) return;
  grid.innerHTML = '';
  data.forEach((producto) => {
    const card = createProductCard(producto);
    grid.appendChild(card);
  });
}

renderProducts(productos);

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

if (toggleButton && topbarNav) {
  toggleButton.addEventListener('click', () => {
    const isOpen = topbarNav.classList.toggle('is-open');
    toggleButton.setAttribute('aria-expanded', String(isOpen));
  });

  topbarNav.addEventListener('click', (event) => {
    const target = event.target;
    if (target instanceof Element) {
      const link = target.closest('a');
      if (link) {
        topbarNav.classList.remove('is-open');
        toggleButton.setAttribute('aria-expanded', 'false');
      }
    }
  });

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) {
      return;
    }
    if (!topbarNav.contains(target) && target !== toggleButton && topbarNav.classList.contains('is-open')) {
      topbarNav.classList.remove('is-open');
      toggleButton.setAttribute('aria-expanded', 'false');
    }
  });
}

