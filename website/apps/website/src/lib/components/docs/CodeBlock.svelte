<script lang="ts">
	/**
	 * CodeBlock — code display with copy-to-clipboard.
	 *
	 * If `highlighted` is provided, renders that HTML directly (server-rendered
	 * Shiki output). Otherwise renders the raw code in a plain <pre>.
	 *
	 * Usage:
	 *   <CodeBlock code={rawCode} highlighted={highlightedHtml} />
	 */
	let {
		code,
		highlighted
	}: {
		code: string;
		highlighted?: string;
	} = $props();

	let copied = $state(false);

	async function copy() {
		await navigator.clipboard.writeText(code);
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}
</script>

<div class="code-block">
	<button type="button" class="copy-btn" class:copied onclick={copy} aria-label="Copy code">
		{#if copied}
			<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
				<polyline points="20 6 9 17 4 12" />
			</svg>
			Copied
		{:else}
			<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
				<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
			</svg>
			Copy
		{/if}
	</button>
	{#if highlighted}
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html highlighted}
	{:else}
		<pre><code>{code}</code></pre>
	{/if}
</div>

<style>
	.code-block {
		position: relative;
		margin: 1.2rem 0;
	}

	.code-block :global(pre) {
		overflow-x: auto;
		padding: 1.15rem 1.2rem;
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 1rem;
		background: #0d1117;
		font-size: 0.9rem;
		line-height: 1.65;
	}

	.code-block :global(pre code) {
		font-family: var(--ps-font-mono);
		background: transparent;
		padding: 0;
		box-shadow: none;
	}

	.copy-btn {
		position: absolute;
		top: 0.6rem;
		right: 0.6rem;
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		padding: 0.35rem 0.65rem;
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 0.55rem;
		background: rgba(255, 255, 255, 0.06);
		color: #a49fb8;
		font-size: 0.75rem;
		font-weight: 600;
		font-family: var(--ps-font-mono);
		cursor: pointer;
		opacity: 0;
		transition: opacity 0.2s ease, background 0.2s ease, color 0.2s ease;
	}

	.code-block:hover .copy-btn {
		opacity: 1;
	}

	.copy-btn:hover {
		background: rgba(255, 255, 255, 0.12);
		color: #ffffff;
	}

	.copy-btn.copied {
		opacity: 1;
		background: rgba(42, 198, 255, 0.12);
		color: #2ac6ff;
		border-color: rgba(42, 198, 255, 0.25);
	}
</style>
