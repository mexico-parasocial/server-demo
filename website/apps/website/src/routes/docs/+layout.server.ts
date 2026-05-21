import { getArchitectureNotes, getSchemaIndex } from '@parasocial/content-schema';
import { flowNav, primaryNav, readerNav } from '$lib/content/navigation';

export function load() {
	return {
		primaryNav,
		flowNav,
		readerNav,
		schemaIndex: getSchemaIndex(),
		architectureNotes: getArchitectureNotes()
	};
}
