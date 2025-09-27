export default function createContactSection() {
  const section = document.createElement("section");
  section.id = "contacto";
  section.className = "section section--highlight";

  const container = document.createElement("div");
  container.className = "section__inner";

  const heading = document.createElement("h2");
  heading.textContent = "Construyamos tu próximo lanzamiento";

  const description = document.createElement("p");
  description.className = "section__intro";
  description.textContent = "En 48 horas coordinamos una llamada exploratoria para definir alcance, entregables y tiempos.";

  const form = document.createElement("form");
  form.className = "contact-form";
  form.action = "https://formspree.io/f/mayvlkqr";
  form.method = "post";

  form.append(
    createField({ label: "Nombre", name: "name", type: "text", autocomplete: "name" }),
    createField({ label: "Correo", name: "email", type: "email", autocomplete: "email" }),
    createTextArea({
      label: "Cuéntanos sobre tu proyecto",
      name: "message",
      rows: 4
    })
  );

  const submit = document.createElement("button");
  submit.type = "submit";
  submit.className = "button button--primary";
  submit.textContent = "Agendar conversación";

  form.append(submit);
  container.append(heading, description, form);
  section.append(container);
  return section;
}

function createField({ label, name, type, autocomplete }) {
  const wrapper = document.createElement("label");
  wrapper.className = "field";
  wrapper.textContent = label;

  const input = document.createElement("input");
  input.type = type;
  input.name = name;
  input.autocomplete = autocomplete;
  input.required = true;

  wrapper.append(input);
  return wrapper;
}

function createTextArea({ label, name, rows }) {
  const wrapper = document.createElement("label");
  wrapper.className = "field";
  wrapper.textContent = label;

  const textarea = document.createElement("textarea");
  textarea.name = name;
  textarea.rows = rows;
  textarea.required = true;

  wrapper.append(textarea);
  return wrapper;
}
