<script lang="ts">
	import { language, type Language } from '../stores/language';

	function setLanguage(lang: Language) {
		language.set(lang);
	}
</script>

<button
	class="lang-switcher"
	onclick={() => setLanguage($language === 'en' ? 'es' : 'en')}
	aria-label="Toggle Language"
>
	<span class:active={$language === 'en'}>EN</span>
	<span class="separator">/</span>
	<span class:active={$language === 'es'}>ES</span>
</button>

<style>
	.lang-switcher {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		padding: 0.45rem 0.85rem;
		background: rgba(255, 255, 255, 0.06);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 999px;
		color: rgba(255, 255, 255, 0.55);
		font-size: 0.78rem;
		font-weight: 700;
		font-family: var(--ps-font-mono);
		letter-spacing: 0.04em;
		cursor: pointer;
		transition: all 0.2s ease;
		backdrop-filter: blur(12px);
	}

	.lang-switcher:hover {
		border-color: rgba(255, 255, 255, 0.2);
		background: rgba(255, 255, 255, 0.1);
	}

	span {
		transition: color 0.2s ease;
	}

	.active {
		color: #ffffff;
		text-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
	}

	.separator {
		opacity: 0.3;
		font-weight: 400;
	}
</style>
