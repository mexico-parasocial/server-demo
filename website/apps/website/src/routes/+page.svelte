<script lang="ts">
	import { resolve } from '$app/paths';
	import GlobeAnimation from '$lib/components/GlobeAnimation.svelte';
	import { content } from '$lib/content/i18n';
	import { docsBase } from '$lib/content/site';

	const landingFeatures = $derived($content.landingFeatures);
	const landingHeroActions = $derived($content.landingHeroActions);
	const landingHeroMetrics = $derived($content.landingHeroMetrics);
	const landingPillars = $derived($content.landingPillars);
	const heroPrimaryAction = $derived($content.heroPrimaryAction);
	const heroSecondaryAction = $derived($content.heroSecondaryAction);
	const coreFeatures = $derived(landingFeatures.slice(0, 4));
</script>

<svelte:head>
	<title>{`PARA | Civic Product and Docs`}</title>
	<meta
		name="description"
		content={`PARA is a civic social network for plural political identity, policy votes, RAQ flows, and protected participation.`}
	/>
</svelte:head>

<div class="site-home">
	<section class="hero">
		<div class="container hero-grid">
			<div class="hero-copy">
				<div class="eyebrow">PARA • civic social network</div>
				<h1 class="hero-title">Latent Numerical Solidarity</h1>
				<p class="hero-lede">
					
						PARA gives people a clearer way to express policy views, locate themselves politically,
						and participate without collapsing everything into party branding or generic feeds.
					
				</p>
				<div class="hero-actions">
					<a class="button button-primary" href={resolve(heroSecondaryAction.href)}>{heroSecondaryAction.label}</a>
					<a class="button button-secondary" href={resolve(heroPrimaryAction.href)}>{heroPrimaryAction.label}</a>
				</div>
				<div class="metric-row">
					{#each landingHeroMetrics as metric (metric.label)}
						<div class="metric-item">
							<p class="metric-value">{metric.value}</p>
							<p class="metric-label">{metric.label}</p>
						</div>
					{/each}
				</div>
			</div>

			<div class="hero-stage">
				<div class="surface-card stage-card">
					<div class="globe-container">
						<GlobeAnimation lines={38} globeScale={1} textureScale={0.72} />
					</div>
					<div class="glass-orb orb-1"></div>
					<div class="glass-orb orb-2"></div>
				</div>
			</div>
		</div>
	</section>

	<section class="principles">
		<div class="container section-head">
			<div>
				<div class="eyebrow">Three ideas</div>
				<h2 class="section-title">The website only needs to make three claims clearly.</h2>
			</div>
		</div>

		<div class="container principle-grid">
			{#each landingPillars as pillar, index (pillar.title)}
				<article class="surface-card principle-card">
					<p class="card-index">0{index + 1}</p>
					<h3>{pillar.title}</h3>
					<p>{pillar.copy}</p>
				</article>
			{/each}
		</div>
	</section>

	<section class="paths">
		<div class="container section-head">
			<div>
				<div class="eyebrow">Start here</div>
				<h2 class="section-title">Choose the path that matches what you need.</h2>
			</div>
		</div>

		<div class="container path-grid">
			{#each landingHeroActions as action (action.title)}
				<a class="surface-card path-card" href={resolve(action.href)}>
					<p class="card-kicker">{action.eyebrow}</p>
					<h3>{action.title}</h3>
					<p>{action.copy}</p>
					<span class="path-link">Open</span>
				</a>
			{/each}
		</div>
	</section>

	<section class="features" id="features">
		<div class="container section-head">
			<div>
				<div class="eyebrow">Core mechanics</div>
				<h2 class="section-title">Four product ideas do most of the explanatory work.</h2>
			</div>
		</div>

		<div class="container feature-stack">
			{#each coreFeatures as feature, index (feature.title)}
				<article class="surface-card feature-band">
					<div class="feature-band-meta">
						<p class="card-index">0{index + 1}</p>
						<p class="card-kicker">{feature.eyebrow}</p>
					</div>
					<div class="feature-band-copy">
						<h3>{feature.title}</h3>
						<p>{feature.copy}</p>
					</div>
					<div class="feature-band-side">
						<p class="side-label">Why it matters</p>
						<p>{feature.problem}</p>
						<a class="path-link" href={resolve(feature.href)}>{feature.cta}</a>
					</div>
				</article>
			{/each}
		</div>
	</section>

</div>

<style>
	.site-home {
		padding-bottom: 4rem;
	}

	.container {
		width: min(var(--ps-max-width-docs), calc(100% - 2rem));
		margin: 0 auto;
	}

	.hero,
	.principles,
	.paths,
	.features {
		padding-top: 2.5rem;
	}

	.hero-grid,
	.section-head {
		display: grid;
		grid-template-columns: repeat(12, minmax(0, 1fr));
		gap: 1.25rem;
		align-items: start;
	}

	.hero-copy {
		grid-column: span 5;
		display: grid;
		gap: 1rem;
		align-content: start;
		padding-top: 1rem;
	}

	.hero-stage {
		grid-column: span 7;
		display: grid;
		gap: 1rem;
	}

	.eyebrow,
	.card-kicker,
	.side-label {
		width: fit-content;
		font-family: var(--ps-font-mono);
		font-size: 0.76rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	.eyebrow,
	.card-kicker,
	.side-label,
	.metric-label {
		color: #c8b6ef;
	}

	.hero-title,
	.section-title,
	.principle-card h3,
	.path-card h3,
	.feature-band h3 {
		margin: 0;
		font-family: 'PARA Cinzel', var(--ps-font-display), serif;
		letter-spacing: -0.02em;
		color: #f8fbff;
	}

	.hero-title {
		font-size: clamp(3rem, 6vw, 5.5rem);
		line-height: 0.94;
		max-width: 11ch;
	}

	.section-title {
		font-size: clamp(2rem, 4.2vw, 3.6rem);
		line-height: 0.98;
		max-width: 14ch;
	}

	.hero-lede,
	.principle-card p,
	.path-card p,
	.feature-band-copy p,
	.feature-band-side p {
		margin: 0;
		color: #bcc8d9;
		line-height: 1.72;
	}

	.hero-lede {
		max-width: 35rem;
		font-size: 1.12rem;
	}

	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.85rem;
	}

	.button-primary {
		background: linear-gradient(135deg, #48267f, #474652);
		color: #f6f4fa;
		box-shadow: 0 20px 40px rgba(72, 38, 127, 0.24);
	}

	.button-secondary {
		border: 1px solid rgba(255, 255, 255, 0.12);
		background: rgba(72, 38, 127, 0.12);
		color: #eef5ff;
	}

	.metric-row {
		display: flex;
		flex-wrap: wrap;
		gap: 1.25rem;
		padding-top: 0.25rem;
	}

	.metric-item {
		min-width: 8rem;
	}

	.metric-value {
		margin: 0;
		font-family: 'PARA Cinzel', var(--ps-font-display), serif;
		font-size: clamp(1.6rem, 3vw, 2.2rem);
		line-height: 0.95;
		color: #f8fbff;
	}

	.metric-label {
		margin: 0.3rem 0 0;
		font-family: var(--ps-font-mono);
		font-size: 0.72rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.surface-card {
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 1.6rem;
		background:
			linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02)),
			rgba(8, 16, 28, 0.62);
		box-shadow:
			inset 0 1px 0 rgba(255, 255, 255, 0.05),
			0 20px 60px rgba(0, 0, 0, 0.18);
		backdrop-filter: blur(18px);
	}

	.stage-card {
		position: relative;
		overflow: hidden;
		min-height: 34rem;
		padding: 1rem;
		background:
			radial-gradient(circle at top, rgba(72, 38, 127, 0.28), transparent 30%),
			radial-gradient(circle at bottom left, rgba(71, 70, 82, 0.22), transparent 26%),
			linear-gradient(180deg, rgba(12, 23, 40, 0.9), rgba(8, 16, 28, 0.86));
	}

	.globe-container {
		position: relative;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.glass-orb {
		position: absolute;
		border-radius: 999px;
		filter: blur(18px);
		pointer-events: none;
		opacity: 0.45;
	}

	.orb-1 {
		top: 1.75rem;
		right: 1.5rem;
		width: 6.25rem;
		height: 6.25rem;
		background: rgba(99, 102, 241, 0.22);
	}

	.orb-2 {
		bottom: 1.5rem;
		right: 2rem;
		width: 4.5rem;
		height: 4.5rem;
		background: rgba(37, 99, 235, 0.18);
	}

	.globe-container {
		--ps-globe-color: #67c2ff;
		position: absolute;
		inset: 3.75rem 0 0;
		display: flex;
		align-items: center;
		justify-content: center;
		filter: drop-shadow(0 0 70px rgba(72, 38, 127, 0.28));
	}

	:global(.globe-ascii) {
		color: #f2f7ff;
		font-family: var(--ps-font-mono);
		font-weight: 900;
		line-height: 1.08;
		text-shadow: 0 0 18px rgba(72, 38, 127, 0.28);
	}

	.section-head > :first-child {
		grid-column: span 7;
		display: grid;
		gap: 0.9rem;
	}

	.section-head > :last-child {
		grid-column: span 5;
	}

	.principle-grid,
	.path-grid {
		display: grid;
		grid-template-columns: repeat(12, minmax(0, 1fr));
		gap: 1rem;
		margin-top: 1.25rem;
	}

	.principle-card {
		grid-column: span 4;
		padding: 1.3rem;
		display: grid;
		gap: 0.7rem;
	}

	.card-index {
		margin: 0;
		font-family: var(--ps-font-mono);
		font-size: 0.82rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: #8f8aa1;
	}

	.principle-card h3,
	.path-card h3,
	.feature-band h3 {
		font-size: 1.55rem;
		line-height: 0.98;
	}

	.path-card {
		padding: 1.35rem;
		display: grid;
		gap: 0.75rem;
		transition:
			transform 0.18s ease,
			border-color 0.18s ease;
	}

	.path-card:nth-child(1) {
		grid-column: span 6;
	}

	.path-card:nth-child(2),
	.path-card:nth-child(3) {
		grid-column: span 3;
	}

	.path-card:hover,
	.feature-band:hover {
		transform: translateY(-2px);
		border-color: rgba(255, 255, 255, 0.18);
	}

	.path-link {
		font-weight: 700;
		color: #f6fbff;
	}

	.feature-stack {
		display: grid;
		gap: 1rem;
		margin-top: 1.25rem;
	}

	.feature-band {
		display: grid;
		grid-template-columns: 130px minmax(0, 1.25fr) minmax(15rem, 0.8fr);
		gap: 1rem;
		align-items: start;
		padding: 1.25rem;
		transition:
			transform 0.18s ease,
			border-color 0.18s ease;
	}

	.feature-band-meta,
	.feature-band-copy,
	.feature-band-side {
		display: grid;
		gap: 0.55rem;
	}

	.feature-band-side {
		padding-left: 1rem;
		border-left: 1px solid rgba(255, 255, 255, 0.08);
	}

	@media (max-width: 1100px) {
		.hero-grid,
		.section-head,
		.principle-grid,
		.path-grid {
			grid-template-columns: 1fr;
		}

		.hero-copy,
		.hero-stage,
		.section-head > :first-child,
		.section-head > :last-child,
		.principle-card,
		.path-card:nth-child(1),
		.path-card:nth-child(2),
		.path-card:nth-child(3) {
			grid-column: 1 / -1;
		}

		.hero-stage,
		.feature-band {
			grid-template-columns: 1fr;
		}

		.feature-band-side {
			padding-left: 0;
			padding-top: 0.35rem;
			border-left: 0;
			border-top: 1px solid rgba(255, 255, 255, 0.08);
		}
	}

	@media (max-width: 720px) {
		.container {
			width: min(var(--ps-max-width-docs), calc(100% - 1.25rem));
		}

		.hero-title {
			font-size: clamp(2.6rem, 13vw, 4rem);
		}

		.stage-card {
			min-height: 22rem;
		}

		.globe-container {
			inset: 4rem -1rem 0;
		}
	}
</style>
