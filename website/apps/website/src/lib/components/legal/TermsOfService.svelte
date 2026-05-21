<script lang="ts">
	import { resolve } from '$app/paths';
	import { contactEmails } from '$lib/content/site';
	type Props = { canonicalPath?: string };
	let { canonicalPath = '/tos' }: Props = $props();

	const toc = [
		['#eligibility', `Eligibility and age verification`],
		['#accounts', `Account registration and responsibilities`],
		['#user-content', `User content`],
		['#moderation', `Proactive moderation and illegal content`],
		['#feeds', `Feeds and recommender systems`],
		['#appeals', `Complaints and appeals`],
		['#termination', `Termination`],
		['#third-party', `Third-party services`],
		['#opensource', `Open source software`],
		['#warranty', `Warranty disclaimer`],
		['#indemnity', `Indemnification`],
		['#liability', `Limitation of liability`],
		['#disputes', `Governing law, jurisdiction, and dispute resolution`],
		['#updates', `Updates to terms`],
		['#ip', `Intellectual property`],
		['#general', `General terms`],
		['#contact', `Contact us`],
		['#app-stores', `App store required terms`]
	] as const;

	const lastUpdated = `May 11, 2026`;
</script>

<svelte:head>
	<link rel="canonical" href={(resolve as unknown as (p: string) => string)(canonicalPath)} />
	<title>{`Terms of Service • PARA`}</title>
	<meta
		name="description"
		content={`Terms of service for PARA applications, websites, and related services, including eligibility, content rules, moderation, liability, and dispute resolution.`}
	/>
</svelte:head>

