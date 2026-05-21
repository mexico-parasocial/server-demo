type StaticHref =
	| '/docs'
	| '/docs/getting-started'
	| '/docs/how-it-works'
	| '/docs/product'
	| '/docs/glossary'
	| '/docs/status'
	| '/docs/schemas'
	| '/docs/roadmap';

export const primaryNav = [
	{ href: '/docs', label: 'Guide' },
	{ href: '/docs/getting-started', label: 'Getting started' },
	{ href: '/docs/how-it-works', label: 'How it works' },
	{ href: '/docs/product', label: 'Product' },
	{ href: '/docs/glossary', label: 'Glossary' },
	{ href: '/docs/status', label: 'Status' },
	{ href: '/docs/schemas', label: 'Schemas' }
] satisfies Array<{ href: StaticHref; label: string }>;

type FlowHref =
	| '/docs/how-it-works/communities'
	| '/docs/how-it-works/raq'
	| '/docs/how-it-works/cabildeo'
	| '/docs/how-it-works/representatives'
	| '/docs/how-it-works/highlights'
	| '/docs/how-it-works/map-and-discovery'
	| '/docs/how-it-works/messages-and-agents';

export const flowNav = [
	{ href: '/docs/how-it-works/communities', label: 'Communities' },
	{ href: '/docs/how-it-works/raq', label: 'RAQ' },
	{ href: '/docs/how-it-works/cabildeo', label: 'Cabildeo' },
	{ href: '/docs/how-it-works/representatives', label: 'Representatives' },
	{ href: '/docs/how-it-works/highlights', label: 'Highlights' },
	{ href: '/docs/how-it-works/map-and-discovery', label: 'Map and discovery' },
	{ href: '/docs/how-it-works/messages-and-agents', label: 'Messages and agents' }
] satisfies Array<{ href: FlowHref; label: string }>;

export const readerNav = [
	{ href: '/thesis', label: 'Thesis' },
	{ href: '/trust-and-safety', label: 'Trust and safety' },
	{ href: '/try-app', label: 'Try app' },
	{ href: '/about/support', label: 'Support' }
] as const;
