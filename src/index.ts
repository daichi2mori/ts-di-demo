import { Hono } from "hono";
import { type DependencyTypes, diContainer } from "./di-config";
import type { DIContainer } from "./di-container";
import type { PostCreate } from "./post";

type Variables = {
	diContainer: DIContainer<DependencyTypes>;
};

const app = new Hono<{ Variables: Variables }>();

app.use("*", (c, next) => {
	c.set("diContainer", diContainer);
	return next();
});

app.get("/posts/:id", (c) => {
	const di = c.get("diContainer");
	const id = Number.parseInt(c.req.param("id"));

	const postService = di.get("PostService");
	const post = postService.getPost(id);

	return c.json(post);
});

app.post("/", async (c) => {
	const di = c.get("diContainer");
	const request = await c.req.json<PostCreate>();
	const postService = di.get("PostService");
	const post = await postService.createPost(request);
	return c.json(post);
});

export default app;
