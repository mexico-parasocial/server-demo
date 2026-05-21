import { error } from '@sveltejs/kit';
import { getSchemaDocument } from '@parasocial/content-schema';
import { ensureHighlighter, highlightCodeSync } from '$lib/shiki.js';

export async function load({ params }) {
	await ensureHighlighter();
	const schema = getSchemaDocument(params.schemaId);
	if (!schema) error(404, 'Schema not found');

	const highlightedExamples = schema.examples?.map((ex) => highlightCodeSync(ex, 'json')) ?? [];

	return {
		schema,
		highlightedExamples,
		title: `${schema.title} • Schema Reference`,
		description: schema.summary
	};
}
