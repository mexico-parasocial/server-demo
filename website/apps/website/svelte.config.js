import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
import { ensureHighlighter, highlightCodeSync } from './src/lib/shiki.js';

await ensureHighlighter();

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	highlight: {
		highlighter: (code, lang = 'text') => highlightCodeSync(code, lang)
	},
	rehypePlugins: [rehypeExternalLinks, rehypeSlug]
};

/** Turns external links into `target="_blank" rel="noopener noreferrer"`. */
function rehypeExternalLinks() {
	return (tree) => {
		function walk(node) {
			if (node.type === 'element' && node.tagName === 'a') {
				const href = node.properties?.href;
				if (typeof href === 'string' && /^https?:\/\//.test(href)) {
					node.properties.target = '_blank';
					node.properties.rel = ['noopener', 'noreferrer'];
				}
			}
			if (Array.isArray(node.children)) {
				for (const child of node.children) walk(child);
			}
		}
		walk(tree);
	};
}

/** Adds slugified `id` attributes to h2/h3 headings. */
function rehypeSlug() {
	return (tree) => {
		const slugCounts = new Map();
		function extractText(node) {
			if (node.type === 'text') return node.value;
			if (Array.isArray(node.children)) {
				return node.children.map(extractText).join('');
			}
			return '';
		}
		function walk(node) {
			if (node.type === 'element' && (node.tagName === 'h2' || node.tagName === 'h3')) {
				const text = extractText(node);
				let slug = text
					.toLowerCase()
					.replace(/[^\w\s-]/g, '')
					.trim()
					.replace(/\s+/g, '-');
				if (!slug) slug = 'heading';
				const count = slugCounts.get(slug) || 0;
				slugCounts.set(slug, count + 1);
				if (count > 0) slug = `${slug}-${count}`;
				node.properties = node.properties || {};
				node.properties.id = slug;
			}
			if (Array.isArray(node.children)) {
				for (const child of node.children) walk(child);
			}
		}
		walk(tree);
	};
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		paths: { relative: false }
	},
	vitePlugin: {
		dynamicCompileOptions: ({ filename }) =>
			filename.includes('node_modules') ? undefined : { runes: true }
	},
	preprocess: [mdsvex(mdsvexOptions)],
	extensions: ['.svelte', '.svx']
};

export default config;
