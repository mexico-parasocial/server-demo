import { createHighlighter } from 'shiki';

let highlighter;
let readyPromise;

export function ensureHighlighter() {
	if (!readyPromise) {
		readyPromise = createHighlighter({
			themes: ['github-dark'],
			langs: ['json', 'typescript', 'javascript', 'bash', 'shell', 'markdown', 'html', 'css', 'yaml', 'svelte']
		}).then((h) => {
			highlighter = h;
		});
	}
	return readyPromise;
}

export function highlightCodeSync(code, lang = 'text') {
	if (!highlighter) {
		console.warn('Shiki not initialized yet');
		return `<pre><code>${escapeHtml(code)}</code></pre>`;
	}
	try {
		return escapeSvelte(highlighter.codeToHtml(code, {
			lang: lang === 'svelte' ? 'html' : lang,
			theme: 'github-dark'
		}));
	} catch {
		return `<pre><code>${escapeHtml(code)}</code></pre>`;
	}
}

function escapeHtml(text) {
	return text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
}

function escapeSvelte(html) {
	return html
		.replace(/\{/g, '&#123;')
		.replace(/\}/g, '&#125;');
}
