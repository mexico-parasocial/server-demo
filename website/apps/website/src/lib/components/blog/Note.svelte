<script lang="ts">
	/**
	 * Note — styled callout box for asides, warnings, and tips.
	 *
	 * Usage inside a .svx post:
	 *   <script>
	 *     import { Note } from '$lib/components/blog';
	 *   <\/script>
	 *
	 *   <Note>
	 *     This is an important aside that stands out from body text.
	 *   </Note>
	 */

	let { children }: { children?: import('svelte').Snippet } = $props();
</script>

<div class="blog-note">
	<svg class="blog-note-icon" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
		<circle cx="8" cy="8" r="7.25" />
		<path d="M8 11.5V7" />
		<circle cx="8" cy="4.5" r="0.5" fill="currentColor" stroke="none" />
	</svg>
	<div class="blog-note-content">
		{#if children}
			{@render children()}
		{/if}
	</div>
</div>

<style>
	.blog-note {
		display: flex;
		gap: 0.85rem;
		margin: 1.5rem 0;
		padding: 1rem 1.15rem;
		border: 1px solid rgba(42, 198, 255, 0.22);
		border-radius: 1rem;
		background: rgba(42, 198, 255, 0.06);
		color: #c8e6f5;
		line-height: 1.7;
	}

	.blog-note-icon {
		flex: none;
		width: 1.1rem;
		height: 1.1rem;
		margin-top: 0.15rem;
		color: #2ac6ff;
	}

	.blog-note-content {
		flex: 1 1 0;
		min-width: 0;
	}

	.blog-note-content :global(p:first-child) {
		margin-top: 0;
	}

	.blog-note-content :global(p:last-child) {
		margin-bottom: 0;
	}

	.blog-note-content :global(p) {
		margin: 0 0 0.6rem;
	}
</style>
