import { DIContainer } from "./di-container";
import { type IPostRepository, PostRepository } from "./repository";
import { type IPostService, PostService } from "./service";

export interface DependencyTypes {
	PostService: IPostService;
	PostRepository: IPostRepository;
}

export const diContainer = new DIContainer<DependencyTypes>();

// Register repositories
diContainer.register("PostRepository", PostRepository);

// Register services
diContainer.register(
	"PostService",
	PostService,
	diContainer.get("PostRepository"),
);
