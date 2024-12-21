export class Post {
	constructor(
		public userId: number,
		public id: number,
		public title: string,
		public body: string,
	) {}
}

export class PostCreate {
	constructor(
		public title: string,
		public body: string,
		public userId: number,
	) {}
}
