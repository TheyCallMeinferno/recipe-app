export function applyFilters(recipes) {
  const cuisineSelect = document.getElementById("cuisineFilter");
  const timeInput = document.getElementById("timeFilter");

  let filtered = [...recipes];

  // Cuisine filter
  if (cuisineSelect && cuisineSelect.value !== "All") {
    filtered = filtered.filter(
      r => r.cuisine === cuisineSelect.value
    );
  }

  // Time filter
  if (timeInput && timeInput.value) {
    const maxTime = Number(timeInput.value);
    filtered = filtered.filter(
      r => Number(r.time.replace(/\D/g, "")) <= maxTime
    );
  }

  return filtered;
}
