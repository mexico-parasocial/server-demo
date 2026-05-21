<script lang="ts">
	import { resolve } from '$app/paths';
	import { contactEmails } from '$lib/content/site';

	const lastUpdated = 'May 11, 2026';
</script>

<svelte:head>
	<title>Find Friends Privacy Policy • PARA</title>
	<meta
		name="description"
		content="How PARA's find-friends and contact-matching features handle your data."
	/>
</svelte:head>

<div class="docs-page legal-page">
	<nav class="legal-breadcrumb" aria-label="Breadcrumb">
		<a href={resolve('/support')}>Support</a>
		<span aria-hidden="true">/</span>
		<span>Find friends privacy</span>
	</nav>

	<section class="legal-hero">
		<p class="docs-hero-kicker">Legal</p>
		<h1>Find Friends Privacy Policy</h1>
		<p class="legal-note">Last updated: {lastUpdated}</p>
	</section>

	<section class="docs-section-card legal-section">
		<h2>What this covers</h2>
		<p>
			This policy describes how PARA handles address-book and contact-matching data when you choose to
			use find-friends features. It supplements the main <a href={resolve('/support/privacy')}>Privacy Policy</a>.
		</p>
	</section>

	<section class="docs-section-card legal-section">
		<h2>What we collect</h2>
		<p>
			If you opt in to contact matching, we may process hashed or encrypted representations of contacts
			from your device address book solely to suggest connections. We do not store raw contact details
			longer than necessary to perform the match.
		</p>
	</section>

	<section class="docs-section-card legal-section">
		<h2>How we use it</h2>
		<p>
			Contact data is used only to generate suggestions. We do not sell contact information, use it for
			advertising, or share it with third parties outside the matching operation.
		</p>
	</section>

	<section class="docs-section-card legal-section">
		<h2>Your control</h2>
		<p>
			You can revoke contact-matching permission at any time through product settings. Revocation stops
			future matching and triggers deletion of stored match data where technically feasible.
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
