import type { Post, PostCreate } from "./post";

export interface IPostRepository {
	findPost(id: number): Promise<Post>;
	findAllPost(): Promise<Post[]>;
	createPost(post: PostCreate): Promise<Post>;
}

export class PostRepository implements IPostRepository {
	private readonly apiUrl = "https://jsonplaceholder.typicode.com/posts";

	async findPost(id: number) {
		const response = await fetch(`${this.apiUrl}/${id}`);
		if (!response.ok) {
			throw new Error(`Failed to fetch post with id ${id}`);
		}
		const data = await response.json();
		return data as Post;
	}

	async findAllPost() {
		const response = await fetch(this.apiUrl);
		if (!response.ok) {
			throw new Error("Failed to fetch posts");
		}
		const data = await response.json();
		return data as Post[];
	}

	async createPost(post: PostCreate) {
		const response = await fetch(this.apiUrl, {
			method: "POST",
			body: JSON.stringify(post),
			headers: {
				"Content-Type": "application/json; charset=UTF-8",
			},
		});
		if (!response.ok) {
			throw new Error("Failed to create post");
		}
		const data = await response.json();
		return data as Post;
	}
}
