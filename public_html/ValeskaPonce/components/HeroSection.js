export default function createHeroSection() {
  const section = document.createElement("section");
  section.id = "inicio";
  section.className = "hero";

  const container = document.createElement("div");
  container.className = "hero__content";

  const badge = document.createElement("p");
  badge.className = "hero__badge";
  badge.textContent = "Estudio creativo + estrategia digital";

  const title = document.createElement("h1");
  title.textContent = "Diseñamos experiencias memorables que convierten";

  const description = document.createElement("p");
  description.className = "hero__description";
  description.textContent = "Unimos investigación, branding y desarrollo front-end para lanzar sitios estáticos listos para brillar en cualquier dominio.";

  const ctaList = document.createElement("div");
  ctaList.className = "hero__actions";

  const primary = document.createElement("a");
  primary.className = "button button--primary";
  primary.href = "#contacto";
  primary.textContent = "Hablemos de tu proyecto";

  const secondary = document.createElement("a");
  secondary.className = "button button--ghost";
  secondary.href = "#servicios";
  secondary.textContent = "Ver servicios";

  ctaList.append(primary, secondary);
  container.append(badge, title, description, ctaList);
  section.append(container);
  return section;
}
