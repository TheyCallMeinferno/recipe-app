export function applyFilters(allRecipes, searchInput, checkboxes) {
  let filtered = [...allRecipes];

  const searchText = searchInput.value.toLowerCase();
  if (searchText) {
    filtered = filtered.filter(r =>
      r.name.toLowerCase().includes(searchText)
    );
  }

  const selectedCuisines = [...checkboxes]
    .filter(c => c.checked)
    .map(c => c.value);

  if (selectedCuisines.length > 0) {
    filtered = filtered.filter(r =>
      selectedCuisines.includes(r.cuisine)
    );
  }

  return filtered;
}
