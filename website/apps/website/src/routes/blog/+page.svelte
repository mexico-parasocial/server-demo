<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { blogPosts } from '$lib/content/blog';
	import { siteUrl, siteName } from '$lib/content/site';

	const featured = blogPosts[0];
	const rest = blogPosts.slice(1);

	const canonical = $derived(`${siteUrl}${page.url.pathname}`);
	const ogImage = $derived(`${siteUrl}/product/social-card-default.png`);
</script>

<svelte:head>
	<title>Blog | {siteName}</title>
	<meta name="description" content="News, updates, and insights from the PARA team." />

	<!-- Open Graph -->
	<meta property="og:title" content="Blog | {siteName}" />
	<meta property="og:description" content="News, updates, and insights from the PARA team." />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:site_name" content={siteName} />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Blog | {siteName}" />
	<meta name="twitter:description" content="News, updates, and insights from the PARA team." />
	<meta name="twitter:image" content={ogImage} />
</svelte:head>

<div class="site-blog">
	<section class="blog-header">
		<div class="container">
			<div class="eyebrow">PARA / writing</div>
			<h1 class="blog-title">Blog</h1>
			<p class="blog-description">
				Technical reports, architectural notes, and product thinking from the team building PARA.
			</p>
		</div>
	</section>

	{#if featured}
		<section class="blog-featured">
			<div class="container">
				<a href={resolve(`/blog/${featured.slug}`)} class="featured-card surface-card">
					<div class="featured-meta">
						<span class="featured-badge">Latest</span>
						<time class="featured-date">{featured.date}</time>
					</div>
					<h2 class="featured-title">{featured.title}</h2>
					<p class="featured-excerpt">{featured.description}</p>
					{#if featured.author}
						<p class="featured-author">By {featured.author}</p>
					{/if}
					{#if featured.readingTime}
						<p class="featured-reading-time">{featured.readingTime} min read</p>
					{/if}
					<span class="path-link">Read article</span>
				</a>
			</div>
		</section>
	{/if}

	<section class="blog-posts">
		<div class="container">
			{#if rest.length > 0}
				<div class="post-grid">
					{#each rest as post (post.slug)}
						<article class="post-card surface-card">
							<a href={resolve(`/blog/${post.slug}`)} class="post-link">
								<div class="post-meta">
									<time class="post-date">{post.date}</time>
									{#if post.author}
										<span class="post-author">{post.author}</span>
									{/if}
									{#if post.readingTime}
										<span class="post-reading-time">{post.readingTime} min read</span>
									{/if}
								</div>
								<h3 class="post-title">{post.title}</h3>
								<p class="post-excerpt">{post.description}</p>
								<span class="path-link">Read</span>
							</a>
						</article>
					{/each}
				</div>
			{:else}
				<div class="empty-state">
					<p>More writing coming soon.</p>
				</div>
			{/if}
		</div>
	</section>
</div>

<style>
	.site-blog {
		padding-bottom: 4rem;
	}

	.container {
		width: min(var(--ps-max-width-docs), calc(100% - 2rem));
		margin: 0 auto;
	}

	.blog-header {
		padding: clamp(2rem, 4vw, 3.5rem) 0 2.5rem;
	}

	.eyebrow {
		width: fit-content;
		font-family: var(--ps-font-mono);
		font-size: 0.76rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: #c8b6ef;
		margin-bottom: 0.9rem;
	}

	.blog-title {
		font-family: 'PARA Cinzel', var(--ps-font-display), serif;
		font-size: clamp(2.8rem, 6vw, 5rem);
		font-weight: 600;
		line-height: 0.94;
		letter-spacing: -0.02em;
		color: #f8fbff;
		margin: 0 0 1rem;
	}

	.blog-description {
		font-size: 1.15rem;
		color: #bcc8d9;
		max-width: 32rem;
		line-height: 1.7;
		margin: 0;
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
		transition:
			transform 0.18s ease,
			border-color 0.18s ease;
	}

	.surface-card:hover {
		transform: translateY(-2px);
		border-color: rgba(255, 255, 255, 0.18);
	}

	.blog-featured {
		padding-bottom: 2.5rem;
	}

	.featured-card {
		display: grid;
		gap: 1rem;
		padding: clamp(1.5rem, 3vw, 2.2rem);
		text-decoration: none;
		color: inherit;
	}

	.featured-meta {
		display: flex;
		align-items: center;
		gap: 0.9rem;
		flex-wrap: wrap;
	}

	.featured-badge {
		padding: 0.4rem 0.75rem;
		border-radius: 999px;
		background: rgba(72, 38, 127, 0.35);
		border: 1px solid rgba(72, 38, 127, 0.5);
		font-family: var(--ps-font-mono);
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: #c8b6ef;
	}

	.featured-date {
		font-family: var(--ps-font-mono);
		font-size: 0.82rem;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: #8f8aa1;
	}

	.featured-title {
		font-family: 'PARA Cinzel', var(--ps-font-display), serif;
		font-size: clamp(1.6rem, 3vw, 2.4rem);
		font-weight: 600;
		line-height: 1.05;
		color: #f8fbff;
		margin: 0.2rem 0 0;
		letter-spacing: -0.01em;
	}

	.featured-excerpt {
		font-size: 1.05rem;
		color: #bcc8d9;
		line-height: 1.7;
		margin: 0;
		max-width: 44rem;
	}

	.featured-author {
		font-family: var(--ps-font-mono);
		font-size: 0.82rem;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: #8f8aa1;
		margin: 0.2rem 0 0;
	}

	.path-link {
		font-weight: 700;
		color: #f6fbff;
		margin-top: 0.5rem;
	}

	.post-grid {
		display: grid;
		grid-template-columns: repeat(12, minmax(0, 1fr));
		gap: 1rem;
	}

	.post-card {
		grid-column: span 6;
		padding: 1.35rem;
	}

	.post-link {
		display: grid;
		gap: 0.75rem;
		text-decoration: none;
		color: inherit;
	}

	.post-meta {
		display: flex;
		align-items: center;
		gap: 0.85rem;
		flex-wrap: wrap;
	}

	.post-date {
		font-family: var(--ps-font-mono);
		font-size: 0.78rem;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: #8f8aa1;
	}

	.post-author {
		font-family: var(--ps-font-mono);
		font-size: 0.78rem;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: #6b6580;
	}

	.post-reading-time {
		font-family: var(--ps-font-mono);
		font-size: 0.78rem;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: #4a4660;
	}

	.featured-reading-time {
		font-family: var(--ps-font-mono);
		font-size: 0.82rem;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: #6b6580;
		margin: 0.2rem 0 0;
	}

	.post-title {
		font-family: 'PARA Cinzel', var(--ps-font-display), serif;
		font-size: 1.35rem;
		font-weight: 600;
		line-height: 1.1;
		color: #f8fbff;
		margin: 0;
		letter-spacing: -0.01em;
		transition: color 0.2s ease;
	}

	.post-card:hover .post-title {
		color: #c8b6ef;
	}

	.post-excerpt {
		font-size: 0.98rem;
		color: #a3adc0;
		line-height: 1.65;
		margin: 0;
	}

	.empty-state {
		padding: 3rem 0;
		text-align: center;
		color: #8f8aa1;
		font-size: 1.1rem;
	}

	@media (max-width: 960px) {
		.container {
			width: min(var(--ps-max-width-docs), calc(100% - 1.25rem));
		}

		.post-card {
			grid-column: span 12;
		}
	}
</style>
