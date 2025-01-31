// Function to display recipes
function displayRecipes(recipes) {
  const recipeList = document.getElementById("recipe-list");
  recipeList.innerHTML = ''; // Clear current list

  if (recipes.length === 0) {
      recipeList.innerHTML = '<p>No recipes found.</p>';
  }

  recipes.forEach((recipe, index) => {
      const recipeCard = document.createElement('div');
      recipeCard.classList.add('recipe-card');
      recipeCard.innerHTML = `
          <h3>${recipe.name}</h3>
          <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
          <p><strong>Instructions:</strong> ${recipe.instructions}</p>
          <button class="delete-btn" onclick="deleteRecipe(${index})">Delete</button>
      `;
      recipeList.appendChild(recipeCard);
  });
}

// Function to open the Add Recipe form
function openAddRecipeForm() {
  document.getElementById("add-recipe-form").style.display = 'block';
}

// Function to close the Add Recipe form
function closeAddRecipeForm() {
  document.getElementById("add-recipe-form").style.display = 'none';
}

// Function to add a recipe
function addRecipe(event) {
  event.preventDefault(); // Prevent form from submitting

  const name = document.getElementById("recipe-name").value.trim();
  const ingredients = document.getElementById("ingredients").value.trim();
  const instructions = document.getElementById("instructions").value.trim();

  if (!name || !ingredients || !instructions) {
      alert("Please fill in all fields.");
      return;
  }

  const newRecipe = { name, ingredients, instructions };

  let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
  recipes.push(newRecipe);
  localStorage.setItem('recipes', JSON.stringify(recipes));

  // Clear input fields
  document.getElementById("recipe-name").value = '';
  document.getElementById("ingredients").value = '';
  document.getElementById("instructions").value = '';

  closeAddRecipeForm();
  displayRecipes(recipes);
}

// Function to delete a recipe
function deleteRecipe(index) {
  let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
  recipes.splice(index, 1);
  localStorage.setItem('recipes', JSON.stringify(recipes));
  displayRecipes(recipes);
}

// Function to search recipes
function searchRecipe() {
  const query = document.getElementById("search").value.toLowerCase();
  let recipes = JSON.parse(localStorage.getItem('recipes')) || [];

  if (query) {
      recipes = recipes.filter(recipe =>
          recipe.name.toLowerCase().includes(query) ||
          recipe.ingredients.toLowerCase().includes(query) ||
          recipe.instructions.toLowerCase().includes(query)
      );
  }

  displayRecipes(recipes);
}

// Load recipes from localStorage on page load
window.onload = function() {
  let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
  displayRecipes(recipes);
};
