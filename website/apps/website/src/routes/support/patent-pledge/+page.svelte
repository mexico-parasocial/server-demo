<script lang="ts">
	import { resolve } from '$app/paths';
	import { contactEmails } from '$lib/content/site';

	const lastUpdated = 'May 11, 2026';
</script>

<svelte:head>
	<title>Patent Non-Aggression Pledge • PARA</title>
	<meta
		name="description"
		content="PARA's pledge not to use patents aggressively against users, developers, or the open ecosystem."
	/>
</svelte:head>

<div class="docs-page legal-page">
	<nav class="legal-breadcrumb" aria-label="Breadcrumb">
		<a href={resolve('/support')}>Support</a>
		<span aria-hidden="true">/</span>
		<span>Patent pledge</span>
	</nav>

	<section class="legal-hero">
		<p class="docs-hero-kicker">Legal</p>
		<h1>Patent Non-Aggression Pledge</h1>
		<p class="legal-note">Last updated: {lastUpdated}</p>
	</section>

	<section class="docs-section-card legal-section">
		<h2>Our commitment</h2>
		<p>
			PARA pledges not to initiate patent litigation against anyone for using, modifying, or
			distributing PARA open-source software, protocol implementations, or documentation, so long as
			they do not first assert patents against PARA or its users.
		</p>
	</section>

	<section class="docs-section-card legal-section">
		<h2>Scope</h2>
		<p>This pledge covers:</p>
		<ul>
			<li>
				Use of PARA software and services for any purpose, commercial or non-commercial.
			</li>
			<li>
				Modification and distribution of PARA open-source code under its published licenses.
			</li>
			<li>
				Development of compatible applications, clients, or tools that interoperate with PARA
				infrastructure.
			</li>
		</ul>
	</section>

	<section class="docs-section-card legal-section">
		<h2>Limitations</h2>
		<p>
			This pledge does not extend to parties who first assert patent claims against PARA, its
			contributors, or its users. It also does not waive trademarks, copyrights, or other IP rights.
			The pledge is not a license and does not create any contractual obligation beyond the stated
			commitment.
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
			<a class="docs-link-card" href={resolve('/support/terms-of-service')}>
				<strong>Terms of service</strong>
				<span>Full terms including IP provisions.</span>
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
		font-size: clamp(2rem, 4vw, 3rem);
		line-height: 1.06;
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

	.legal-section p,
	.legal-section ul {
		margin: 0 0 1rem;
		color: #cdc8d8;
		line-height: 1.75;
	}

	.legal-section ul {
		padding-left: 1.25rem;
		display: grid;
		gap: 0.5rem;
	}

	.legal-section a {
		color: var(--para-accent-text);
		font-weight: 600;
	}
</style>
