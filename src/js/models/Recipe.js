import axios from 'axios';
import { proxy, key, food2ForkGet } from '../../config';

export default class Recipe {
	constructor(id) {
		this.id = id;
	}

	async getRecipe() {
		try {
			const response = await axios(
				`${proxy}${food2ForkGet}key=${key}&rId=${this.id}`
			);
			this.title = response.data.recipe.title;
			this.author = response.data.recipe.publisher;
			this.img = response.data.recipe.image_url;
			this.url = response.data.recipe.source_url;
			this.ingredients = response.data.recipe.ingredients;
		} catch (error) {
			alert(error);
		}
	}

	calculateTime() {
		// Assuming that we need 15 min for each 3 ingredients
		const numIng = this.ingredients.length;
		const periods = Math.ceil(numIng / 3);
		this.time = periods * 15;
	}

	calculateServings() {
		this.servings = 4;
	}

	parseIngredients() {
		const newIngredients = this.ingredients.map(currentIngredient => {
			const unitsLong = [
				'tablespoons',
				'tablespoon',
				'ounces',
				'ounce',
				'teaspoons',
				'teaspoon',
				'cups',
				'pounds'
			];
			const unitsShort = [
				'tbsp',
				'tbsp',
				'oz',
				'oz',
				'tsp',
				'tsp',
				'cup',
				'pound'
			];

			// Uniform units
			let ingredient = currentIngredient.toLowerCase();

			unitsLong.forEach((unit, i) => {
				ingredient = ingredient.replace(unit, unitsShort[i]);
			});
			// Remove parentheses
			ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

			// Parse Ingredients into count, unit and ingredient
			const arrayIngredient = ingredient.split(' ');
			const unitIndex = arrayIngredient.findIndex(current =>
				unitsShort.includes(current)
			);
			let objIngredient;
			if (unitIndex > -1) {
				// There is a unit
				// Ex. 3 1/2 cups, arrayCount is [4,1/2] eval("4+1/2") = 4.5
				// Ex. 4 cups, arrayCount is [4]
				const arrayCount = arrayIngredient.slice(0, unitIndex);

				let count;
				if (arrayCount === 1) {
					count = eval(arrayIngredient[0].replace('-', '+'));
				} else {
					count = eval(arrayIngredient.slice(0, unitIndex).join('+'));
				}
				objIngredient = {
					count,
					unit: arrayIngredient[unitIndex],
					ingredient: arrayIngredient.slice(1).join(' ')
				};
			} else if (parseInt(arrayIngredient[0])) {
				// There is no unit but first element it's a number
				objIngredient = {
					count: parseInt(arrayIngredient[0]),
					unit: '',
					ingredient: arrayIngredient.slice(1).join(' ')
				};
			} else if (unitIndex === -1) {
				// There is no unit and no number in first position
				objIngredient = {
					count: 1,
					unit: '',
					ingredient
				};
			}
			console.log(objIngredient);
			return objIngredient;
		});
		this.ingredients = newIngredients;
	}
}
