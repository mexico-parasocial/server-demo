import { writable } from 'svelte/store';

export type Language = 'en' | 'es';

export const language = writable<Language>('en');
