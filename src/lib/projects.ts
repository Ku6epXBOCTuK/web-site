interface ProjectModule {
	frontmatter: {
		title: string;
		type: string;
		subtitle: string;
		description: string;
		tags: string;
		image: string;
		url: string;
	};
}

interface Project {
	slug: string;
	name: string;
	url: string;
	type: string;
	subtitle: string;
	description: string;
	tags: string[];
	image: string;
}

const modules = import.meta.glob<ProjectModule>("/src/projects/*.md", {
	eager: true,
});

export function getProjects(): Project[] {
	const projects: Project[] = Object.entries(modules).map(([path, module]) => {
		const slug = path.split("/").pop()?.replace(".md", "") ?? "";
		return {
			slug,
			name: module.frontmatter.title?.replace(/_/g, "-"),
			url: module.frontmatter.url,
			type: module.frontmatter.type,
			subtitle: module.frontmatter.subtitle,
			description: module.frontmatter.description,
			tags: module.frontmatter.tags.split(" ") ?? [],
			image: module.frontmatter.image,
		};
	});
	return projects;
}
