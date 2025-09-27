const STEPS = [
  {
    title: "Descubrimiento",
    description: "Investigamos contexto, métricas y audiencia. Cerramos objetivos compartidos y criterios de éxito." 
  },
  {
    title: "Prototipado",
    description: "Creamos prototipos navegables y guías de contenido para validar decisiones antes del desarrollo." 
  },
  {
    title: "Entrega",
    description: "Implementamos un sitio estático accesible con rutas 100% relativas, optimizado para cualquier carpeta." 
  }
];

export default function createMethodologySection() {
  const section = document.createElement("section");
  section.id = "metodologia";
  section.className = "section section--muted";

  const container = document.createElement("div");
  container.className = "section__inner";

  const heading = document.createElement("h2");
  heading.textContent = "Cómo trabajamos";

  const list = document.createElement("ol");
  list.className = "step-list";

  STEPS.forEach((step, index) => {
    const item = document.createElement("li");
    item.className = "step";

    const number = document.createElement("span");
    number.className = "step__number";
    number.textContent = `0${index + 1}`;

    const title = document.createElement("h3");
    title.textContent = step.title;

    const description = document.createElement("p");
    description.textContent = step.description;

    item.append(number, title, description);
    list.append(item);
  });

  container.append(heading, list);
  section.append(container);
  return section;
}
