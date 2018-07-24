import uniqid from 'uniqid';
export default class ShoppingList {
	constructor() {
		this.items = [];
	}

	addItem(count, unit, ingredient) {
		const item = {
			id: uniqid(),
			count,
			unit,
			ingredient
		};
		this.items.push(item);
		return item;
	}

	deleteItem(id) {
		const index = this.items.findIndex(item => item.id === id);
		//[2,4,8] --> splice(1,1) --> [2,8]
		// return 4 and change the original array by deleting elements
		this.items.splice(index, 1);
	}

	updateCount(id, newCount) {
		this.items.find(item => item.id === id).count = newCount;
	}
}
