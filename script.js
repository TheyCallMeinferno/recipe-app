const recipeContainer = document.getElementById("recipeContainer");
const searchInput = document.getElementById("searchInput");
const checkboxes = document.querySelectorAll(".sidebar input");

checkboxes.forEach(cb => {
  cb.addEventListener("change", filterByCuisine);
});

let allRecipes = [];

// Load recipes (like API)
const loadingText = document.getElementById("loadingText");
fetch("recipes.json")
  .then(res => res.json())
  .then(data => {
    allRecipes = data;
    renderRecipes(allRecipes);
  });

function renderRecipes(recipes) {
  if (loadingText) {
  loadingText.style.display = "none";
}
  recipeContainer.innerHTML = "";
    if (recipes.length === 0) {
    recipeContainer.innerHTML = "<p>No recipes found.</p>";
    return;
  }

  recipes.forEach(recipe => {
    const card = document.createElement("div");
    card.className = "recipe-card";

    card.innerHTML = `
      <img src="${recipe.image}">
      <div class="recipe-info">
        <h4>${recipe.name}</h4>
        <p>Cuisine: ${recipe.cuisine}</p>
        <p>⏱ ${recipe.time}</p>
      </div>
    `;

    card.addEventListener("click", () => openModal(recipe));

    recipeContainer.appendChild(card);
  });
}
function filterByCuisine() {
  const selectedCuisines = [...checkboxes]
    .filter(cb => cb.checked)
    .map(cb => cb.value);

  if (selectedCuisines.length === 0) {
    renderRecipes(allRecipes);
    return;
  }

  const filtered = allRecipes.filter(recipe =>
    selectedCuisines.includes(recipe.cuisine)
  );

  renderRecipes(filtered);
}

const modal = document.getElementById("recipeModal");
const closeModalBtn = document.getElementById("closeModal");

const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalCuisine = document.getElementById("modalCuisine");
const modalTime = document.getElementById("modalTime");
const modalIngredients = document.getElementById("modalIngredients");

function openModal(recipe) {
  modal.classList.remove("hidden");

  modalImage.src = recipe.image;
  modalTitle.textContent = recipe.name;
  modalCuisine.textContent = `Cuisine: ${recipe.cuisine}`;
  modalTime.textContent = `⏱ ${recipe.time}`;

  modalIngredients.innerHTML = "";
  recipe.ingredients.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    modalIngredients.appendChild(li);
  });
}

closeModalBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});
