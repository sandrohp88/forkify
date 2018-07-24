export const UIElements = {
	searchInput: document.querySelector('.search__field'),
	searchForm: document.querySelector('.search'),
	recipesList: document.querySelector('.results__list'),
	result: document.querySelector('.results'),
	resultPages: document.querySelector('.results__pages'),
	resultsLink: document.querySelector('.results__link'),
	recipe: document.querySelector('.recipe'),
	shoppingList: document.querySelector('.shopping__list')
};

const domStrings = {
	loader: 'loader'
};
export const renderSpinner = parent => {
	const markup = `
    <div class="${domStrings.loader}">
        <svg>
            <use href="img/icons.svg#icon-cw"></use>
        </svg>
    </div>
`;
	parent.insertAdjacentHTML('afterbegin', markup);
};

export const removeSpinner = () => {
	const spinner = document.querySelector(`.${domStrings.loader}`);
	if (spinner) {
		spinner.parentElement.removeChild(spinner);
	}
};
