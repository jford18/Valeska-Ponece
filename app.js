import { productos } from "./data.js";

const $grid = document.getElementById("grid-productos");
const $year = document.getElementById("year");

const fmtUSD = new Intl.NumberFormat("es-EC", { style: "currency", currency: "USD" });

function cardHTML(p) {
  const img = (p.imagenes && p.imagenes[0]) || "";
  return `
  <article class="card" data-id="${p.id}">
    <img class="card__img" src="${img}" alt="${p.nombre}">
    <div class="card__body">
      ${p.nuevo ? `<span class="badge">NUEVO</span>` : ``}
      <h3>${p.nombre}</h3>
      <div class="price">${fmtUSD.format(p.precio)}</div>
      <div class="card__spacer"></div>
      <div class="card__actions">
        <button class="btn btn--ghost" type="button">Ver detalle</button>
        <button class="btn btn--gold" type="button">Agregar</button>
      </div>
    </div>
  </article>`;
}

function render() {
  if (!$grid) return;
  $grid.innerHTML = productos.map(cardHTML).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  render();
  if ($year) {
    $year.textContent = new Date().getFullYear();
  }
});
