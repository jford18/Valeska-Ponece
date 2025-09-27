import createHeader from "./components/Header.js";
import createHeroSection from "./components/HeroSection.js";
import createProductGrid from "./components/ProductGrid.js";
import createMethodologySection from "./components/MethodologySection.js";
import createTeamSection from "./components/TeamSection.js";
import createContactSection from "./components/ContactSection.js";
import createFooter from "./components/Footer.js";

const IMPORT_PATHS = [
  "./components/Header.js",
  "./components/HeroSection.js",
  "./components/ProductGrid.js",
  "./components/MethodologySection.js",
  "./components/TeamSection.js",
  "./components/ContactSection.js",
  "./components/Footer.js"
];

// Validación obligatoria: todas las rutas de import deben iniciar con ./ o ../
if (IMPORT_PATHS.some((path) => !path.startsWith("./") && !path.startsWith("../"))) {
  throw new Error("Todas las importaciones internas deben ser rutas relativas.");
}

async function init() {
  const root = document.getElementById("app");
  root.innerHTML = "";

  const header = createHeader();
  const hero = createHeroSection();
  const methodology = createMethodologySection();
  const footer = createFooter();

  const main = document.createElement("main");
  main.id = "contenido-principal";

  main.append(hero);

  const products = await fetchData("./data/products.json");
  main.append(createProductGrid(products));

  main.append(methodology);

  const team = await fetchData("./data/team.json");
  main.append(createTeamSection(team));

  main.append(createContactSection());

  root.append(header, main, footer);

  enforceRelativeResourcePaths();
}

async function fetchData(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`No se pudo cargar ${path}`);
  }
  return response.json();
}

// Validación obligatoria: no permitir rutas internas que comiencen con / o http(s)://
function enforceRelativeResourcePaths() {
  const elements = document.querySelectorAll("[src], [href], [action]");
  elements.forEach((el) => {
    ["src", "href", "action"].forEach((attr) => {
      if (!el.hasAttribute(attr)) {
        return;
      }
      const value = el.getAttribute(attr);
      if (!value) {
        return;
      }
      if (value.startsWith("#") || value.startsWith("mailto:")) {
        return;
      }

      const isAbsolute = value.startsWith("/") || value.startsWith("http://") || value.startsWith("https://");
      if (!isAbsolute) {
        return;
      }

      if (value.startsWith("http://") || value.startsWith("https://")) {
        try {
          const url = new URL(value);
          if (url.origin === window.location.origin) {
            throw new Error(`Ruta absoluta interna no permitida en ${attr}: ${value}`);
          }
          return; // Es un recurso externo, se permite
        } catch (error) {
          throw new Error(`URL inválida detectada en ${attr}: ${value}`);
        }
      }

      throw new Error(`Ruta relativa requerida en ${attr}, se encontró: ${value}`);
    });
  });
}

document.addEventListener("DOMContentLoaded", init);
