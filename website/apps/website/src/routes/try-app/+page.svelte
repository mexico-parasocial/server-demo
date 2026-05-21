<script lang="ts">
	import { resolve } from '$app/paths';
	const appRepoUrl = 'https://github.com/TinoMachino/final';
	const accessPaths = [
		{
			label: `Android`,
			title: `Use the Android app listing`,
			copy: `The simplest path for most people is the Android release distributed through the app-store channel.`
		},
		{
			label: `GitHub`,
			title: `Run the app locally from source`,
			copy: `Use the public repo when you want the actual client code, local setup commands, and full testing control.`
		}
	] as const;
	const runtimeNotes = [
		{
			label: `Recommended defaul`,
			value: `Android app-store distribution for normal app access.`
		},
		{
			label: `Developer path`,
			value: `GitHub repo plus local client and backend runbooks.`
		},
		{
			label: `Workspace spli`,
			value: `Expo client in PARA, backend stack in WhatZatppa, docs site in website.`
		},
		{
			label: `App source repo`,
			value: appRepoUrl
		}
	] as const;
</script>

<svelte:head>
	<title>{`Try App • PARA`}</title>
	<meta
		name="description"
		content={`Find PARA through the Android app distribution path or run the app locally from GitHub.`}
	/>
</svelte:head>

