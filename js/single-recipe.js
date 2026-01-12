const recipeContainer = document.getElementById("singleRecipe");

// 1️⃣ Get recipe id from URL
const params = new URLSearchParams(window.location.search);
const recipeId = params.get("id");

// 2️⃣ API URL (same source you used earlier)
const SINGLE_RECIPE_URL = `https://dummyjson.com/recipes/${recipeId}`;

async function loadSingleRecipe() {
  try {
    const res = await axios.get(SINGLE_RECIPE_URL);
    renderRecipe(res.data);
  } catch (err) {
    recipeContainer.innerHTML = "<p>Failed to load recipe.</p>";
    console.error(err);
  }
}

function renderRecipe(recipe) {
  recipeContainer.innerHTML = `
    <h1>${recipe.name}</h1>
    <img src="${recipe.image}" alt="${recipe.name}" />
    <p><strong>Cuisine:</strong> ${recipe.cuisine}</p>
    <p><strong>Prep Time:</strong> ${recipe.prepTimeMinutes} mins</p>

    <h3>Ingredients</h3>
    <ul>
      ${recipe.ingredients.map(i => `<li>${i}</li>`).join("")}
    </ul>
  `;
}

// 3️⃣ Init
loadSingleRecipe();
