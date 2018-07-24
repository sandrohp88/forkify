import Search from './models/Search';
import Recipe from './models/Recipe';
import ShoppingList from './models/ShoppingList';
import { UIElements, renderSpinner, removeSpinner } from './views/domObjects';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as shoppingView from './views/shoppingListView';

/**
 * Globlal state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};
/**
 * Search controller
 */
const controlSearch = async () => {
	// 1- Get query from the view
	const query = searchView.getSearchInput(); // TODO
	if (query) {
		// 2- New search object and add to state
		state.search = new Search(query);

		// 3- Prepare UI for results TODO
		searchView.clearInput();
		searchView.clearRecipesList();
		// 4- Search for recipes
		renderSpinner(UIElements.result);
		await state.search.getResults();

		// 5- Render the UI
		removeSpinner();
		searchView.renderRecipes(state.search.recipes);
	}
};
/**
 * Recipe controller
 */
const controlRecipe = async () => {
	const recipeID = window.location.hash.replace('#', '');
	if (recipeID) {
		// Prepare UI for changes
		recipeView.clearInput();

		// Highlight select search item
		if (state.search) {
			searchView.highlitSelectect(recipeID);
		}
		// Create a new recipe Object
		state.recipe = new Recipe(recipeID);

		try {
			// Get recipe data and parse ingredients
			renderSpinner(UIElements.recipe);
			await state.recipe.getRecipe();
			state.recipe.calculateTime();
			state.recipe.calculateServings();
			state.recipe.parseIngredients();
			removeSpinner();
		} catch (error) {
			alert('Ooops something went wrong', error);
		}

		// render recipe
		recipeView.renderRecipe(state.recipe);

		// console.log(state.recipe.ingredients);
	}
};

['hashchange', 'load'].forEach(event =>
	window.addEventListener(event, controlRecipe)
);

/**
 * ShoppingList controller
 */

const controlShoppingList = () => {
	// Create a new list if there none yet
	if (!state.shoppingList) {
		state.shoppingList = new ShoppingList();
	}
	// Add each ingredient to the shoppingList
	state.recipe.ingredients.forEach(ingredient => {
		const item = state.shoppingList.addItem(
			ingredient.count,
			ingredient.unit,
			ingredient.ingredient
		);
		shoppingView.renderItem(item);
	});
};

UIElements.searchForm.addEventListener('submit', event => {
	event.preventDefault();
	controlSearch();
});

UIElements.resultPages.addEventListener('click', event => {
	const button = event.target.closest('.btn-inline');
	if (button) {
		const gotoPage = parseInt(button.dataset.goto);
		searchView.clearRecipesList();
		searchView.renderRecipes(state.search.recipes, gotoPage);
	}
});

// Handle delete and update shoppingList item event
UIElements.shoppingList.addEventListener('click', event => {
	const id = event.target.closest('.shopping__item').dataset.itemid;
	if (event.target.matches('.shopping__delete, shopping__delete *')) {
		// Delete from the state
		state.shoppingList.deleteItem(id);

		// Delete from the UI
		shoppingView.deleteItem(id);
		// Handle the count update
	} else if (event.target.matches('.shopping__count-value')) {
		const val = parseFloat(event.target.value, 10);
		state.shoppingList.updateCount(id, val);
	}
});

// Handling recipes button clicks

UIElements.recipe.addEventListener('click', event => {
	if (event.target.matches('.btn-decrease, .btn-decrease *')) {
		// Drecrease button is clicked
		if (state.recipe.servings > 1) {
			state.recipe.updateServings('dec');
			recipeView.updateServingsIngredient(state.recipe);
		}
	} else if (event.target.matches('.btn-increase, .btn-increase *')) {
		// Increase button is clicked
		state.recipe.updateServings('inc');
		recipeView.updateServingsIngredient(state.recipe);
	} else if (event.target.matches('.recipe__btn--add,.recipe__btn--add *')) {
		controlShoppingList();
	}
});
