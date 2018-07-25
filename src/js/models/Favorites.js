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

		return like;
	}
	deleteFavorite(id) {
		const index = this.likes.find(like => like.id === id);
		this.likes.splice(index, 1);
	}

	isLiked(id) {
		const index = this.likes.find(like => like.id === id);
		return index !== undefined;
	}

	getNymbersOfLikes() {
		return this.likes.length;
	}
}
