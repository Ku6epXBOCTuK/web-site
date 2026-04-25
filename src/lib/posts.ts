import type { Component } from "svelte";

export interface PostModule {
	default: Component;
	frontmatter: {
		title: string;
		date: string;
		excerpt: string;
		tag: string;
	};
}

export interface Post {
	slug: string;
	title: string;
	date: string;
	excerpt: string;
	tags: string[];
}

const modules = import.meta.glob<PostModule>("/src/posts/*.md", {
	eager: true,
});

export function getPosts(): Post[] {
	return Object.entries(modules).map(([path, module]) => {
		const slug = path.split("/").pop()?.replace(".md", "") ?? "";
		return {
			slug,
			title: module.frontmatter.title?.replace(/_/g, "-"),
			date: module.frontmatter.date,
			excerpt: module.frontmatter.excerpt,
			tags: module.frontmatter.tag.split(" ") ?? [],
		};
	});
}

export function getPost(slug: string) {
	const posts = Object.entries(modules);
	const postEntry = posts.find(([path]) => {
		return path.split("/").pop()?.replace(".md", "") === slug;
	});

	if (!postEntry) return undefined;

	const module = postEntry[1];

	return {
		PostComponent: module.default,
		meta: module.frontmatter,
	};
}
