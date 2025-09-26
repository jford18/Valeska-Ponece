const fmtUSD = new Intl.NumberFormat("es-EC", { style: "currency", currency: "USD" });
const placeholderImg = "https://via.placeholder.com/400x400?text=Sin+imagen";
const STORAGE_KEY = "vp_carrito";

let carrito = [];

function cardHTML(producto) {
  const img = (Array.isArray(producto.imagenes) && producto.imagenes[0]) || placeholderImg;
  return `
  <article class="card" data-id="${producto.id}">
    <img class="card__img" src="${img}" alt="${producto.nombre}">
    <div class="card__body">
      ${producto.nuevo ? `<span class="badge">NUEVO</span>` : ``}
      <h3>${producto.nombre}</h3>
      <div class="price">${fmtUSD.format(producto.precio)}</div>
      <div class="card__spacer"></div>
      <div class="card__actions">
        <button class="btn btn--ghost" type="button">Ver detalle</button>
        <button class="btn btn--gold js-add-to-cart" type="button" data-id="${producto.id}">Añadir al carrito</button>
      </div>
    </div>
  </article>`;
}

function loadCarrito() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed
        .map((item) => ({
          id: Number(item.id),
          nombre: String(item.nombre || ""),
          precio: Number(item.precio) || 0,
          cantidad: Number(item.cantidad) > 0 ? Number(item.cantidad) : 1
        }))
        .filter((item) => !Number.isNaN(item.id));
    }
  } catch (error) {
    console.warn("No se pudo leer el carrito almacenado:", error);
  }
  return [];
}

function saveCarrito() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(carrito));
  } catch (error) {
    console.warn("No se pudo guardar el carrito:", error);
  }
  window.__carrito = carrito;
}

document.addEventListener("DOMContentLoaded", () => {
  try {
    const data = window.productos;
    console.log("Productos cargados", data);

    if (!Array.isArray(data)) {
      console.error("La fuente de datos de productos no es un arreglo válido.", data);
      return;
    }

    const $grid = document.getElementById("grid-productos");
    const $cartContent = document.getElementById("cart-content");
    const $cartLink = document.getElementById("cart-link");

    if (!$grid || !$cartContent || !$cartLink) {
      console.error("No se encontró un elemento necesario para inicializar el carrito.");
      return;
    }

    carrito = loadCarrito();
    window.__carrito = carrito;

    const renderCart = () => {
      if (!carrito.length) {
        $cartContent.innerHTML = `<p>Tu carrito está vacío por ahora. Explora el catálogo y agrega tus joyas favoritas.</p>`;
        return;
      }

      const totalArticulos = carrito.reduce((total, item) => total + item.cantidad, 0);
      const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

      const itemsHTML = carrito
        .map(
          (item) => `
        <li class="cart-item" data-id="${item.id}">
          <span class="cart-item__name">${item.nombre}</span>
          <span class="cart-item__qty">x${item.cantidad}</span>
          <span class="cart-item__price">${fmtUSD.format(item.precio)}</span>
          <span class="cart-item__subtotal">${fmtUSD.format(item.precio * item.cantidad)}</span>
        </li>`
        )
        .join("");

      $cartContent.innerHTML = `
        <ul class="cart-list">
          ${itemsHTML}
        </ul>
        <div class="cart-summary">
          <span class="cart-summary__label">Artículos: ${totalArticulos}</span>
          <span class="cart-summary__total">Total: ${fmtUSD.format(total)}</span>
        </div>
      `;
    };

    const updateCartLink = () => {
      const count = carrito.reduce((total, item) => total + item.cantidad, 0);
      $cartLink.textContent = `Carrito [${count}]`;
    };

    const handleAddToCart = (event) => {
      const button = event.target.closest("button[data-id]");
      if (!button || !$grid.contains(button)) return;

      event.preventDefault();
      const id = Number(button.dataset.id);
      if (!Number.isInteger(id)) {
        console.warn("El botón no tiene un data-id válido.", button);
        return;
      }

      const producto = data.find((item) => Number(item.id) === id);
      if (!producto) {
        console.warn(`No se encontró el producto con id ${id}.`);
        return;
      }

      const existente = carrito.find((item) => item.id === producto.id);
      if (existente) {
        existente.cantidad += 1;
      } else {
        carrito.push({
          id: producto.id,
          nombre: producto.nombre,
          precio: Number(producto.precio) || 0,
          cantidad: 1
        });
      }

      console.log("Producto agregado al carrito", {
        id: producto.id,
        nombre: producto.nombre,
        cantidad: existente ? existente.cantidad : 1,
        carrito
      });

      saveCarrito();
      renderCart();
      updateCartLink();
    };

    $grid.innerHTML = data.map(cardHTML).join("");
    renderCart();
    updateCartLink();

    $grid.addEventListener("click", handleAddToCart);
  } catch (error) {
    console.error("Error al inicializar la aplicación:", error);
  }

  const $year = document.getElementById("year");
  if ($year) {
    $year.textContent = new Date().getFullYear();
  }
});
