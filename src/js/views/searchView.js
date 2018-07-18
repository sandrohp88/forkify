import { UIElements } from "./domObjects";
export const getSearchInput = () => UIElements.searchInput.value;
const limitRecipeTitle = (title, limit = 17) => {
  const titleWords = title.split(" ");
  let newTitle = "";
  titleWords.reduce((accumulator, currentTitle) => {
    if (currentTitle.length + accumulator <= limit) {
      newTitle += currentTitle + " ";
    }
    return accumulator + newTitle.length;
  }, 0);
  return newTitle + "...";
};
const renderRecipe = recipe => {
  const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${limitRecipeTitle(
    recipe.title
  )}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(
                      recipe.title
                    )}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;
  UIElements.recipesList.insertAdjacentHTML("beforeend", markup);
};
export const clearInput = () => {
  UIElements.searchInput.value = "";
};
export const clearRecipesList = () => {
  UIElements.recipesList.innerHTML = "";
};
export const renderRecipes = recipes => {
  recipes.forEach(element => {
    // console.log(element);
    renderRecipe(element);
  });
};
