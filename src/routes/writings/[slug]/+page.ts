import { getPost, getPosts } from "$lib/posts";
import { error } from "@sveltejs/kit";

const NOT_FOUND = 404;

export function entries() {
	const posts = getPosts();
	return posts.map((post) => ({
		slug: post.slug,
	}));
}

export function load({ params }: { params: { slug: string } }) {
	const post = getPost(params.slug);

	if (!post) {
		error(NOT_FOUND, "Post not found");
	}

	return {
		meta: post.meta,
		content: post.PostComponent,
	};
}
