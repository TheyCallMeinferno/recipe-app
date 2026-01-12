import { loadRecipes } from "./data.js";
import { renderRecipes } from "./renderRecipes.js";
import { applyFilters } from "./filters.js";
import { openModal } from "./modal.js";

const recipeContainer = document.getElementById("recipeContainer");
const searchInput = document.getElementById("searchInput");
const checkboxes = document.querySelectorAll(".sidebar input");

let allRecipes = [];

async function init() {
  const apiRecipes = await loadRecipes();

  allRecipes = apiRecipes.map(r => ({
    id: r.id,
    name: r.name,
    cuisine: r.cuisine,
    image: r.image,
    time: `${r.prepTimeMinutes} mins`,
    ingredients: r.ingredients
  }));
  renderCuisineFilters(allRecipes);
  renderRecipes(allRecipes, recipeContainer, openModal);

  attachFilterEvents();
}
init();

function renderCuisineFilters(recipes) {
  const container = document.getElementById("cuisineFilters");
  container.innerHTML = "";

  const cuisines = [...new Set(recipes.map(r => r.cuisine))];

  cuisines.forEach(cuisine => {
    const label = document.createElement("label");

    label.innerHTML = `
      <input type="checkbox" value="${cuisine}">
      ${cuisine}
    `;

    container.appendChild(label);
  });
}

function attachFilterEvents() {
  const checkboxes = document.querySelectorAll("#cuisineFilters input");

  checkboxes.forEach(cb => {
    cb.addEventListener("change", () => {
      const selected = [...checkboxes]
        .filter(c => c.checked)
        .map(c => c.value);

      const filtered =
        selected.length === 0
          ? allRecipes
          : allRecipes.filter(r => selected.includes(r.cuisine));

      renderRecipes(filtered, recipeContainer, openModal);
    });
  });
}

