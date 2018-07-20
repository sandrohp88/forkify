import Search from "./models/Search";
import { UIElements, renderSpinner, removeSpinner } from "./views/domObjects";
import * as searchView from "./views/searchView";
import Recipe from "./models/Recipe";

/**
 * Globlal state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};

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

UIElements.searchForm.addEventListener("submit", event => {
  event.preventDefault();
  controlSearch();
});

UIElements.resultPages.addEventListener("click", event => {
  const button = event.target.closest(".btn-inline");
  if (button) {
    const gotoPage = parseInt(button.dataset.goto);
    searchView.clearRecipesList();
    searchView.renderRecipes(state.search.recipes, gotoPage);
  }
});

const recipe = new Recipe("46956");
console.log(recipe.id);
recipe.getRecipe();
