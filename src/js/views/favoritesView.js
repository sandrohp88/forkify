import { UIElements } from './domObjects';
import { limitRecipeTitle } from './searchView';
export const toggleFavoriteBtn = isLiked => {
	// <use href="img/icons.svg#icon-heart-outlined"></use>
	const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
	document
		.querySelector('.recipe__love use')
		.setAttribute('href', `img/icons.svg#${iconString}`);
};
export const toggleFavoriteMenu = numFavorites => {
	UIElements.favoriteMenu.style.visibility =
		numFavorites > 0 ? 'visible' : 'hidden';
};
export const renderFavorite = like => {
	const markup = `
        <li>
            <a class="likes__link" href="#${like.id}">
                <figure class="likes__fig">
                    <img src="${like.img}" alt="Test">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${limitRecipeTitle(like.title)}</h4>
                    <p class="likes__author">${like.author}</p>
                </div>
            </a>
        </li>
 `;
	UIElements.favoriteList.insertAdjacentHTML('beforeend', markup);
};

export const deleteFavorite = id => {
	console.log('id:', id);
	const element = document.querySelector(`.likes__link[href*="${id}"]`)
		.parentElement;
	console.log(element);
	if (element) {
		element.parentElement.removeChild(element);
	}
};
