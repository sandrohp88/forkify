import { UIElements } from './domObjects';
export const getSearchInput = () => UIElements.searchInput.value;
const limitRecipeTitle = (title, limit = 17) => {
	const titleWords = title.split(' ');
	let newTitle = '';
	titleWords.reduce((accumulator, currentTitle) => {
		if (currentTitle.length + accumulator <= limit) {
			newTitle += currentTitle + ' ';
		}
		return accumulator + newTitle.length;
	}, 0);
	return newTitle + '...';
};

export const highlitSelectect = id => {
	const arrayRe = document.querySelectorAll('.results__link');
	arrayRe.forEach(currentElement =>
		currentElement.classList.remove('results__link--active')
	);
	document
		.querySelector(`a[href="#${id}"]`)
		.classList.add('results__link--active');
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
	UIElements.recipesList.insertAdjacentHTML('beforeend', markup);
};
export const clearInput = () => {
	UIElements.searchInput.value = '';
};
export const clearRecipesList = () => {
	UIElements.recipesList.innerHTML = '';
	UIElements.resultPages.innerHTML = '';
};
// Type can be prev or next
const createButton = (page, type) => ` 
<button class="btn-inline results__btn--${type}" data-goto=${
	type === 'next' ? page + 1 : page - 1
}">
    <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-${
	type === 'next' ? 'right' : 'left'
}"></use>
    </svg>
    <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
</button>
`;
const renderButtons = (page, numberOfPages) => {
	let button;
	if (page === 1 && numberOfPages > 1) {
		// Display only next button
		button = createButton(page, 'next');
	} else if (page < numberOfPages) {
		// Display both buttons
		button = `${createButton(page, 'next')}${createButton(page, 'prev')}`;
	} else if (page === numberOfPages && numberOfPages > 1) {
		// Display only previous button
		button = createButton(page, 'prev');
	}
	UIElements.resultPages.insertAdjacentHTML('afterbegin', button);
};
export const renderRecipes = (recipes, page = 1, recipesPerPage = 10) => {
	const start = (page - 1) * recipesPerPage;
	const end = page * recipesPerPage;
	const numberOfPages = Math.ceil(recipes.length / recipesPerPage);
	recipes.slice(start, end).forEach(element => {
		// console.log(element);
		renderRecipe(element);
	});
	renderButtons(page, numberOfPages);
};
