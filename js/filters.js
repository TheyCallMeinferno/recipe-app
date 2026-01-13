export function applyFilters(recipes, searchText, cuisine, maxTime) {
  return recipes.filter(recipe => {
    const matchesSearch =
      recipe.name.toLowerCase().includes(searchText.toLowerCase());

    const matchesCuisine =
      cuisine === "All" || recipe.cuisine === cuisine;

    const matchesTime =
      !maxTime || parseInt(recipe.time) <= parseInt(maxTime);

    return matchesSearch && matchesCuisine && matchesTime;
  });
}
