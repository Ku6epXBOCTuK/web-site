import adapter from "@sveltejs/adapter-static";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: [".svelte", ".md"],
	kit: {
		adapter: adapter(),
		alias: {
			$cmp: "src/components",
		},
	},
	compilerOptions: { runes: true },
};

export default config;
