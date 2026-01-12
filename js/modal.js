const modal = document.getElementById("recipeModal");
const closeBtn = document.getElementById("closeModal");

export function openModal(recipe) {
  document.getElementById("modalImage").src = recipe.image;
  document.getElementById("modalTitle").textContent = recipe.name;
  document.getElementById("modalCuisine").textContent = recipe.cuisine;
  document.getElementById("modalTime").textContent = recipe.time;

  modal.classList.remove("hidden");
}

closeBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});
