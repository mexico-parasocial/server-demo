<script lang="ts">
	import { resolve } from '$app/paths';
	import { contactEmails } from '$lib/content/site';

	const lastUpdated = 'May 11, 2026';
</script>

<svelte:head>
	<title>Community Guidelines • PARA</title>
	<meta
		name="description"
		content="Community guidelines for PARA—rules for safe, respectful, and authentic participation on PARA services built on open civic and AT Protocol–style infrastructure."
	/>
</svelte:head>

<div class="docs-page cg-page">
	<nav class="cg-breadcrumb" aria-label="Breadcrumb">
		<a href={resolve('/support')}>Support</a>
		<span aria-hidden="true">/</span>
		<span>Community guidelines</span>
	</nav>

	<header class="cg-header">
		<p class="docs-hero-kicker">Support</p>
		<h1>Community guidelines</h1>
		<p class="cg-updated">Last updated: {lastUpdated}</p>
	</header>

	<div class="cg-prose">
		<p>
			PARA is a civic social application and related experience operated for public participation in
			political life. It is built on open, AT Protocol–style infrastructure that can interoperate with
			other services. Together with the PARA
			<a href={resolve('/tos')}>Terms of Service</a>,
			<a href={resolve('/legal/privacy')}>Privacy Policy</a>, and the copyright section of our terms,
			these Community Guidelines (&ldquo;Guidelines&rdquo;) govern your use of PARA applications,
			websites, and services we operate (collectively, &ldquo;PARA&rdquo;). By accessing or using PARA,
			you agree to these Guidelines. Please read them carefully.
		</p>
		<p>
			These Guidelines apply to social and civic networking that happens on PARA services we host. If
			you use another application on the same open network that is not operated by us (a &ldquo;Third-Party
			Application&rdquo;), that application&rsquo;s own terms govern your experience there. We are not
			responsible for Third-Party Applications&rsquo; content, moderation, or practices.
		</p>
		<p>
			Our mission is to make political identity, policy expression, and civic participation easier to
			navigate without collapsing into generic feeds or partisan packaging. We want a community that
			takes disagreement seriously, protects vulnerable participants, and can evolve as law and norms
			change. These Guidelines are part of your agreement with us and set baseline rules for using PARA.
		</p>
		<p>We intend these Guidelines to comply with applicable law and to:</p>
		<ul class="cg-goals">
			<li>
				<strong>Empower user choice:</strong> Where the product allows, we want you to control labels,
				safety settings, and how you present political context—consistent with legitimate safety and
				legal obligations.
			</li>
			<li>
				<strong>Cultivate a civic environment:</strong> We aim for spaces where people can disagree,
				clarify positions, and participate without harassment, hate, or coordinated harm.
			</li>
			<li>
				<strong>Evolve with feedback:</strong> We will review and update these Guidelines as PARA
				matures, as risks change, and as regulators clarify expectations.
			</li>
		</ul>
		<p>
			Unless otherwise defined here, capitalized terms follow the PARA Terms of Service. Words such as
			&ldquo;including,&rdquo; &ldquo;includes,&rdquo; &ldquo;such as,&rdquo; and &ldquo;for
			example&rdquo; mean &ldquo;without limitation.&rdquo;
		</p>
	</div>

	<section class="docs-section-card cg-section">
		<h2>How we moderate</h2>
		<p>
			These Guidelines exist so participation stays legible, accountable, and safe enough for public
			civic life. We may use human review, automated signals, and user reports. We also design for
			composable safety tools—such as labelers and user controls—where the protocol and product support
			them, so communities can add context on top of baseline rules we enforce.
		</p>
		<p>
			We respect human rights and freedom of expression, and we follow applicable law in the
			jurisdictions where we operate. We try to use proportionate actions—warnings, limits, removal, or
			account suspension—based on severity, intent, and risk. We can get decisions wrong; when we offer
			an appeals path for a given surface, use it to explain why you believe we erred. Even with appeals,
			we retain discretion to make final calls about specific content or accounts on services we operate.
		</p>
		<p>
			For how identity, moderation, verification, and privacy features are meant to work in the product,
			see <a href={resolve('/trust-and-safety')}>Trust and safety</a> and the documentation.
		</p>
	</section>

	<section class="docs-section-card cg-section">
		<h2>Our principles</h2>
		<ul class="cg-principles">
			<li>
				<strong>Safety first:</strong> No content that shows, promotes, or coordinates violence,
				exploitation, serious self-harm, or criminal harm to people or animals; protect privacy and
				minors.
			</li>
			<li>
				<strong>Respect others:</strong> No harassment, hate, or discrimination targeting people based
				on protected characteristics or civic participation.
			</li>
			<li>
				<strong>Be authentic:</strong> No scams, impersonation meant to mislead, coordinated inauthentic
				manipulation, or undisclosed paid persuasion presented as organic speech.
			</li>
			<li>
				<strong>Follow the rules:</strong> Obey applicable law, respect intellectual property, do not
				attack our systems, and do not evade enforcement.
			</li>
		</ul>
	</section>

	<section class="docs-section-card cg-section" id="safety">
		<h2>1. Safety first</h2>

		<h3>Public safety</h3>
		<p>Do not use PARA to coordinate, recruit for, or promote:</p>
		<ul>
			<li>Criminal enterprises, terrorism, human trafficking, or violent extremist activity.</li>
			<li>
				Step-by-step instructions intended to enable serious crimes or terrorist acts, or coordination
				of harmful real-world acts (including swatting or mob violence).
			</li>
		</ul>
		<p>
			Do not share graphic violence to glorify harm, terrorize victims, or support criminal operations.
			Context matters: discussion of violence in news, art, fiction, games, or regulated sport is not
			banned solely because violence appears—what we restrict is real-world harm, glorification, or
			coordination of abuse.
		</p>

		<h3>Child safety</h3>
		<p>We apply strict rules to content and conduct involving minors:</p>
		<ul>
			<li>
				No sexualization or exploitation of minors or minor-aged characters (including synthetic,
				illustrated, or animated depictions when used for sexual gratification or grooming).
			</li>
			<li>No grooming, solicitation of intimate imagery from minors, or attempts to meet minors for abuse.</li>
			<li>
				No sharing identifying information, real-time location, or other sensitive details about minors
				that create safety risk.
			</li>
			<li>
				No unlawful advertising or promotion of gambling, controlled substances, alcohol, tobacco, or
				deceptive financial products to minors where such targeting is prohibited.
			</li>
		</ul>

		<h3>Adult content</h3>
		<p>
			Where the product allows adult material, it must be consensual, law-compliant, and labeled or
			restricted as the product requires. Do not post non-consensual intimate imagery (including
			synthetic or edited), threats to distribute such material, or sexual content that depicts realistic
			risk of death or serious injury. Do not use technology to facilitate sexual harassment or unwanted
			pursuit.
		</p>

		<h3>Mental health and wellbeing</h3>
		<p>
			Do not encourage self-harm, suicide, eating disorders, or dangerous substance abuse. Do not post
			instructions whose primary purpose is to help someone seriously injure themselves or others. Support
			and recovery content is welcome when it does not romanticize harm or provide methods.
		</p>

		<h3>Privacy protection</h3>
		<p>
			Do not publish others&rsquo; home addresses, non-public contact information, financial or medical
			records, identity documents, or similarly sensitive data without a strong public-interest justification.
			Do not share private communications you were not authorized to share. Do not post real-time location
			or other information that creates imminent safety risk.
		</p>

		<h3>Animal safety</h3>
		<p>
			No sexual content involving real animals or realistic synthetic depictions for that purpose. No
			content depicting torture, staged abuse, illegal fighting, or wildlife exploitation. Ordinary
			discussion of legal hunting, fishing, or husbandry is not banned by itself.
		</p>
	</section>

	<section class="docs-section-card cg-section" id="respect">
		<h2>2. Respect others</h2>

		<h3>Anti-discrimination</h3>
		<p>
			Do not attack people or groups based on protected characteristics such as race, ethnicity,
			religion, national origin, caste, disability, serious disease, sex, sexual orientation, gender
			identity, age (including minors), or immigration or asylum status. This includes slurs,
			dehumanization, supremacist material, and conspiracy narratives whose primary purpose is to incite
			hatred against protected groups.
		</p>

		<h3>Anti-harassment</h3>
		<p>
			Do not stalk, brigade, or persistently target someone to humiliate or degrade them. Do not misuse
			reporting, lists, labels, or moderation features to harass. Do not operate single-purpose accounts
			whose main function is abuse. Accounts that show a sustained pattern of extreme insults,
			bad-faith pile-ons, or disruption aimed at making participation unbearable may be limited or
			removed.
		</p>
	</section>

	<section class="docs-section-card cg-section" id="authentic">
		<h2>3. Be authentic</h2>

		<h3>Trust and transparency</h3>
		<ul>
			<li>No spam or repetitive posting intended to drown out conversation or degrade service quality.</li>
			<li>No phishing, financial scams, or fraudulent fundraising.</li>
			<li>
				No artificial manipulation of reach signals (including coordinated fake engagement) to mislead
				users or systems.
			</li>
			<li>
				Disclose paid or sponsored political content where the product or law requires disclosure, and do
				not disguise commercial persuasion as independent grassroots activity.
			</li>
		</ul>

		<h3>Account authenticity</h3>
		<p>
			Do not impersonate a person, organization, or public office in a way that is likely to mislead
			about identity or authority. Do not sell or transfer accounts, falsify verification, or evade age
			controls where they apply. Alternative identities are fine when they are not deceptive—clearly
			marked parody, satire, fan, or educational accounts are allowed with obvious labeling.
		</p>

		<h3>Information integrity</h3>
		<p>
			Do not coordinate inauthentic campaigns designed to suppress voting, impersonate election
			officials, or spread false statements about voting procedures, eligibility, times, or results when
			that information is likely to cause imminent interference with democratic participation. Do not
			spread false or manipulated claims that are likely to cause immediate serious harm (for example,
			fake emergency instructions).
		</p>
	</section>

	<section class="docs-section-card cg-section" id="rules">
		<h2>4. Follow the rules</h2>

		<h3>Regulated goods and services</h3>
		<p>
			Do not use PARA to unlawfully sell, advertise, or arrange transactions for controlled substances,
			prescription drugs outside lawful channels, weapons where prohibited, stolen goods, forged
			documents, or other illegal commerce.
		</p>

		<h3>Intellectual property</h3>
		<p>
			Respect copyright, trademark, and other IP rights. Do not remove required attribution, bypass
			technical protection in violation of law, or stream or redistribute content you are not authorized
			to share.
		</p>

		<h3>Site security</h3>
		<p>
			Do not probe, exploit, or disrupt PARA systems, APIs, rate limits, or security controls. Do not
			attempt to access data you are not permitted to access.
		</p>

		<h3>Enforcement evasion</h3>
		<p>
			Do not create new accounts or use technical tricks primarily to evade a suspension or ban, or help
			others do so.
		</p>
	</section>

	<section class="docs-section-card cg-section" id="protected">
		<h2>5. Protected expression</h2>
		<p>We welcome legitimate speech that serves the public interest when framed responsibly, including:</p>
		<ul>
			<li>
				<strong>Journalism, research, education, and advocacy:</strong> factual reporting, scholarship,
				and civic debate about matters of public concern, including coverage of violence or harm when it
				is not glorifying or instructing abuse.
			</li>
			<li>
				<strong>Support and recovery:</strong> personal stories and community support that do not encourage
				self-harm methods, and verified crisis resources.
			</li>
			<li>
				<strong>Transparency:</strong> information lawfully drawn from public records, government
				proceedings, or clearly newsworthy scrutiny of public officials and institutions.
			</li>
		</ul>
	</section>

	<section class="docs-section-card">
		<h2>Questions</h2>
		<p>
			For help or to report a concern, contact
			<a href="mailto:{contactEmails.support}">{contactEmails.support}</a>. For legal notices, use the
			channels listed on <a href={resolve('/about/support')}>Support</a>.
		</p>
		<div class="docs-link-grid">
			<a class="docs-link-card" href={resolve('/about/support')}>
				<strong>Support hub</strong>
				<span>Help, policies, and legal routing.</span>
			</a>
			<a class="docs-link-card" href={resolve('/trust-and-safety')}>
				<strong>Trust and safety</strong>
				<span>Product-level identity, moderation, and privacy surfaces.</span>
			</a>
			<a class="docs-link-card" href={resolve('/tos')}>
				<strong>Terms of service</strong>
				<span>Contractual rules and enforcement context.</span>
			</a>
		</div>
	</section>
