export default function createFooter() {
  const footer = document.createElement("footer");
  footer.className = "site-footer";

  const container = document.createElement("div");
  container.className = "site-footer__inner";

  const copy = document.createElement("p");
  copy.textContent = `© ${new Date().getFullYear()} Valeska Ponce Studio. Todos los derechos reservados.`;

  const smallPrint = document.createElement("p");
  smallPrint.className = "site-footer__note";
  smallPrint.textContent = "Este sitio estático usa únicamente rutas relativas, listo para desplegarse en cualquier carpeta.";

  container.append(copy, smallPrint);
  footer.append(container);
  return footer;
}
