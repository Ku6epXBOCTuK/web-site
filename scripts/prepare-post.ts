import * as fs from "node:fs";
import * as path from "node:path";

const TEMPLATES_PATH = "scripts/templates.json";

const CONTENT_DIRS: Record<string, string> = {
	posts: "src/posts",
	projects: "src/projects",
	weekly: "src/weekly",
};

interface Frontmatter {
	[key: string]: string;
}

interface PostMeta {
	type: string;
	slug: string;
	title: string;
	date: string;
	filePath: string;
	socialText: string;
}

interface Template {
	template: string;
	url: string | null;
}

function detectType(filePath: string): string | null {
	for (const [type, dir] of Object.entries(CONTENT_DIRS)) {
		if (filePath.startsWith(dir + "/")) return type;
	}
	return null;
}

function parseFrontmatter(content: string): {
	data: Frontmatter;
	body: string;
} {
	const match = content.match(/^---\n([\s\S]*?)\n---/);
	if (!match) return { data: {}, body: content };

	const raw = match[1];
	const data: Frontmatter = {};
	for (const line of raw.split("\n")) {
		const idx = line.indexOf(":");
		if (idx === -1) continue;
		const key = line.slice(0, idx).trim();
		const val = line.slice(idx + 1).trim();
		data[key] = val;
	}
	return { data, body: content.slice(match[0].length).trim() };
}

function extractTrimmed(body: string): {
	trimmed: string | null;
	hasMore: boolean;
} {
	const moreIdx = body.indexOf("<!--more-->");
	if (moreIdx === -1) return { trimmed: null, hasMore: false };
	return { trimmed: body.slice(0, moreIdx).trim(), hasMore: true };
}

function applyTemplate(template: string, vars: Record<string, string>): string {
	let result = template;
	for (const [key, val] of Object.entries(vars)) {
		result = result.replaceAll(`{${key}}`, val ?? "");
	}
	return result;
}

function main(): void {
	// Input: space-separated file paths from FILES env var
	// Note: paths with spaces will break — currently none exist in content dirs
	const filesRaw = process.env.FILES || "";
	const allMd = filesRaw
		.split(" ")
		.map((s) => s.trim())
		.filter((s) => s.length > 0 && s !== "null");

	const allFiles = [...new Set(allMd.filter((f) => f.endsWith(".md")))].filter(
		(f) => detectType(f) !== null,
	);

	if (allFiles.length === 0) {
		console.log("No content files changed, nothing to do.");
		process.exit(0);
	}

	let templates: Record<string, Template>;
	try {
		templates = JSON.parse(fs.readFileSync(TEMPLATES_PATH, "utf8"));
	} catch {
		console.error(`Templates file not found: ${TEMPLATES_PATH}`);
		process.exit(1);
	}

	const results: PostMeta[] = [];

	for (const filePath of allFiles) {
		const type = detectType(filePath);
		const slug = path.basename(filePath, ".md");
		const tpl = templates[type!];

		if (!tpl) {
			console.warn(`No template for type "${type}", skipping ${filePath}`);
			continue;
		}

		console.log(`Processing [${type}]: ${slug}`);

		const raw = fs.readFileSync(filePath, "utf8");
		const { data, body } = parseFrontmatter(raw);
		const { trimmed, hasMore } = extractTrimmed(body);

		if (!hasMore && type === "posts") {
			console.warn(
				`Warning: no <!--more--> tag found in ${filePath}. Using excerpt from frontmatter.`,
			);
		}

		const excerpt = trimmed || data.excerpt || data.description || "";
		const url = tpl.url
			? applyTemplate(tpl.url, { slug, ...data })
			: data.url || "";

		const socialText = applyTemplate(tpl.template, {
			...data,
			slug,
			excerpt,
			url,
		});

		results.push({
			type: type!,
			slug,
			title: data.title || slug,
			date: data.date || "",
			filePath,
			socialText,
		});
	}

	fs.writeFileSync(".post-meta.json", JSON.stringify(results, null, 2), "utf8");
	console.log(`Prepared ${results.length} item(s).`);
}

main();
