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
  const searchText = searchInput.value;
  const cuisine = cuisineFilter.value;
  const maxTime = timeFilter.value;

  const filtered = applyFilters(
    allRecipes,
    searchText,
    cuisine,
    maxTime
  );

  renderRecipes(filtered, recipeContainer, openModal);
});

searchInput.addEventListener("input", () => {
    applyBtn.click();
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

function applyAllFilters() {
  const searchText = searchInput.value.toLowerCase();
  const selectedCuisine = cuisineFilter.value;
  const maxTime = timeFilter.value;

  let filtered = allRecipes;

  //  Search filter
  if (searchText) {
    filtered = filtered.filter(recipe =>
      recipe.name.toLowerCase().includes(searchText)
    );
  }

  //  Cuisine filter
  if (selectedCuisine !== "All") {
    filtered = filtered.filter(
      recipe => recipe.cuisine === selectedCuisine
    );
  }

  //  Time filter
  if (maxTime) {
    filtered = filtered.filter(recipe =>
      parseInt(recipe.time) <= parseInt(maxTime)
    );
  }

  renderRecipes(filtered, recipeContainer, openModal);
}

