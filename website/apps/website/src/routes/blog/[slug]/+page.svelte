<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import type { PageData } from './$types';
	import { siteUrl, siteName } from '$lib/content/site';

	let { data }: { data: PageData } = $props();
	const Post = $derived(data.component);

	const canonical = $derived(`${siteUrl}${page.url.pathname}`);
	const ogImage = $derived(`${siteUrl}/product/social-card-default.png`);
</script>

<svelte:head>
	<title>{data.metadata.title} | Blog | {siteName}</title>
	<meta name="description" content={data.metadata.description} />

	<!-- Open Graph -->
	<meta property="og:title" content={data.metadata.title} />
	<meta property="og:description" content={data.metadata.description} />
	<meta property="og:type" content="article" />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:site_name" content={siteName} />
	<meta property="article:published_time" content={new Date(data.metadata.date).toISOString()} />
	{#if data.metadata.author}
		<meta property="article:author" content={data.metadata.author} />
	{/if}

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={data.metadata.title} />
	<meta name="twitter:description" content={data.metadata.description} />
	<meta name="twitter:image" content={ogImage} />
</svelte:head>

<div class="site-blog-post">
	<article class="blog-post-container">
		<div class="container blog-post-header">
			<a href={resolve('/blog')} class="back-link">← Back to blog</a>
			<h1 class="post-title">{data.metadata.title}</h1>
			<div class="post-meta">
				<time class="post-date">{data.metadata.date}</time>
				{#if data.metadata.author}
					<span class="post-author">By {data.metadata.author}</span>
				{/if}
				<span class="post-reading-time">{data.readingTime} min read</span>
			</div>
		</div>

		<div class="container blog-post-content">
			<Post />
		</div>
	</article>
</div>

<style>
	.site-blog-post {
		padding-top: 2rem;
		padding-bottom: 4rem;
	}

	.blog-post-container {
		max-width: 800px;
		margin: 0 auto;
	}

	.container {
		width: min(var(--ps-max-width-docs), calc(100% - 2rem));
		margin: 0 auto;
	}

	.blog-post-header {
		margin-bottom: 2rem;
	}

	.back-link {
		display: inline-block;
		margin-bottom: 1.5rem;
		color: #2ac6ff;
		text-decoration: none;
		font-size: 0.95rem;
		transition: color 0.2s ease;
	}

	.back-link:hover {
		color: #ffffff;
	}

	.post-title {
		font-size: 2rem;
		font-weight: 600;
		margin-bottom: 1rem;
		color: #ffffff;
		line-height: 1.3;
	}

	.post-meta {
		display: flex;
		align-items: center;
		gap: 1rem;
		flex-wrap: wrap;
		font-size: 0.95rem;
		color: #858585;
	}

	.post-date {
		display: block;
	}

	.post-author {
		display: block;
	}

	.post-reading-time {
		display: block;
		color: #6b6580;
	}

	.blog-post-content {
		padding-top: 1.5rem;
	}

	.blog-post-content :global(p) {
		margin: 0 0 1.35rem;
		color: #e5e5e5;
		font-size: 1.05rem;
		line-height: 1.85;
	}

	.blog-post-content :global(p:last-child) {
		margin-bottom: 0;
	}

	.blog-post-content :global(strong) {
		color: #ffffff;
		font-weight: 650;
	}

	.blog-post-content :global(ul) {
		margin: 0 0 1.35rem;
		padding-left: 1.25rem;
		color: #e5e5e5;
		font-size: 1.05rem;
		line-height: 1.85;
		display: grid;
		gap: 0.5rem;
	}

	.blog-post-content :global(li::marker) {
		color: var(--para-accent-soft);
	}

	.blog-post-content :global(img:not([class])),
	.blog-post-content :global(video) {
		max-width: 100%;
		height: auto;
		border-radius: 1rem;
		margin: 1.5rem 0;
	}
</style>
