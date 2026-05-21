<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
</script>

<svelte:head>
	<title>Not found • PARA</title>
	<meta name="description" content="The page you are looking for does not exist." />
</svelte:head>

<div class="error-page">
	<div class="error-card surface-card">
		<p class="error-code">{page.status}</p>
		<h1>Page not found</h1>
		<p class="error-lead">
			The page you are looking for does not exist or has been moved.
		</p>
		<div class="error-actions">
			<a class="button button-primary" href={resolve('/')}>Go home</a>
			<a class="button button-secondary" href={resolve('/docs')}>Browse docs</a>
			<a class="button button-secondary" href={resolve('/support')}>Get support</a>
		</div>
	</div>
</div>

<style>
	.error-page {
		min-height: 60vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem 1rem;
	}

	.error-card {
		max-width: 32rem;
		width: 100%;
		padding: 2.5rem;
		text-align: center;
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 1.6rem;
		background:
			linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02)),
			rgba(8, 16, 28, 0.62);
		box-shadow:
			inset 0 1px 0 rgba(255, 255, 255, 0.05),
			0 20px 60px rgba(0, 0, 0, 0.18);
		backdrop-filter: blur(18px);
	}

	.error-code {
		margin: 0 0 0.5rem;
		font-family: var(--ps-font-mono);
		font-size: 0.82rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: #8f8aa1;
	}

	.error-card h1 {
		margin: 0 0 1rem;
		font-family: 'PARA Cinzel', var(--ps-font-display), serif;
		font-size: clamp(2rem, 5vw, 3rem);
		font-weight: 600;
		line-height: 1.05;
		letter-spacing: -0.02em;
		color: #f8fbff;
	}

	.error-lead {
		margin: 0 0 1.5rem;
		color: #bcc8d9;
		line-height: 1.7;
		font-size: 1.05rem;
	}

	.error-actions {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.85rem;
	}

	.button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.6rem;
		padding: 0.95rem 1.3rem;
		border-radius: var(--ps-radius-pill);
		font-weight: 700;
		transition:
			transform 180ms ease,
			box-shadow 180ms ease,
			background 180ms ease;
	}

	.button:hover {
		transform: translateY(-2px);
	}

	.button-primary {
		background: linear-gradient(135deg, #48267f, #474652);
		color: #f6f4fa;
		box-shadow: 0 20px 40px rgba(72, 38, 127, 0.24);
	}

	.button-secondary {
		border: 1px solid rgba(255, 255, 255, 0.12);
		background: rgba(72, 38, 127, 0.12);
		color: #eef5ff;
	}
</style>
