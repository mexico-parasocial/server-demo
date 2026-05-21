import { getSchemaIndex } from '@parasocial/content-schema';

export function load() {
	return {
		schemas: getSchemaIndex(),
		title: 'Schema Reference',
		description: 'Browse the com.para.* lexicons that define PARA\'s civic surfaces.'
	};
}
