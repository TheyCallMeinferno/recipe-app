export async function loadRecipes() {
  try {
    const response = await axios.get("https://dummyjson.com/recipes");
    return response.data.recipes;
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
}
