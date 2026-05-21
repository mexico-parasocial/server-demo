<script lang="ts">
	import { resolve } from '$app/paths';
	import { contactEmails } from '$lib/content/site';
	const lastUpdated = `May 11, 2026`;
</script>

<svelte:head>
	<title>{`Terms of Service Amendment for Government Users • PARA`}</title>
	<meta
		name="description"
		content={`Additional terms that apply when government entities use PARA in an official capacity.`}
	/>
</svelte:head>

<div class="docs-page legal-page">
	<nav class="legal-breadcrumb" aria-label={`Breadcrumb`}>
		<a href={resolve('/support')}>Support</a>
		<span aria-hidden="true">/</span>
		<span>Government amendment</span>
	</nav>

	<section class="legal-hero">
		<p class="docs-hero-kicker">Legal</p>
		<h1>Terms of Service Amendment for Government Users</h1>
		<p class="legal-note">Last updated: {lastUpdated}</p>
	</section>

	<section class="docs-section-card legal-section">
		<h2>Scope</h2>
		<p>
			
				This amendment applies when a government entity, agency, or instrumentality uses PARA in an
				official capacity. It supplements the PARA
			
			<a href={resolve('/support/terms-of-service')}>Terms of Service</a>
			and <a href={resolve('/support/community-guidelines')}>Community Guidelines</a>.
			Where there is a conflict between this amendment and the general Terms, this amendment governs for government use.
		</p>
	</section>

	<section class="docs-section-card legal-section">
		<h2>Account setup and verification</h2>
		<p>
			
				Government accounts must be clearly labeled as official and must use contact information
				tied to the entity&rsquo;s domain or other verifiable channel. We may request additional
				documentation to confirm status before granting official designations.
			
		</p>
	</section>

	<section class="docs-section-card legal-section">
		<h2>Content and conduct</h2>
		<p>
			
				Government users are expected to follow the same Community Guidelines as all other users.
				Additionally, government accounts may not use PARA to:
			
		</p>
		<ul>
			<li>Spread disinformation or manipulate civic discourse through covert influence operations.</li>
			<li>Target individuals for surveillance or harassment outside lawful process.</li>
			<li>
				
					Suppress lawful speech or misuse reporting systems to remove content that is merely
					critical of the government.
				
			</li>
		</ul>
	</section>

	<section class="docs-section-card legal-section">
		<h2>Data access and legal process</h2>
		<p>
			
				Government requests for user data must follow the legal request channels described on our
			
			<a href={resolve('/support')}>Support</a>
			page. We do not provide bulk or warrantless access to user content. Emergency disclosures are limited to imminent threats of serious harm.
		</p>
	</section>

	<section class="docs-section-card legal-section">
		<h2>Contact</h2>
		<p>
			
				Government entities with questions about this amendment should contact
			
			<a href="mailto:{contactEmails.legal}">{contactEmails.legal}</a>
			before creating official accounts or initiating bulk use.
		</p>
	</section>

	<section class="docs-section-card">
		<p class="docs-section-kicker">Related</p>
		<div class="docs-link-grid">
			<a class="docs-link-card" href={resolve('/support/terms-of-service')}>
				<strong>Terms of service</strong>
				<span>General terms for all users.</span>
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
		font-size: clamp(1.8rem, 3.5vw, 2.6rem);
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
