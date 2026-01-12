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
  const applyBtn = document.getElementById("applyFilters");
const clearBtn = document.getElementById("clearFilters");

applyBtn.addEventListener("click", () => {
  const filtered = applyFilters(allRecipes);
  renderRecipes(filtered, recipeContainer, openModal);
});

clearBtn.addEventListener("click", () => {
  document.getElementById("cuisineFilter").value = "All";
  document.getElementById("timeFilter").value = "";
  renderRecipes(allRecipes, recipeContainer, openModal);
});
