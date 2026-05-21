<script lang="ts">
	import { resolve } from '$app/paths';

	type GalleryShot = {
		src: string;
		title: string;
		copy: string;
	};

	type ProductSurface = {
		eyebrow: string;
		title: string;
		route: string;
		copy: string;
		href: string;
	};

	const interfaceShots: GalleryShot[] = [
		{
			src: '/product/value-prop-1.webp',
			title: 'Entry and orientation',
			copy: 'The opening product language is closer to a guided civic app than to an infinite-scroll feed.'
		},
		{
			src: '/product/value-prop-2.webp',
			title: 'Reading and exploration',
			copy: 'The product teaches a reading mode with guided steps and explicit context, not just velocity.'
		},
		{
			src: '/product/value-prop-3.webp',
			title: 'Participation framing',
			copy: 'The app keeps steering users toward civic surfaces, community context, and structured participation.'
		}
	];

	const postShots: GalleryShot[] = [
		{
			src: '/product/bookmarks.webp',
			title: 'Saved and reading layers',
			copy: 'Saved content and highlights support slower political reading instead of just boosting the fastest take.'
		},
		{
			src: '/product/notifications.webp',
			title: 'Post and response loops',
			copy: 'The notification layer keeps the social graph visible, but the product still reads more like a threaded community system than a broadcast timeline.'
		},
		{
			src: '/product/verification-1.png',
			title: 'Identity and civic trust',
			copy: 'Verification and account-legibility surfaces already sit inside the product experience instead of being hidden in a purely backend story.'
		},
		{
			src: '/product/verification-2.png',
			title: 'Profile-adjacent authority',
			copy: 'Trust signals are shown as a product concern, not just as a support concern.'
		}
	];

	const mapExamples = [
		{
			title: 'National political trends',
			route: '/map',
			copy: 'A country-level reading of where policies, parties, or nonants are clustering.'
		},
		{
			title: 'State and local discourse',
			route: '/base, /communities, /my-base',
			copy: 'Filters and local civic entry points should make state and city discourse feel first-class.'
		},
		{
			title: 'Community overlays',
			route: '/communities/profile/:communityId',
			copy: 'Community-specific maps can turn ideological, regional, and issue-based alignment into something spatially legible.'
		}
	];

	const operatingPrinciples = [
		{
			title: 'Orientation before velocity',
			copy: 'The product keeps trying to place the user somewhere: a community, a policy frame, a representative flow, a map view, or a reading context.'
		},
		{
			title: 'Civic structure over generic posting',
			copy: 'Posts exist, but the differentiated product value comes from RAQ, communities, cabildeo, highlights, representatives, and policy surfaces.'
		},
		{
			title: 'Public product, not a hidden protocol demo',
			copy: 'Verification, governance, account role, and trust cues appear in the visible app instead of staying buried in backend-only narratives.'
		}
	] as const;

	const productSurfaces: ProductSurface[] = [
		{
			eyebrow: 'Base',
			title: 'Political starting point',
			route: '/base',
			copy: 'Base is where users narrow civic context through filters, communities, and local political entry points before they drop into a feed.',
			href: '/docs/how-it-works/communities'
		},
		{
			eyebrow: 'RAQ',
			title: 'Ideology as product surface',
			route: '/raq',
			copy: 'RAQ is not background lore. It is a route-level surface for political placement, antagonism, self-reading, and downstream community logic.',
			href: '/docs/how-it-works/raq'
		},
		{
			eyebrow: 'Cabildeo',
			title: 'Deliberation and lobbying',
			route: '/communities/cabildeos/*',
			copy: 'Cabildeo turns public opinion into structured collective argument instead of leaving it as disconnected posts and replies.',
			href: '/docs/how-it-works/cabildeo'
		},
		{
			eyebrow: 'Representatives',
			title: 'Delegation and official presence',
			route: '/representatives',
			copy: 'Representative surfaces make authority, delegation, verification, and office-seeking part of the visible civic experience.',
			href: '/docs/how-it-works/representatives'
		},
		{
			eyebrow: 'Highlights',
			title: 'Reading and memory',
			route: '/highlights',
			copy: 'Highlights and saved-reading flows slow the product down and make political reading cumulative instead of disposable.',
			href: '/docs/how-it-works/highlights'
		},
		{
			eyebrow: 'Map',
			title: 'Geographic political legibility',
			route: '/map',
			copy: 'Map surfaces make clustering, regional trends, and civic distribution spatially legible instead of purely textual.',
			href: '/docs/how-it-works/map-and-discovery'
		},
		{
			eyebrow: 'Identity',
			title: 'm8 — Sovereign identity broker',
			route: '/identity',
			copy: 'm8 is the identity layer underneath PARA: INE verification, zero-knowledge proofs, persona cards, and fine-grained consent for every civic action.',
			href: '/docs/glossary'
		}
	];

	const productLoops = [
		'Verify identity through m8 and choose your civic persona.',
		'Open Base or a community and establish civic context first.',
		'Read through highlights, policy posts, or representative surfaces.',
		'Participate through policy votes, matter framing, comments, or cabildeo.',
		'Return through saved reading, notifications, messages, and community follow-up.'
	] as const;
