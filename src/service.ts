import type { Post, PostCreate } from "./post";
import type { IPostRepository } from "./repository";

export interface IPostService {
	getPost(id: number): Promise<Post>;
	getAllPost(): Promise<Post[]>;
	createPost(post: PostCreate): Promise<Post>;
}

export class PostService implements IPostService {
	private postRepository: IPostRepository;

	constructor(postRepository: IPostRepository) {
		this.postRepository = postRepository;
	}

	getPost(id: number) {
		return this.postRepository.findPost(id);
	}

	getAllPost() {
		return this.postRepository.findAllPost();
	}

	createPost(post: PostCreate) {
		return this.postRepository.createPost(post);
	}
}
