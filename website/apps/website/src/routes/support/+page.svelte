<script lang="ts">
	import { resolve } from '$app/paths';
	import { contactEmails } from '$lib/content/site';
	const policies = [
		{
			href: resolve('/support/community-guidelines'),
			title: `Community Guidelines`,
			description: `Rules for safe, respectful, and authentic participation on PARA.`
		},
		{
			href: resolve('/support/terms-of-service'),
			title: `Terms of Service`,
			description: `Rules for using PARA sites, apps, and related services we operate.`
		},
		{
			href: resolve('/support/terms-of-service-government'),
			title: `Terms of Service Amendment for Government Users`,
			description: `Additional terms that apply when government entities use PARA in an official capacity.`
		},
		{
			href: resolve('/support/privacy'),
			title: `PARA App Privacy Policy`,
			description: `How we handle information for the PARA app and related services we operate.`
		},
		{
			href: resolve('/support/find-friends-privacy'),
			title: `Find Friends Privacy Policy`,
			description: `How contact-matching and friend-discovery features handle your data.`
		},
		{
			href: resolve('/support/protocol-privacy'),
			title: `PARA AT Protocol Network Services Privacy Policy`,
			description: `Privacy practices for protocol and network infrastructure services.`
		},
		{
			href: resolve('/support/copyright'),
			title: `Copyright Policy`,
			description: `Reporting copyright concerns about content shared through PARA.`
		},
		{
			href: resolve('/support/patent-pledge'),
			title: `Patent Non-Aggression Pledge`,
			description: `Our commitment not to use patents aggressively against the open ecosystem.`
		}
	] as const;
</script>

<svelte:head>
	<title>{`Support • PARA`}</title>
	<meta
		name="description"
		content={`Contact PARA for help, read policies and legal information, and find channels for regulatory and law-enforcement requests.`}
	/>
</svelte:head>

<div class="docs-page support-page">
	<section class="support-hero">
		<p class="docs-hero-kicker">Support</p>
		<h1>PARA Support</h1>
		<p class="support-lead">
			If you need help, email us at
			<a class="support-mailto" href="mailto:{contactEmails.support}">{contactEmails.support}</a>
			with a description of your issue and information about how we can help you.
		</p>
	</section>

	<section class="docs-section-card">
		<p class="docs-section-kicker">Policies and legal</p>
		<h2>Documents that govern participation</h2>
		<ul class="support-policy-list">
			{#each policies as item (item.title)}
				<li>
					<a href={item.href}>{item.title}</a>
					<span class="support-policy-desc">{item.description}</span>
				</li>
			{/each}
		</ul>
	</section>

	<section class="docs-section-card">
		<p class="docs-section-kicker">Legal requests</p>
		<h2>Regulatory, official, and other legal contact</h2>
		<p>
			
				Use the channel that matches your role. We handle requests in English unless we agree
				otherwise in writing. Include enough detail for us to locate the relevant material without
				speculative fishing expeditions.
			
		</p>

		<ul class="support-legal-tree">
			<li>
				<strong>Global Regulatory Compliance Reporting Process</strong>
				<span>
					
						For members of the public reporting content under local law or specific regulatory
						frameworks, email
					
					<a href="mailto:{contactEmails.regulatory}">{contactEmails.regulatory}</a>
					with jurisdiction, statutory basis, links or identifiers, and the remedy you seek.
				</span>
			</li>
			<li>
				<strong>Official Requests Portal</strong>
				<span>
					
						Law enforcement, government agencies, regulators, and designated competent authorities
						should use
					
					<a href="mailto:{contactEmails.legal}">{contactEmails.legal}</a>.
					
						Include authority, contact verification, narrow scope, and legal process where
						applicable. We do not operate a separate self-serve portal yet; describe what you need
						in the first message.
					
				</span>
			</li>
			<li>
				<strong>EU Digital Services Act contact</strong>
				<span>
					
						PARA's contact point under Regulation (EU) 2021/784 is
					
					<a href="mailto:{contactEmails.euDsa}">{contactEmails.euDsa}</a>.
					Requests must be made in English.
				</span>
			</li>
			<li>
				<strong>Everything else legal</strong>
				<span>
					
						If your request does not fall within the above three categories, email us at
					
					<a href="mailto:{contactEmails.legal}">{contactEmails.legal}</a>
					with a clear subject line and enough context to route the message.
				</span>
			</li>
		</ul>
	</section>

	<section class="docs-section-card">
		<p class="docs-section-kicker">Also useful</p>
		<div class="docs-link-grid">
			<a class="docs-link-card" href={resolve('/docs')}>
				<strong>Documentation</strong>
				<span>Product and protocol reference for builders and contributors.</span>
			</a>
			<a class="docs-link-card" href={resolve('/trust-and-safety')}>
				<strong>Trust and safety</strong>
				<span>How identity, moderation, verification, and account control work in the product.</span>
			</a>
			<a class="docs-link-card" href={resolve('/try-app')}>
				<strong>Try app</strong>
				<span>Distribution and local setup paths for the client.</span>
			</a>
		</div>
	</section>
</div>

<style>
	.support-page {
		display: grid;
		gap: 1.5rem;
	}

	.support-hero {
		padding: clamp(1.6rem, 2vw, 2.2rem) 0 0.25rem;
		max-width: 40rem;
	}

	.support-hero h1 {
		margin: 0.35rem 0 0.85rem;
		font-family: var(--ps-font-display);
		font-size: clamp(2.2rem, 4.5vw, 3.4rem);
		line-height: 1.05;
		letter-spacing: -0.03em;
		color: #ffffff;
	}

	.support-lead {
		margin: 0 0 1rem;
		color: #d8d2e6;
		line-height: 1.75;
		font-size: 1.05rem;
	}

	.support-mailto {
		font-weight: 700;
		color: var(--para-accent-text);
		text-decoration: underline;
		text-underline-offset: 0.15em;
	}

	.support-policy-list {
		list-style: none;
		margin: 1.25rem 0 0;
		padding: 0;
		display: grid;
		gap: 1rem;
	}

	.support-policy-list li {
		display: grid;
		gap: 0.35rem;
		padding: 1rem 1.1rem;
		border-radius: 1rem;
		border: 1px solid rgba(255, 255, 255, 0.1);
		background: rgba(255, 255, 255, 0.03);
	}

	.support-policy-list a {
		font-weight: 700;
		color: #f4f7ff;
		text-decoration: none;
	}

	.support-policy-list a:hover {
		color: var(--para-accent-text);
	}

	.support-policy-desc {
		color: #b9b3c9;
		line-height: 1.65;
		font-size: 0.95rem;
	}

	.support-legal-tree {
		margin: 1.25rem 0 0;
		padding-left: 1.2rem;
		display: grid;
		gap: 1.15rem;
		color: #cdc8d8;
		line-height: 1.72;
	}

	.support-legal-tree li {
		display: grid;
		gap: 0.4rem;
	}

	.support-legal-tree strong {
		color: #f0f4ff;
	}

	.support-legal-tree a {
		color: var(--para-accent-text);
		font-weight: 600;
	}
</style>
