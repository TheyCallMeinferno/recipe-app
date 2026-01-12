export function renderRecipes(recipes, container) {
  const loadingText = document.getElementById("loadingText");
  if (loadingText) loadingText.style.display = "none";

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
        <h3>${recipe.name}</h3>
        <p>Cuisine: ${recipe.cuisine}</p>
        <p>${recipe.time}</p>
      </div>
    `;

    card.addEventListener("click", () => {
      window.location.href = `single-recipe.html?id=${recipe.id}`;
    });

    container.appendChild(card);
  });
}
