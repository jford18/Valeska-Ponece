export default function createProductGrid(products) {
  const section = document.createElement("section");
  section.id = "servicios";
  section.className = "section section--light";

  const container = document.createElement("div");
  container.className = "section__inner";

  const heading = document.createElement("h2");
  heading.textContent = "Servicios en los que brillamos";

  const intro = document.createElement("p");
  intro.className = "section__intro";
  intro.textContent = "Cada colaboración comienza con investigación profunda y termina con entregables claros, documentados y fáciles de mantener.";

  const grid = document.createElement("div");
  grid.className = "card-grid";

  products.forEach((product) => {
    const card = document.createElement("article");
    card.className = "card";
    card.setAttribute("data-id", product.id);

    const title = document.createElement("h3");
    title.textContent = product.title;

    const description = document.createElement("p");
    description.textContent = product.description;

    const price = document.createElement("p");
    price.className = "card__price";
    price.textContent = product.price;

    card.append(title, description, price);
    grid.append(card);
  });

  container.append(heading, intro, grid);
  section.append(container);
  return section;
}
