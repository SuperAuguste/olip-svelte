import sveltePreprocess from "svelte-preprocess";
import fs from "fs";
const pkg = JSON.parse(fs.readFileSync(new URL("package.json", import.meta.url), "utf8"));

/** @type {import("@sveltejs/kit").Config} */
const config = {
	preprocess: [
		sveltePreprocess({
			defaults: {
				style: "scss",
			},
		}),
	],
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: "#svelte",
		vite: () => ({
			ssr: {
				noExternal: Object.keys(pkg.dependencies || {}).filter((pkgName) =>
					pkgName.startsWith("@smui")
				),
			}
		})
	}
};

export default config;