</div>

<style>
	.cg-page {
		display: grid;
		gap: 1.5rem;
		padding-bottom: 2rem;
	}

	.cg-breadcrumb {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.45rem;
		font-size: 0.88rem;
		font-weight: 600;
		color: #9aa7bd;
		padding-top: 0.5rem;
	}

	.cg-breadcrumb a {
		color: var(--para-accent-text);
		text-decoration: none;
	}

	.cg-breadcrumb a:hover {
		text-decoration: underline;
	}

	.cg-header h1 {
		margin: 0.35rem 0 0.5rem;
		font-family: var(--ps-font-display);
		font-size: clamp(2rem, 4.2vw, 3.25rem);
		line-height: 1.05;
		letter-spacing: -0.03em;
		color: #ffffff;
	}

	.cg-updated {
		margin: 0;
		color: #a89fc0;
		font-size: 0.92rem;
	}

	.cg-prose {
		max-width: 48rem;
	}

	.cg-prose p,
	.cg-section p {
		margin: 0 0 1rem;
		color: #cdc8d8;
		line-height: 1.78;
	}

	.cg-prose a,
	.cg-section a {
		color: var(--para-accent-text);
		font-weight: 600;
	}

	.cg-goals,
	.cg-principles,
	.cg-section ul {
		margin: 0 0 1rem;
		padding-left: 1.25rem;
		color: #cdc8d8;
		line-height: 1.75;
		display: grid;
		gap: 0.65rem;
	}

	.cg-section h2 {
		margin: 0 0 0.75rem;
		font-family: var(--ps-font-display);
		font-size: clamp(1.45rem, 2.8vw, 1.85rem);
		color: #ffffff;
	}

	.cg-section h3 {
		margin: 1.25rem 0 0.5rem;
		font-size: 1.08rem;
		font-weight: 700;
		color: #ece8f4;
	}

	.cg-section h3:first-of-type {
		margin-top: 0;
	}

	.cg-principles strong,
	.cg-goals strong {
		color: #f2effa;
	}
</style>
