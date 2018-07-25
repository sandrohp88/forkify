export default class Favorites {
	constructor() {
		this.likes = [];
	}

	addFavorite(id, title, img, author) {
		const like = {
			id,
			title,
			img,
			author
		};
		this.likes.push(like);
		// Persistent data in localStorage
		this.persistData();
		return like;
	}
	deleteFavorite(id) {
		const index = this.likes.find(like => like.id === id);
		// Persistent data in localStorage
		this.persistData();
		this.likes.splice(index, 1);
	}

	isLiked(id) {
		const index = this.likes.find(like => like.id === id);
		return index !== undefined;
	}

	getNumbersOfLikes() {
		return this.likes.length;
	}

	persistData() {
		localStorage.setItem('likes', JSON.stringify(this.likes));
	}

	readPersistenData() {
		const storage = JSON.parse(localStorage.getItem('likes'));
		if (storage) {
			// Restore likes from localStorage
			this.likes = storage;
		}
	}
}
