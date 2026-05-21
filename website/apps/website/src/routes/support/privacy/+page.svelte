<script lang="ts">
	import { resolve } from '$app/paths';
	import { contactEmails } from '$lib/content/site';
</script>

<svelte:head>
	<title>{`Privacy Policy • PARA`}</title>
	<meta
		name="description"
		content={`Privacy policy for PARA websites, apps, and related services operated by the project.`}
	/>
</svelte:head>

<div class="docs-page legal-page">
	<nav class="legal-breadcrumb" aria-label={`Breadcrumb`}>
		<a href={resolve('/support')}>Support</a>
		<span aria-hidden="true">/</span>
		<span>Privacy policy</span>
	</nav>

	<section class="legal-hero">
		<p class="docs-hero-kicker">Legal</p>
		<h1>Privacy policy</h1>
		<p class="legal-note">
			
				High-level statement for the public site and PARA services we operate. Federation and
				third-party hosts introduce additional processors; your counsel should review end-to-end
				flows before launch.
			
		</p>
	</section>

	<section class="docs-section-card legal-section">
		<h2>What we may collect</h2>
		<p>
			
				Depending on the surface, we may process account identifiers, content you submit, technical
				logs needed to run the service, and communications you send to support or legal addresses.
				We aim to collect the minimum needed for civic features, safety, and reliability.
			
		</p>
	</section>

	<section class="docs-section-card legal-section">
		<h2>How we use information</h2>
		<p>
			
				We use data to operate and improve the product, enforce policies, comply with law, and
				protect users. Automated decisions, if any, are described in product documentation rather
				than hidden here; refer to the docs for feature-specific behavior.
			
		</p>
	</section>

	<section class="docs-section-card legal-section" id="protocol-and-federation">
		<h2>Protocol and federation</h2>
		<p>
			
				PARA is designed around open, AT Protocol–style civic infrastructure. Federating or
				bridging data to other services may mean additional copies of public material exist outside
				our direct control. Use the schema and architecture docs to understand what is replicated
				where.
			
		</p>
	</section>

	<section class="docs-section-card legal-section">
		<h2>Retention and deletion</h2>
		<p>
			
				We retain information as long as needed to operate the service and meet legal obligations.
				You can request deletion or export help through
			
			<a href="mailto:{contactEmails.support}">{contactEmails.support}</a>;
			we will respond when staffing allows and when your request is verifiable.
		</p>
	</section>

	<section class="docs-section-card legal-section">
		<h2>Contact</h2>
		<p>
			Questions about this policy:
			<a href="mailto:{contactEmails.legal}">{contactEmails.legal}</a>.
		</p>
	</section>

	<section class="docs-section-card">
		<p class="docs-section-kicker">Related</p>
		<div class="docs-link-grid">
			<a class="docs-link-card" href={resolve('/support/terms-of-service')}>
				<strong>Terms of service</strong>
				<span>Rules for using hosted PARA services.</span>
			</a>
			<a class="docs-link-card" href={resolve('/trust-and-safety')}>
				<strong>Trust and safety</strong>
				<span>Safety model and user-facing controls.</span>
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
