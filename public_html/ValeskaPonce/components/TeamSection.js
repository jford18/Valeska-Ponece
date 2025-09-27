export default function createTeamSection(teamMembers) {
  const section = document.createElement("section");
  section.id = "equipo";
  section.className = "section";

  const container = document.createElement("div");
  container.className = "section__inner";

  const heading = document.createElement("h2");
  heading.textContent = "Personas detrás del estudio";

  const intro = document.createElement("p");
  intro.className = "section__intro";
  intro.textContent = "Somos un equipo compacto y coordinado. Trabajamos en sprints cortos y medimos cada entrega.";

  const grid = document.createElement("div");
  grid.className = "team-grid";

  teamMembers.forEach((member) => {
    const card = document.createElement("article");
    card.className = "team-card";

    const name = document.createElement("h3");
    name.textContent = member.name;

    const role = document.createElement("p");
    role.className = "team-card__role";
    role.textContent = member.role;

    const bio = document.createElement("p");
    bio.textContent = member.bio;

    card.append(name, role, bio);
    grid.append(card);
  });

  container.append(heading, intro, grid);
  section.append(container);
  return section;
}