</script>

<svelte:head>
	<title>Product • PARA Docs</title>
	<meta
		name="description"
		content="Visual product gallery for PARA: interface shots, post surfaces, and map-oriented civic product examples."
	/>
</svelte:head>

<section class="docs-hero-card">
	<p class="docs-hero-kicker">Product</p>
	<h1>See the product before reading the contract.</h1>
	<p>
		PARA reads more like Reddit than X. Communities matter more than a single universal timeline,
		reading matters more than velocity, and the product keeps returning to civic spaces like RAQ,
		cabildeo, maps, highlights, and local participation.
	</p>

	<div class="docs-meta-grid">
		<div class="docs-meta-card">
			<span class="docs-meta-label">Primary feel</span>
			<div class="docs-meta-value">Community-first, threaded, and civic.</div>
		</div>
		<div class="docs-meta-card">
			<span class="docs-meta-label">Closer to</span>
			<div class="docs-meta-value">Reddit-style spaces, archives, and topical participation.</div>
		</div>
		<div class="docs-meta-card">
			<span class="docs-meta-label">Not mainly</span>
			<div class="docs-meta-value">
				A single algorithmic shout-stream optimized for constant broadcast.
			</div>
		</div>
	</div>
</section>

<div class="docs-editorial-block">
	<section class="docs-section-card">
		<p class="docs-section-kicker">Read the product correctly</p>
		<h2>PARA is organized around civic surfaces, not one universal feed.</h2>
		<p>
			The fastest way to misunderstand PARA is to read it like a slightly political version of a
			normal timeline app. The product is closer to a civic operating system with feeds inside it
			than to a feed app that later adds civic features.
		</p>

		<div class="docs-split-grid">
			{#each operatingPrinciples as principle (principle.title)}
				<div class="docs-note-panel product-note-panel">
					<h3>{principle.title}</h3>
					<p>{principle.copy}</p>
				</div>
			{/each}
		</div>
	</section>

	<section class="docs-section-card">
		<p class="docs-section-kicker">Surface map</p>
		<h2>The main product routes already imply a different kind of social app.</h2>
		<p>
			These are not decorative route names. They are the actual surfaces that give the app its civic
			shape and explain why the product feels more like political infrastructure than generic social
			media.
		</p>

		<div class="surface-grid">
			{#each productSurfaces as surface (surface.title)}
				<article class="surface-card">
					<p class="surface-eyebrow">{surface.eyebrow}</p>
					<h3>{surface.title}</h3>
					<p class="surface-route">{surface.route}</p>
					<p>{surface.copy}</p>
					<a class="surface-link" href={surface.href}>Open related docs</a>
				</article>
			{/each}
		</div>
	</section>

	<section class="docs-section-card">
		<p class="docs-section-kicker">Identity and trust</p>
		<h2>m8 is not a settings page. It is the civic trust layer.</h2>
		<p>
			Before a user posts, votes, or joins a cabildeo, m8 answers the question: is this person a
			unique, verified citizen? The identity flow is designed to feel like a civic ritual, not a
			bureaucratic form.
		</p>

		<div class="docs-split-grid">
			<div class="docs-note-panel product-note-panel">
				<h3>Three cards, one vote</h3>
				<p>
					Card 1 (PARA) is the default civic face. Card 2 (Independent) is anonymous and unlinked
					for sensitive posts. Card 3 (Public) is linkable to Bluesky or Mastodon. No matter how
					many cards you use, your central private identity guarantees one vote per policy.
				</p>
			</div>
			<div class="docs-note-panel product-note-panel">
				<h3>Proofs, not data dumps</h3>
				<p>
					When an app asks for your age or eligibility, m8 does not send your CURP or photo. It
					sends a zero-knowledge proof — a cryptographic receipt that says "verified" without
					revealing the underlying document.
				</p>
			</div>
		</div>

		<div class="docs-split-grid">
			<div class="docs-note-panel product-note-panel">
				<h3>Grants you can revoke</h3>
				<p>
					Every app request is a grant. You see exactly what claims the app wants, approve or deny
					in plain language, and revoke the grant at any time. The ledger keeps an audit trail of
					every permission you have ever given.
				</p>
			</div>
			<div class="docs-note-panel product-note-panel">
				<h3>Biometric vault</h3>
				<p>
					Sensitive identity data lives behind Face ID, Touch ID, or device PIN. After 5 minutes
					in the background, the vault auto-locks. The app does not store biometric data — it
					delegates to the device's secure enclave.
				</p>
			</div>
		</div>

		<div class="loop-card">
			<p class="loop-kicker">Identity flow</p>
			<ol class="loop-list">
				<li>Onboarding explains the 3-card limit and the one-vote guarantee.</li>
				<li>INE verification extracts data locally; nothing leaves the device unencrypted.</li>
				<li>The user chooses a public name and receives a verified credential.</li>
				<li>From then on, every civic action carries proof of unique citizenship — not identity.</li>
			</ol>
		</div>
	</section>

	<section class="docs-section-card">
		<p class="docs-section-kicker">UI gallery</p>
		<h2>Interface frames</h2>
		<p>
			These product images come from the PARA app assets already present in the adjacent source
			repo. They are useful because they show the product tone directly instead of forcing the docs
			to describe the UI abstractly.
		</p>

		<div class="product-gallery-grid">
			{#each interfaceShots as shot (shot.src)}
				<article class="gallery-card">
					<div class="gallery-frame">
						<img class="gallery-image" src={shot.src} alt={shot.title} loading="lazy" />
					</div>
					<div class="gallery-copy">
						<h3>{shot.title}</h3>
						<p>{shot.copy}</p>
					</div>
				</article>
			{/each}
		</div>
	</section>

	<section class="docs-section-card">
		<p class="docs-section-kicker">Posts and other stuff</p>
		<h2>Posts, saved content, trust surfaces, and reading loops</h2>
		<p>
			The app does have posts, notifications, and identity surfaces, but they are wrapped in slower
			product patterns like saved reading, civic organization, and follow-up context.
		</p>

		<div class="product-gallery-grid product-gallery-grid-wide">
			{#each postShots as shot (shot.src)}
				<article class="gallery-card">
					<div class="gallery-frame">
						<img class="gallery-image" src={shot.src} alt={shot.title} loading="lazy" />
					</div>
					<div class="gallery-copy">
						<h3>{shot.title}</h3>
						<p>{shot.copy}</p>
					</div>
				</article>
			{/each}
		</div>

		<div class="wide-shot">
			<div class="wide-shot-frame">
				<img src="/product/social-card-default.png" alt="PARA social card surface" loading="lazy" />
			</div>
			<div class="wide-shot-copy">
				<h3>Public social layer</h3>
				<p>
					PARA still has shareable public surfaces, but the product framing is not “post first,
					everything else later.” It is closer to discussion spaces, saved reading, and structured
					context.
				</p>
			</div>
		</div>
	</section>

	<section class="docs-section-card">
		<p class="docs-section-kicker">Why it feels different</p>
		<h2>More like a civic system than a timeline</h2>

		<div class="docs-split-grid">
			<div class="docs-note-panel">
				<h3>Communities are structural</h3>
				<p>
					Communities, community profiles, badges, RAQ subroutes, cabildeo, and local discussion
					make the app feel organized by spaces and belief clusters rather than by one global feed.
				</p>
			</div>
			<div class="docs-note-panel">
				<h3>Reading is slower and more cumulative</h3>
				<p>
					Highlights, bookmarks, policy dashboards, representatives, and RAQ results make PARA feel
					more like a political reading system than a hot-take conveyor belt.
				</p>
			</div>
		</div>

		<div class="loop-card">
			<p class="loop-kicker">Typical flow</p>
			<ol class="loop-list">
				{#each productLoops as loop (loop)}
					<li>{loop}</li>
				{/each}
			</ol>
		</div>
	</section>

	<section class="docs-section-card">
		<p class="docs-section-kicker">Maps</p>
		<h2>Map functionality deserves its own subsection</h2>
		<p>
			The source app already reserves a real <code>/map</code> surface and sits next to local civic
			routing like <code>/base</code>, <code>/my-base</code>, and community profile views. That
			makes geographic political trends part of the product thesis, not just a line in the pitch.
		</p>

		<div class="map-gallery-shell">
			<div class="map-hero-frame">
				<img
					src="/product/social-card-gradient.png"
					alt="PARA map and civic exploration backdrop"
					loading="lazy"
				/>
			</div>
			<div class="map-grid">
				{#each mapExamples as example (example.title)}
					<article class="map-card">
						<p class="map-card-route">{example.route}</p>
						<h3>{example.title}</h3>
						<p>{example.copy}</p>
					</article>
				{/each}
			</div>
		</div>
	</section>

	<section class="docs-section-card">
		<p class="docs-section-kicker">Next step</p>
		<h2>Read the route-level docs after this page.</h2>
		<p>
			This page should make the product legible at a glance. The next layer is route-level
			documentation for how communities, RAQ, cabildeo, representatives, highlights, map flows, and
			messages actually behave.
		</p>

		<div class="docs-link-grid">
			<a class="docs-link-card" href={resolve('/docs/how-it-works')}>
				<strong>How it works</strong>
				<span>Route-level explanation of the civic product surfaces.</span>
			</a>
			<a class="docs-link-card" href={resolve('/docs/status')}>
				<strong>Status</strong>
				<span>See what is implemented, partial, experimental, or thesis-only.</span>
			</a>
			<a class="docs-link-card" href={resolve('/try-app')}>
				<strong>Try app</strong>
				<span
					>Use the Android path for normal access, or GitHub and the local runbook for development.</span
				>
			</a>
		</div>
	</section>
</div>

<style>
	h1,
	h2,
	h3,
	p {
		margin: 0;
	}

	.product-gallery-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1rem;
	}

	.surface-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1rem;
	}

	.product-gallery-grid-wide {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	.gallery-card,
	.wide-shot,
	.map-card,
	.surface-card,
	.loop-card {
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 1.2rem;
		background: rgba(255, 255, 255, 0.035);
		overflow: hidden;
	}

	.gallery-frame,
	.wide-shot-frame,
	.map-hero-frame {
		padding: 0.9rem;
		background:
			linear-gradient(180deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.015)),
			rgba(255, 255, 255, 0.02);
	}

	.gallery-image,
	.wide-shot-frame img,
	.map-hero-frame img {
		display: block;
		width: 100%;
		height: auto;
		border-radius: 0.9rem;
	}

	.gallery-copy,
	.wide-shot-copy,
	.map-card,
	.surface-card,
	.loop-card {
		padding: 1rem 1.05rem 1.1rem;
	}

	.gallery-copy {
		display: grid;
		gap: 0.45rem;
	}

	.surface-card,
	.loop-card {
		display: grid;
		gap: 0.65rem;
		background:
			linear-gradient(180deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02)),
			rgba(255, 255, 255, 0.03);
	}

	.gallery-copy h3,
	.wide-shot-copy h3,
	.map-card h3,
	.surface-card h3 {
		font-size: 1.1rem;
		color: #ffffff;
	}

	.gallery-copy p,
	.wide-shot-copy p,
	.map-card p,
	.surface-card p,
	.loop-list {
		color: #d0cad9;
		line-height: 1.72;
	}

	.product-note-panel {
		background:
			linear-gradient(180deg, rgba(72, 38, 127, 0.14), rgba(46, 32, 51, 0.08)),
			rgba(255, 255, 255, 0.02);
	}

	.surface-eyebrow,
	.loop-kicker {
		font-family: var(--ps-font-mono);
		font-size: 0.78rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--para-accent-text);
	}

	.surface-route {
		font-family: var(--ps-font-mono);
		font-size: 0.84rem;
		color: #f1eaff;
	}

	.surface-link {
		font-weight: 700;
		color: #ffffff;
	}

	.surface-link:hover {
		color: var(--para-accent-text);
	}

	.loop-list {
		margin: 0;
		padding-left: 1.2rem;
		display: grid;
		gap: 0.55rem;
	}

	.wide-shot {
		display: grid;
		grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
		margin-top: 1rem;
	}

	.map-gallery-shell {
		display: grid;
		gap: 1rem;
	}

	.map-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1rem;
	}

	.map-card {
		display: grid;
		gap: 0.55rem;
		min-height: 180px;
		background:
			linear-gradient(180deg, rgba(72, 38, 127, 0.18), rgba(46, 32, 51, 0.34)),
			rgba(255, 255, 255, 0.03);
	}

	.map-card-route {
		font-family: var(--ps-font-mono);
		font-size: 0.8rem;
		letter-spacing: 0.04em;
		color: var(--para-accent-text);
	}

	@media (max-width: 960px) {
		.product-gallery-grid,
		.product-gallery-grid-wide,
		.surface-grid,
		.map-grid,
		.wide-shot {
			grid-template-columns: 1fr;
		}
	}
</style>
