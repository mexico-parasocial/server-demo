<script lang="ts">
	/**
	 * ZoomImage — click-to-expand image with overlay lightbox.
	 *
	 * Usage inside a .svx post with a co-located asset:
	 *   <script>
	 *     import myImage from './my-image.png';
	 *     import { ZoomImage } from '$lib/components/blog';
	 *   <\/script>
	 *
	 *   <ZoomImage src={myImage} alt="Description" />
	 *
	 * Or with a public/static path:
	 *   <ZoomImage src="/product/social-card-default.png" alt="Description" />
	 */

	let {
		src,
		alt = '',
		class: className = ''
	}: {
		src: string;
		alt?: string;
		class?: string;
	} = $props();

	let open = $state(false);

	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') open = false;
	}
</script>

<svelte:window onkeydown={onKeydown} />

<button
	type="button"
	class="zoom-image-trigger {className}"
	onclick={() => (open = true)}
	aria-label="View larger image"
>
	<img {src} {alt} loading="lazy" decoding="async" class="zoom-image-thumb" />
</button>

{#if open}
	<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
	<div class="zoom-image-overlay" onclick={() => (open = false)}>
		<button
			type="button"
			class="zoom-image-close"
			onclick={() => (open = false)}
			aria-label="Close image"
		>
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<line x1="18" y1="6" x2="6" y2="18" />
				<line x1="6" y1="6" x2="18" y2="18" />
			</svg>
		</button>
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<img
			{src}
			{alt}
			class="zoom-image-expanded"
			onclick={(e) => e.stopPropagation()}
		/>
	</div>
{/if}

<style>
	.zoom-image-trigger {
		display: block;
		width: 100%;
		padding: 0;
		margin: 0;
		border: none;
		background: none;
		cursor: zoom-in;
		text-align: center;
	}

	.zoom-image-thumb {
		display: block;
		max-width: 100%;
		height: auto;
		border-radius: 1rem;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
		transition: transform 0.2s ease, box-shadow 0.2s ease;
		margin: 0 !important;
	}

	.zoom-image-trigger:hover img {
		transform: translateY(-2px);
		box-shadow: 0 14px 40px rgba(0, 0, 0, 0.45);
	}

	.zoom-image-overlay {
		position: fixed;
		inset: 0;
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem;
		background: rgba(8, 12, 22, 0.92);
		backdrop-filter: blur(12px);
		cursor: zoom-out;
		animation: fadeIn 0.2s ease;
	}

	@keyframes fadeIn {
		from { opacity: 0; }
		to   { opacity: 1; }
	}

	.zoom-image-close {
		position: absolute;
		top: 1.25rem;
		right: 1.25rem;
		z-index: 101;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2.5rem;
		height: 2.5rem;
		padding: 0;
		border: 1px solid rgba(255, 255, 255, 0.15);
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.08);
		color: #fff;
		cursor: pointer;
		transition: background 0.2s ease;
	}

	.zoom-image-close:hover {
		background: rgba(255, 255, 255, 0.16);
	}

	.zoom-image-expanded {
		max-width: 100%;
		max-height: 90vh;
		width: auto;
		height: auto;
		object-fit: contain;
		border-radius: 1rem;
		cursor: zoom-out;
		animation: scaleIn 0.2s ease;
	}

	@keyframes scaleIn {
		from { transform: scale(0.92); opacity: 0; }
		to   { transform: scale(1); opacity: 1; }
	}
</style>
