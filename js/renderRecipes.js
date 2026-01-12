export function renderRecipes(recipes, container, openModal) {
  container.innerHTML = "";

  if (recipes.length === 0) {
    container.innerHTML = "<p>No recipes found.</p>";
    return;
  }

  recipes.forEach(recipe => {
    const card = document.createElement("div");
    card.className = "recipe-card";

    card.innerHTML = `
      <img src="${recipe.image}" />
      <div class="recipe-info">
        <h4>${recipe.name}</h4>
        <p>Cuisine: ${recipe.cuisine}</p>
        <p>⏱ ${recipe.time}</p>
      </div>
    `;

    card.addEventListener("click", () => openModal(recipe));
    container.appendChild(card);
  });
}
