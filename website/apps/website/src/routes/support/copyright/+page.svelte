<script lang="ts">
	import { resolve } from '$app/paths';
	import { contactEmails } from '$lib/content/site';
</script>

<svelte:head>
	<title>{`Copyright Policy • PARA`}</title>
	<meta
		name="description"
		content={`Copyright policy for PARA—how to report infringement and how we handle takedown requests.`}
	/>
</svelte:head>

<div class="docs-page legal-page">
	<nav class="legal-breadcrumb" aria-label={`Breadcrumb`}>
		<a href={resolve('/support')}>Support</a>
		<span aria-hidden="true">/</span>
		<span>Copyright policy</span>
	</nav>

	<section class="legal-hero">
		<p class="docs-hero-kicker">Legal</p>
		<h1>Copyright policy</h1>
		<p class="legal-note">
			How we handle copyright concerns about content shared through PARA services.
		</p>
	</section>

	<section class="docs-section-card legal-section">
		<h2>Reporting infringement</h2>
		<p>
			If you believe material on PARA infringes your copyright, email
			<a href="mailto:{contactEmails.legal}">{contactEmails.legal}</a>
			with the following information:
		</p>
		<ul>
			<li>Identification of the copyrighted work you claim has been infringed.</li>
			<li>
				Identification of the material you claim is infringing, including enough detail for us to locate
				it (for example, a link or post identifier).
			</li>
			<li>
				A good-faith statement that the use is not authorized by the copyright owner, its agent, or the
				law.
			</li>
			<li>Your contact details.</li>
			<li>
				A statement under penalty of perjury (where required by law) that your notice is accurate and
				that you are the copyright owner or authorized to act on the owner&rsquo;s behalf.
			</li>
		</ul>
		<p>
			We may remove or restrict material consistent with law and policy. We will notify the user who
			posted the material when we act, unless prohibited by law.
		</p>
	</section>

	<section class="docs-section-card legal-section">
		<h2>Counter-notice</h2>
		<p>
			If your material was removed and you believe it was a mistake or misidentification, you may submit
			a counter-notice to
			<a href="mailto:{contactEmails.legal}">{contactEmails.legal}</a>
			with:
		</p>
		<ul>
			<li>Identification of the material that was removed and where it appeared.</li>
			<li>
				A good-faith statement that you believe the material was removed as a result of mistake or
				misidentification.
			</li>
			<li>Your contact details and consent to jurisdiction.</li>
		</ul>
	</section>

	<section class="docs-section-card legal-section">
		<h2>Repeat infringers</h2>
		<p>
			We may suspend or terminate accounts of repeat infringers where appropriate.
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
