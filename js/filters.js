export function applyFilters(recipes, cuisine, maxTime) {
  let filtered = recipes;

  if (cuisine !== "All") {
    filtered = filtered.filter(r => r.cuisine === cuisine);
  }

  if (maxTime) {
    filtered = filtered.filter(
      r => parseInt(r.time) <= parseInt(maxTime)
    );
  }

  return filtered;
}