<div class="docs-page tos-page">
	<header class="tos-header">
		<p class="docs-hero-kicker">Legal</p>
		<h1>Terms of service</h1>
		<p class="tos-updated">Last updated: {lastUpdated}</p>
		<p class="tos-lead">
			
				Welcome to PARA. These Terms of Service (&ldquo;Terms&rdquo;) govern your use of PARA
				applications, websites, and services we operate (&ldquo;PARA&rdquo;). PARA is a civic social
				experience built on open, AT Protocol–style infrastructure. Together with our
				<a href={resolve('/support/community-guidelines')}>Community Guidelines</a>,
				<a href={resolve('/support/privacy')}>Privacy Policy</a>, and the copyright provisions below, these
				Terms form your agreement with us. By using PARA, you agree to these Terms.
			
		</p>
		<p>
			
				These Terms apply to PARA services we host. If you use another application on the same open
				network that we do not operate (&ldquo;Third-Party Application&rdquo;), that application&rsquo;s
				terms govern your experience there, and we are not responsible for its content or practices.
			
		</p>
		<p class="tos-callout">
			<strong>Disputes.</strong> These Terms describe how disputes are handled, including informal resolution and, where permitted, binding arbitration and a class-action waiver. Read Section 13 carefully. Some jurisdictions do not allow certain limitations; where mandatory consumer or employment law applies to you, those laws prevail to the required extent.
		</p>
	</header>

	<nav class="tos-toc" aria-label={`Table of contents`}>
		<h2 class="tos-toc-title">Table of contents</h2>
		<ol>
			{#each toc as [href, label] (href)}
				<li><a {href}>{label}</a></li>
			{/each}
		</ol>
	</nav>

	<section class="docs-section-card tos-section" id="eligibility">
		<h2>1. Eligibility and age verification</h2>
		<p>
			
				You must be at least the age of digital consent in your jurisdiction (and at least 13 where 13 is
				the minimum to contract) and able to enter a binding agreement. Where law requires age
				assurance for certain features or content, you must complete any reasonable process we provide
				before accessing those features.
			
		</p>
	</section>

	<section class="docs-section-card tos-section" id="accounts">
		<h2>2. Account registration and responsibilities</h2>
		<p>
			<strong>Summary.</strong> You need your own account. Do not share credentials. You are responsible for activity on your account, including actions you did not personally take, unless you notify us promptly of compromise. Contact <a href="mailto:{contactEmails.support}">{contactEmails.support}</a> if you believe your account was taken over.
		</p>
		<p>
			
				You must create and maintain an account (&ldquo;Account&rdquo;) where the product requires it.
				Each successful use of your credentials is treated as authorized by you unless we agree otherwise
				in writing after you report misuse. Do not use another person&rsquo;s account without permission.
			
		</p>
		<p>
			
				By posting content, you represent that you have the rights, consents, and licenses needed for
				your use and for the limited license you grant us in Section 3.
			
		</p>
		<p>
			
				If you use PARA on behalf of an organization, you represent that you have authority to bind that
				organization. Government entities using PARA in an official capacity should contact
				<a href="mailto:{contactEmails.legal}">{contactEmails.legal}</a>
				first so we can align access with applicable rules.
			
		</p>
		<p>
			
				You are responsible for safeguarding passwords, keys, and devices. We are not liable for losses
				caused by credential theft where you did not follow reasonable security practices or failed to
				report compromise.
			
		</p>
	</section>

	<section class="docs-section-card tos-section" id="user-content">
		<h2>3. User content</h2>
		<p>
			<strong>Summary.</strong> You keep your rights in what you post, but you must follow law and our Guidelines. We need a license to run the service, show posts, keep people safe, and improve PARA.
		</p>
		<p>
			
				&ldquo;Content&rdquo; means material you submit through PARA, including posts, profile fields,
				media, links, feedback, and messages where the product stores them.
			
		</p>
		<p>
			
				You are solely responsible for your Content. It must comply with applicable law and our
				Community Guidelines. We are not obligated to pre-screen everything, but we may moderate as
				described in these Terms.
			
		</p>
		<p>
			
				We do not control how Third-Party Applications or other replicas may display or retain Content
				that leaves our systems. Report misuse through the tools we provide or via
				<a href={resolve('/support')}>Support</a>.
			
		</p>
		<p>
			
				You retain ownership of your Content. You grant us a worldwide, non-exclusive, royalty-free
				license to host, reproduce, adapt, display, distribute, and create technical modifications (such
				as transcoding or resizing) as needed to operate, secure, promote, and improve PARA and related
				open protocol efforts we support; to enforce policies; and to allow trusted service providers
				(e.g., moderation or infrastructure vendors) to process Content solely for those purposes. We will
				not sell your Content as a standalone commodity; if we ever want a materially different
				commercial use, we will seek appropriate consent where required by law.
			
		</p>
		<p>
			
				Deletion: If you delete your account, we will use reasonable efforts to remove your Content from
				services we control, subject to backups, legal holds, and safety needs described in our Privacy
				Policy. Federation may mean copies persist elsewhere; contact other services for removal there.
			
		</p>
	</section>

	<section class="docs-section-card tos-section" id="moderation">
		<h2>4. Proactive moderation and illegal content</h2>
		<p>
			
				We may use automated tools, hash-matching, classifiers, and human review to detect policy
				violations and priority illegal material (including terrorism and child sexual abuse
				exploitation). We act on user reports, trusted partners, and lawful requests. We prioritize swift
				action where the risk of harm is acute.
			
		</p>
	</section>

	<section class="docs-section-card tos-section" id="feeds">
		<h2>5. Feeds and recommender systems</h2>
		<p>
			
				Where PARA offers algorithmic feeds or recommendations, you can use product controls to change or
				limit personalization when those controls exist. Third-party feed generators or clients are not
				controlled by us; their ranking or labeling is governed by their own terms.
			
		</p>
	</section>

	<section class="docs-section-card tos-section" id="appeals">
		<h2>6. Complaints and appeals</h2>
		<p>
			<strong>Complaints.</strong> Use in-product reporting or email <a href="mailto:{contactEmails.support}">{contactEmails.support}</a> with links, screenshots, and a concise description of the violation.
		</p>
		<p>
			<strong>Appeals.</strong> If we restrict or suspend your account, you may appeal by replying to the enforcement notice or writing to <a href="mailto:{contactEmails.support}">{contactEmails.support}</a> within fourteen (14) days with enough detail for a meaningful review. Late or bare appeals may be declined.
		</p>
		<p>
			<strong>EU / EEA users.</strong> Where the Digital Services Act or national implementations grant you additional remedies (including out-of-court dispute bodies or courts), those rights apply alongside—not instead of—the appeal paths above, to the extent required by law.
		</p>
	</section>

	<section class="docs-section-card tos-section" id="termination">
		<h2>7. Termination</h2>
		<p>
			<strong>Your exit.</strong> You may stop using PARA or delete your account where the product provides deletion. Certain log retention or legal obligations may continue as described in the Privacy Policy.
		</p>
		<p>
			<strong>Our exit.</strong> We may suspend or terminate access if you materially breach these Terms or the Community Guidelines, if required by law, or if continued access creates serious risk to users, us, or third parties (including safety, security, or legal exposure).
		</p>
		<p>
			
				Sections intended to survive (including licenses to the extent needed to retain records,
				disclaimers, limits, and dispute terms) survive termination.
			
		</p>
	</section>

	<section class="docs-section-card tos-section" id="third-party">
		<h2>8. Third-party services</h2>
		<p>
			
				PARA may link to or interoperate with third-party sites, clients, or stores. We do not control and
				are not responsible for their content, policies, or practices. Your use of third-party services
				is at your own risk.
			
		</p>
	</section>

	<section class="docs-section-card tos-section" id="opensource">
		<h2>9. Open source software</h2>
		<p>
			
				Components of PARA may be distributed under open-source licenses (for example MIT or Apache).
				Your use of those components follows their respective license texts. Where an open-source license
				conflicts with these Terms as applied to that component, the open-source license governs the
				component only.
			
		</p>
	</section>

	<section class="docs-section-card tos-section" id="warranty">
		<h2>10. Warranty disclaimer</h2>
		<p>
			
				PARA and all Content are provided on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis.
				To the fullest extent permitted by law, we disclaim all implied warranties (including
				merchantability, fitness for a particular purpose, and non-infringement) and any warranty that
				PARA will be uninterrupted, error-free, or free of harmful components. You may encounter Content
				that is inaccurate or offensive; our moderation does not constitute an endorsement of any post.
			
		</p>
	</section>

	<section class="docs-section-card tos-section" id="indemnity">
		<h2>11. Indemnification</h2>
		<p>
			
				You will indemnify and hold harmless PARA operators, affiliates, and their personnel from claims,
				losses, or expenses (including reasonable attorneys&rsquo; fees) arising out of: your use of PARA;
				your Content; your breach of these Terms; or your violation of law or third-party rights. We may
				assume exclusive defense of any matter subject to indemnification, and you will cooperate.
			
		</p>
	</section>

	<section class="docs-section-card tos-section" id="liability">
		<h2>12. Limitation of liability</h2>
		<p>
			
				To the fullest extent permitted by law, we are not liable for indirect, incidental, special,
				consequential, or punitive damages, or for lost profits, data, or goodwill. Our aggregate liability
				for claims relating to PARA is capped at the greater of (a) one hundred U.S. dollars (US$100) or
				(b) the amounts you paid us for PARA in the twelve (12) months before the claim—unless liability
				cannot be limited under applicable law (for example, gross negligence, willful misconduct, or
				statutory non-waivable rights).
			
		</p>
	</section>

	<section class="docs-section-card tos-section" id="disputes">
		<h2>13. Governing law, jurisdiction, venue, dispute resolution, and arbitration</h2>
		<p>
			<strong>Informal resolution.</strong> Before filing a claim, email <a href="mailto:{contactEmails.legal}">{contactEmails.legal}</a> with a description of the dispute and the relief you seek. Allow at least sixty (60) days to try to resolve informally unless urgent interim relief is required.
		</p>
		<p>
			<strong>Arbitration (where permitted).</strong> If informal resolution fails, either party may demand binding arbitration administered by a recognized provider (for example AAA or ICDR) under its consumer or commercial rules, seated in a mutually agreeable location or, if none, the county/state of our principal operations as we designate from time to time. The arbitrator may grant individualized relief only. <strong>Class waiver:</strong> to the maximum extent permitted, you and we waive any right to participate in class actions or class-wide arbitration. If this waiver is unenforceable for a given claim, that claim may proceed in court while other claims remain arbitrable if severance is permitted.
		</p>
		<p>
			<strong>Court carve-outs.</strong> Either party may seek injunctive or equitable relief in a court of competent jurisdiction to prevent misuse of intellectual property, abuse of the service, or unlawful conduct causing imminent harm. Small claims court remains available for qualifying disputes.
		</p>
		<p>
			<strong>Governing law.</strong> Except where mandatory local law requires otherwise, these Terms are governed by the laws of the jurisdiction we designate as our primary place of business (to be updated publicly when an operating entity is finalized), without regard to conflict-of-law rules that would choose another body of law.
		</p>
		<p>This Section survives termination.</p>
	</section>

	<section class="docs-section-card tos-section" id="updates">
		<h2>14. Updates to terms</h2>
		<p>
			
				We may update these Terms by posting a new version on this site and, for material changes, by
				providing additional notice (such as an in-app banner or email where we have your address).
				Continued use after the effective date constitutes acceptance. If you disagree, stop using PARA.
			
		</p>
	</section>

	<section class="docs-section-card tos-section" id="ip">
		<h2>15. Intellectual property</h2>
		<p>
			
				We reserve rights in PARA branding, software, documentation, and aggregate data insights that do not
				identify you, except as granted under open-source licenses for specific components. These Terms do
				not transfer ownership of our intellectual property to you.
			
		</p>
		<div id="copyright">
			<h3>Copyright</h3>
			<p>
				
					If you believe material on PARA infringes your copyright, email
					<a href="mailto:{contactEmails.legal}">{contactEmails.legal}</a>
					with identification of the work, the location of the material, a good-faith statement of
					unauthorized use, your contact details, and a statement under penalty of perjury (where
					required by law) that your notice is accurate. We may remove or restrict material consistent
					with law and policy.
				
			</p>
		</div>
	</section>

	<section class="docs-section-card tos-section" id="general">
		<h2>16. General terms</h2>
		<p>
			
				These Terms, the Community Guidelines, and the Privacy Policy are the entire agreement regarding
				PARA. If a provision is invalid, the remainder stays enforceable. Notices may be electronic.
				Failure to enforce a provision is not a waiver. Section summaries are for convenience only; the
				full text controls.
			
		</p>
	</section>

	<section class="docs-section-card tos-section" id="contact">
		<h2>17. Contact us</h2>
		<p>
			
				Questions about these Terms:
				<a href="mailto:{contactEmails.support}">{contactEmails.support}</a>. Legal inquiries:
				<a href="mailto:{contactEmails.legal}">{contactEmails.legal}</a>. Regulatory and DSA routing is
				listed on <a href={resolve('/support')}>Support</a>.
			
		</p>
		<p>
			
				Competent EU or member-state authorities may contact our DSA point at
				<a href="mailto:{contactEmails.euDsa}">{contactEmails.euDsa}</a>. We accept English unless a
				specific statute requires another language we can accommodate.
			
		</p>
		<p>
			
				If German Network Enforcement Act (<em>NetzDG</em>) service-of-process requirements apply to us,
				we will publish a domestic agent address here before accepting regulated traffic from Germany.
				Until then, route NetzDG-related legal correspondence to
				<a href="mailto:{contactEmails.legal}">{contactEmails.legal}</a>.
			
		</p>
	</section>

	<section class="docs-section-card tos-section" id="app-stores">
		<h2>18. Apple App Store and Google Play required terms</h2>
		<p>
			
				If you obtain PARA through an app store (&ldquo;App Provider&rdquo;), you acknowledge: (i) these
				Terms are between you and PARA operators—not the App Provider; (ii) the App Provider has no
				warranty obligation for PARA; (iii) the App Provider is not responsible for maintenance or support;
				(iv) the App Provider is not responsible for third-party claims about PARA; (v) intellectual
				property claims regarding PARA should be directed to us as above; (vi) the App Provider and its
				affiliates are third-party beneficiaries of these Terms to the extent needed to enforce store
				rules; and (vii) you must comply with applicable store terms when using the app.
			
		</p>
	</section>

	<section class="docs-section-card">
		<h2>Related</h2>
		<div class="docs-link-grid">
			<a class="docs-link-card" href={resolve('/support/community-guidelines')}>
				<strong>Community guidelines</strong>
				<span>Conduct rules for PARA services.</span>
			</a>
			<a class="docs-link-card" href={resolve('/support/privacy')}>
				<strong>Privacy policy</strong>
				<span>How we handle personal data.</span>
			</a>
			<a class="docs-link-card" href={resolve('/support')}>
				<strong>Support</strong>
				<span>Help and legal routing.</span>
			</a>
		</div>
	</section>
</div>

<style>
	.tos-page {
		display: grid;
		gap: 1.5rem;
		padding-bottom: 2rem;
	}

	.tos-header {
		max-width: 48rem;
	}

	.tos-header h1 {
		margin: 0.35rem 0 0.5rem;
		font-family: var(--ps-font-display);
		font-size: clamp(2rem, 4.2vw, 3.25rem);
		line-height: 1.05;
		letter-spacing: -0.03em;
		color: #ffffff;
	}

	.tos-updated {
		margin: 0 0 1rem;
		color: #a89fc0;
		font-size: 0.92rem;
	}

	.tos-lead,
	.tos-header p {
		margin: 0 0 1rem;
		color: #cdc8d8;
		line-height: 1.78;
	}

	.tos-callout {
		padding: 1rem 1.1rem;
		border-radius: 1rem;
		border: 1px solid rgba(255, 180, 120, 0.35);
		background: rgba(255, 140, 60, 0.08);
		color: #f0e6de;
	}

	.tos-callout strong {
		color: #fff;
	}

	.tos-header a {
		color: var(--para-accent-text);
		font-weight: 600;
	}

	.tos-toc {
		padding: 1.15rem 1.25rem;
		border-radius: 1.25rem;
		border: 1px solid rgba(255, 255, 255, 0.1);
		background: rgba(255, 255, 255, 0.04);
		max-width: 48rem;
	}

	.tos-toc-title {
		margin: 0 0 0.75rem;
		font-size: 1rem;
		font-weight: 800;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--para-accent-text);
	}

	.tos-toc ol {
		margin: 0;
		padding-left: 1.2rem;
		display: grid;
		gap: 0.4rem;
		color: #d2ccdf;
		line-height: 1.55;
	}

	.tos-toc a {
		color: #f4f7ff;
		font-weight: 600;
		text-decoration: none;
	}

	.tos-toc a:hover {
		color: var(--para-accent-text);
		text-decoration: underline;
	}

	.tos-section h2 {
		margin: 0 0 0.75rem;
		font-family: var(--ps-font-display);
		font-size: clamp(1.35rem, 2.5vw, 1.65rem);
		color: #ffffff;
	}

	.tos-section h3 {
		margin: 1rem 0 0.5rem;
		font-size: 1.05rem;
		color: #ece8f4;
	}

	.tos-section p {
		margin: 0 0 0.85rem;
		color: #cdc8d8;
		line-height: 1.78;
	}

	.tos-section a {
		color: var(--para-accent-text);
		font-weight: 600;
	}

	#copyright p:last-child {
		margin-bottom: 0;
	}
</style>
