<script lang="ts">
	import { resolve } from '$app/paths';
	import { contactEmails } from '$lib/content/site';

	const lastUpdated = 'May 11, 2026';
</script>

<svelte:head>
	<title>AT Protocol Network Services Privacy Policy • PARA</title>
	<meta
		name="description"
		content="Privacy practices for PARA protocol and network infrastructure services."
	/>
</svelte:head>

<div class="docs-page legal-page">
	<nav class="legal-breadcrumb" aria-label="Breadcrumb">
		<a href={resolve('/support')}>Support</a>
		<span aria-hidden="true">/</span>
		<span>Protocol privacy</span>
	</nav>

	<section class="legal-hero">
		<p class="docs-hero-kicker">Legal</p>
		<h1>PARA AT Protocol Network Services Privacy Policy</h1>
		<p class="legal-note">Last updated: {lastUpdated}</p>
	</section>

	<section class="docs-section-card legal-section">
		<h2>What this covers</h2>
		<p>
			This policy describes how PARA handles data for protocol-level infrastructure services—such as
			relays, identity resolution, and repository sync—that support the open network. It supplements
			the main <a href={resolve('/support/privacy')}>Privacy Policy</a>.
		</p>
	</section>

	<section class="docs-section-card legal-section">
		<h2>Public data</h2>
		<p>
			AT Protocol–style infrastructure is designed around public repositories. Most content you post
			through PARA is public by default and may be replicated by other services on the network. We do
			not control how third-party applications index, display, or retain public data.
		</p>
	</section>

	<section class="docs-section-card legal-section">
		<h2>Technical logs</h2>
		<p>
			We retain minimal technical logs needed to operate infrastructure—such as request metadata,
			error rates, and abuse signals. These logs are not used for advertising profiling.
		</p>
	</section>

	<section class="docs-section-card legal-section">
		<h2>Federation</h2>
		<p>
			When data is federated to other services, those services operate under their own privacy policies.
			We encourage you to review the policies of any third-party application you use.
		</p>
	</section>

	<section class="docs-section-card legal-section">
		<h2>Contact</h2>
		<p>
			Questions:
			<a href="mailto:{contactEmails.legal}">{contactEmails.legal}</a>.
		</p>
	</section>

	<section class="docs-section-card">
		<p class="docs-section-kicker">Related</p>
		<div class="docs-link-grid">
			<a class="docs-link-card" href={resolve('/support/privacy')}>
				<strong>Privacy policy</strong>
				<span>Main privacy statement.</span>
			</a>
			<a class="docs-link-card" href={resolve('/docs')}>
				<strong>Documentation</strong>
				<span>Protocol and architecture reference.</span>
			</a>
			<a class="docs-link-card" href={resolve('/support')}>
				<strong>Support</strong>
				<span>Help and legal routing.</span>
			</a>
		</div>
	</section>
</div>

<style>
	.legal-page {
		display: grid;
		gap: 1.5rem;
	}

	.legal-breadcrumb {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.45rem;
		font-size: 0.88rem;
		font-weight: 600;
		color: #9aa7bd;
		padding-top: 0.5rem;
	}

	.legal-breadcrumb a {
		color: var(--para-accent-text);
		text-decoration: none;
	}

	.legal-breadcrumb a:hover {
		text-decoration: underline;
	}

	.legal-hero {
		padding-top: clamp(1.6rem, 2vw, 2.2rem);
		max-width: 42rem;
	}

	.legal-hero h1 {
		margin: 0.35rem 0 0.75rem;
		font-family: var(--ps-font-display);
		font-size: clamp(1.7rem, 3.5vw, 2.5rem);
		line-height: 1.08;
		letter-spacing: -0.03em;
		color: #ffffff;
	}

	.legal-note {
		margin: 0;
		color: #b2a8c4;
		line-height: 1.65;
		font-size: 0.95rem;
	}

	.legal-section h2 {
		margin: 0 0 0.65rem;
		font-family: var(--ps-font-display);
		font-size: 1.35rem;
		color: #ffffff;
	}

	.legal-section p {
		margin: 0;
		color: #cdc8d8;
		line-height: 1.75;
	}

	.legal-section a {
		color: var(--para-accent-text);
		font-weight: 600;
	}
</style>
