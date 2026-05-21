const modules = import.meta.glob('/src/routes/blog/_posts/*.svx', { eager: true });
const rawModules = import.meta.glob('/src/routes/blog/_posts/*.svx', {
	eager: true,
	query: '?raw',
	import: 'default'
}) as Record<string, string>;

function computeReadingTime(raw: string): number {
	const body = raw.replace(/^---[\s\S]*?---/, '').replace(/<[^>]+>/g, ' ');
	const words = body.trim().split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.ceil(words / 200));
}

export interface BlogPost {
	slug: string;
	title: string;
	description: string;
	date: string;
	author?: string;
	readingTime: number;
}

export const blogPosts: BlogPost[] = Object.entries(modules)
	.map(([path, mod]: [string, any]) => {
		const slug = path.split('/').pop()?.replace('.svx', '') ?? '';
		const raw = typeof rawModules[path] === 'string' ? rawModules[path] : '';
		return {
			slug,
			...mod.metadata,
			readingTime: computeReadingTime(raw)
		};
	})
	.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
