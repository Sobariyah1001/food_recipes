
// Function to get a random recipe from TheMealDB API
async function getRandomRecipe() {
  const apiUrl = `https://www.themealdb.com/api/json/v1/1/random.php`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.meals[0];
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

// Function to toggle recipe details visibility when clicked
function toggleRecipeDetails(recipeId) {
  const recipeDiv = document.getElementById(`recipe-${recipeId}`);
  recipeDiv.classList.toggle('show-details');
}
// Function to display recipes on the page
async function showRecipes() {
  const recipeList = document.getElementById('recipe-list');
  for (let i = 1; i <= 9; i++) {
    const recipe = await getRandomRecipe();
    const recipeDiv = document.createElement('div');
    recipeDiv.classList.add('recipe');
    recipeDiv.id = `recipe-${recipe.idMeal}`;
    const title = document.createElement('h2');
    title.textContent = recipe.strMeal;
    const img = document.createElement('img');
    img.src = recipe.strMealThumb;
    recipeDiv.appendChild(img);
    recipeDiv.appendChild(title);
    // Create recipe details element
    const recipeDetails = document.createElement('div');
    recipeDetails.classList.add('recipe-details');
    const instructions = document.createElement('p');
    instructions.textContent = `Instruksi: ${recipe.strInstructions}`;
    recipeDetails.appendChild(instructions);
     // Add click event listener to toggle recipe details visibility
    recipeDiv.addEventListener('click', () => toggleRecipeDetails(recipe.idMeal));
    recipeDiv.appendChild(recipeDetails);
    recipeList.appendChild(recipeDiv);
  }
}
document.addEventListener('DOMContentLoaded', () => {
  showRecipes();
});