<div class="docs-page try-app-page">
	<section class="try-app-hero">
		<div class="hero-copy">
			<p class="docs-hero-kicker">Try app</p>
			<h1>Use Android first, GitHub second.</h1>
			<p class="try-app-lead">
				
					This page is intentionally simple now: if you want the app, look for the Android build in
					the app-store distribution path. If you want to develop or test deeply, use GitHub and run
					the stack locally.
				
			</p>
			<p class="hero-detail">
				No shared demo links, no seeded tester accounts, and no extra decision tree.
			</p>

			<div class="try-app-cta-row">
				<a class="app-button app-button-accent" href={appRepoUrl} rel="noreferrer" target="_blank">
					View on GitHub
				</a>
			</div>
		</div>

		<div class="hero-panel">
			<div class="hero-panel-card">
				<p class="panel-kicker">Access paths</p>
				<div class="access-path-grid">
					{#each accessPaths as path (path.label)}
						<article class="access-card">
							<p class="access-label">{path.label}</p>
							<h2>{path.title}</h2>
							<p>{path.copy}</p>
						</article>
					{/each}
				</div>
			</div>

			<div class="hero-panel-card hero-meta-card">
				<p class="panel-kicker">Current guidance</p>
				<div class="docs-meta-grid">
					{#each runtimeNotes as note (note.label)}
						<div class="docs-meta-card">
							<span class="docs-meta-label">{note.label}</span>
							<div class="docs-meta-value">
								{#if note.value.startsWith('https://')}
									<code>{note.value}</code>
								{:else}
									{note.value}
								{/if}
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<section class="docs-section-card">
		<p class="docs-section-kicker">Backend path</p>
		<h2>Bring up the backend the way the current runbooks describe it.</h2>
		<p>
			
				The backend development flow in <code>WhatZatppa</code> is the part that expects Docker. This is the short
				path that matches the repo runbook.
			
		</p>

		<pre><code
				>cd /Users/mlv/Desktop/MASTER/WhatZatppa
make nvm-setup
make deps
make build
make run-dev-env</code
			></pre>

		<div class="docs-meta-grid">
			<div class="docs-meta-card">
				<span class="docs-meta-label">PLC</span>
				<div class="docs-meta-value"><code>http://localhost:2582</code></div>
			</div>
			<div class="docs-meta-card">
				<span class="docs-meta-label">PDS</span>
				<div class="docs-meta-value"><code>http://localhost:2583</code></div>
			</div>
			<div class="docs-meta-card">
				<span class="docs-meta-label">AppView</span>
				<div class="docs-meta-value"><code>http://localhost:2584</code></div>
			</div>
		</div>
	</section>

	<section class="docs-section-card">
		<p class="docs-section-kicker">Read next</p>
		<div class="docs-link-grid">
			<a class="docs-link-card" href="/thesis">
				<strong>About</strong>
				<span>Return to the political thesis behind the app and the network model.</span>
			</a>
			<a class="docs-link-card" href={resolve('/trust-and-safety')}>
				<strong>Trust and safety</strong>
				<span
					>See how identity, moderation, verification, and account control shape participation.</span
				>
			</a>
			<a class="docs-link-card" href={resolve('/docs/schemas')}>
				<strong>Schema reference</strong>
				<span>Browse the schema reference and the technical notes behind the product.</span>
			</a>
		</div>
	</section>
</div>

<style>
	h1,
	h2 {
		margin: 0;
	}

	.try-app-page {
		display: grid;
		gap: 1.5rem;
	}

	.try-app-hero {
		display: grid;
		grid-template-columns: minmax(0, 1.05fr) minmax(320px, 0.95fr);
		gap: 1.25rem;
		padding: clamp(1.6rem, 2vw, 2rem);
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 2rem;
		background:
			radial-gradient(circle at top right, rgba(72, 38, 127, 0.24), transparent 36%),
			radial-gradient(circle at bottom left, rgba(157, 133, 209, 0.14), transparent 30%),
			linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.025)),
			rgba(255, 255, 255, 0.02);
		box-shadow:
			inset 0 1px 0 rgba(255, 255, 255, 0.05),
			0 20px 48px rgba(0, 0, 0, 0.34);
	}

	.hero-copy,
	.hero-panel,
	.hero-panel-card {
		display: grid;
		gap: 1rem;
	}

	.hero-copy {
		align-content: start;
	}

	.try-app-page h1 {
		font-family: var(--ps-font-display);
		font-size: clamp(3rem, 6vw, 5.4rem);
		line-height: 0.93;
		letter-spacing: -0.04em;
		color: #ffffff;
		max-width: 10ch;
	}

	.try-app-lead {
		margin: 0;
		max-width: 36rem;
		font-size: 1.12rem;
		line-height: 1.88;
		color: #f2edf9;
	}

	.hero-detail {
		margin: 0;
		color: #d7d2df;
		line-height: 1.84;
	}

	.try-app-cta-row {
		display: flex;
		flex-wrap: wrap;
		gap: 0.85rem;
	}

	.app-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 2.95rem;
		padding: 0.8rem 1.15rem;
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 999px;
		font-weight: 700;
		line-height: 1;
		text-decoration: none;
		transition:
			transform 0.18s ease,
			background 0.18s ease,
			color 0.18s ease,
			border-color 0.18s ease,
			box-shadow 0.18s ease;
	}

	.app-button:hover {
		transform: translateY(-1px);
	}

	.app-button-accent {
		background: rgba(200, 182, 239, 0.12);
		border-color: rgba(200, 182, 239, 0.24);
		color: #f7f2ff;
	}

	.hero-panel-card {
		padding: 1.2rem 1.25rem;
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 1.45rem;
		background:
			linear-gradient(180deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.025)),
			rgba(255, 255, 255, 0.025);
	}

	.hero-meta-card .docs-meta-grid {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	.panel-kicker {
		margin: 0;
		font-size: 0.78rem;
		font-weight: 800;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--para-accent-text);
	}

	.access-path-grid {
		display: grid;
		gap: 0.8rem;
	}

	.access-card {
		padding: 1rem;
		border-radius: 1.1rem;
		background: rgba(255, 255, 255, 0.035);
		border: 1px solid rgba(255, 255, 255, 0.08);
	}

	.access-label {
		margin: 0 0 0.45rem;
		font-size: 0.76rem;
		font-weight: 800;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: #bba4e6;
	}

	.access-card h2 {
		font-size: 1.2rem;
		line-height: 1.1;
	}

	.access-card p {
		margin: 0.55rem 0 0;
		color: #d5d0de;
		line-height: 1.75;
	}

	@media (max-width: 960px) {
		.try-app-hero,
		.hero-meta-card .docs-meta-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
