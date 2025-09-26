const fmtUSD = new Intl.NumberFormat("es-EC", { style: "currency", currency: "USD" });
const placeholderImg = "https://via.placeholder.com/400x400?text=Sin+imagen";

function cardHTML(p) {
  const img = (Array.isArray(p.imagenes) && p.imagenes[0]) || placeholderImg;
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

document.addEventListener("DOMContentLoaded", () => {
  try {
    const data = window.productos;
    console.log("Productos cargados", data);

    if (!Array.isArray(data)) {
      console.error("La fuente de datos de productos no es un arreglo válido.", data);
      return;
    }

    const $grid = document.getElementById("grid-productos");
    if (!$grid) {
      console.error("No se encontró el contenedor del catálogo.");
      return;
    }

    $grid.innerHTML = data.map(cardHTML).join("");
  } catch (error) {
    console.error("Error al inicializar la aplicación:", error);
  }

  const $year = document.getElementById("year");
  if ($year) {
    $year.textContent = new Date().getFullYear();
  }
});
