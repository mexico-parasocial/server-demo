<script lang="ts">
	/**
	 * Toc — auto-generated table of contents from page headings.
	 *
	 * Reads h2/h3 elements inside `.docs-prose` and builds a sticky
	 * sidebar with scroll-spy highlighting via IntersectionObserver.
	 */
	import { onMount } from 'svelte';

	interface TocItem {
		id: string;
		text: string;
		level: number;
	}

	let items = $state<TocItem[]>([]);
	let activeId = $state<string>('');

	function refresh() {
		if (typeof document === 'undefined') return;
		const prose = document.querySelector('.docs-prose');
		if (!prose) return;

		const headings = prose.querySelectorAll('h2, h3');
		items = Array.from(headings).map((h) => {
			const el = h as HTMLElement;
			// Ensure every heading has an id
			if (!el.id) {
				el.id = slugify(el.textContent || '');
			}
			return {
				id: el.id,
				text: el.textContent || '',
				level: el.tagName === 'H2' ? 2 : 3
			};
		});
	}

	function slugify(text: string): string {
		return text
			.toLowerCase()
			.replace(/[^\w\s-]/g, '')
			.trim()
			.replace(/\s+/g, '-');
	}

	onMount(() => {
		refresh();

		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((e) => e.isIntersecting)
					.map((e) => e.target.id);
				if (visible.length > 0) {
					activeId = visible[0];
				}
			},
			{ rootMargin: '-80px 0px -60% 0px', threshold: 0 }
		);

		const prose = document.querySelector('.docs-prose');
		if (prose) {
			prose.querySelectorAll('h2, h3').forEach((h) => observer.observe(h));
		}

		return () => observer.disconnect();
	});

	function scrollTo(id: string) {
		const el = document.getElementById(id);
		if (el) {
			el.scrollIntoView({ behavior: 'smooth', block: 'start' });
			history.replaceState(null, '', `#${id}`);
		}
	}
</script>

{#if items.length > 0}
	<nav class="toc" aria-label="On this page">
		<p class="toc-title">On this page</p>
		<ul class="toc-list">
			{#each items as item (item.id)}
				<li class="toc-item" data-level={item.level}>
					<button
						type="button"
						class="toc-link"
						class:active={activeId === item.id}
						onclick={() => scrollTo(item.id)}
					>
						{item.text}
					</button>
				</li>
			{/each}
		</ul>
	</nav>
{/if}

<style>
	.toc {
		position: sticky;
		top: 5.4rem;
		align-self: start;
		padding: 1.2rem 0;
		max-height: calc(100vh - 6rem);
		overflow-y: auto;
	}

	.toc-title {
		margin: 0 0 0.85rem;
		font-size: 0.78rem;
		font-weight: 800;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: #918ba0;
	}

	.toc-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 0.35rem;
	}

	.toc-item[data-level='3'] {
		padding-left: 0.9rem;
	}

	.toc-link {
		display: block;
		width: 100%;
		text-align: left;
		padding: 0.35rem 0.6rem;
		border: none;
		border-radius: 0.6rem;
		background: none;
		font-size: 0.85rem;
		font-weight: 500;
		color: #a49fb8;
		line-height: 1.45;
		cursor: pointer;
		transition: color 0.15s ease, background 0.15s ease;
	}

	.toc-link:hover {
		color: #e8e5f0;
		background: rgba(255, 255, 255, 0.05);
	}

	.toc-link.active {
		color: #2ac6ff;
		background: rgba(42, 198, 255, 0.08);
	}

	@media (max-width: 1200px) {
		.toc {
			display: none;
		}
	}
</style>
