export default function createHeader() {
  const header = document.createElement("header");
  header.className = "site-header";

  const logoLink = document.createElement("a");
  logoLink.href = "#inicio";
  logoLink.className = "logo";

  const logoImg = document.createElement("img");
  logoImg.src = "./assets/logo.svg";
  logoImg.alt = "Logotipo de Valeska Ponce";
  logoImg.width = 64;
  logoImg.height = 64;
  logoLink.append(logoImg, createSpan("Valeska Ponce"));

  const nav = document.createElement("nav");
  nav.setAttribute("aria-label", "Navegación principal");

  const sections = [
    { href: "#servicios", label: "Servicios" },
    { href: "#metodologia", label: "Metodología" },
    { href: "#equipo", label: "Equipo" },
    { href: "#contacto", label: "Contacto" }
  ];

  const list = document.createElement("ul");
  sections.forEach((section) => {
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.href = section.href;
    link.textContent = section.label;
    item.append(link);
    list.append(item);
  });

  nav.append(list);
  header.append(logoLink, nav);
  return header;
}

function createSpan(text) {
  const span = document.createElement("span");
  span.textContent = text;
  return span;
}
