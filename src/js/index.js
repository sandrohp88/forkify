import Search from "./models/Search";
import { UIElements } from "./views/domObjects";
import * as searchView from "./views/searchView";

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
    await state.search.getResults();

    // 5- Render the UI
    // console.log(state.search.recipes);
    searchView.renderRecipes(state.search.recipes);
  }
};
UIElements.searchForm.addEventListener("submit", event => {
  event.preventDefault();
  controlSearch();
});
