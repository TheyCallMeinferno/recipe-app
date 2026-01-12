import { loadRecipes } from "./data.js";
import { renderRecipes } from "./renderRecipes.js";
import { applyFilters } from "./filters.js";
import { openModal } from "./modal.js";

const recipeContainer = document.getElementById("recipeContainer");
const searchInput = document.getElementById("searchInput");
const checkboxes = document.querySelectorAll(".sidebar input");
const cuisineFilter = document.getElementById("cuisineFilter");
const timeFilter = document.getElementById("timeFilter");
const applyBtn = document.getElementById("applyFilters");
const clearBtn = document.getElementById("clearFilters");


let allRecipes = [];

async function init() {
  const apiRecipes = await loadRecipes();

  allRecipes = apiRecipes.map(r => ({
    id: r.id,
    name: r.name,
    cuisine: r.cuisine,
    image: r.image,
    time: r.prepTimeMinutes + " mins",
    ingredients: r.ingredients
  }));
  
  renderRecipes(allRecipes, recipeContainer, openModal);
  attachFilterEvents();
}
init();


function attachFilterEvents() {
  applyBtn.addEventListener("click", () => {
    const cuisine = cuisineFilter.value;
    const maxTime = timeFilter.value;

    const filtered = applyFilters(
      allRecipes,
      cuisine,
      maxTime
    );

    renderRecipes(filtered, recipeContainer, openModal);
  });

  clearBtn.addEventListener("click", () => {
    cuisineFilter.value = "All";
    timeFilter.value = "";
    renderRecipes(allRecipes, recipeContainer, openModal);
  });
}


function clearFilters() {
  cuisineFilter.value = "All";
  timeFilter.value = "";
  renderRecipes(allRecipes, recipeContainer, openModal);
}

