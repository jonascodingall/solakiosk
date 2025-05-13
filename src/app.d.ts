// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

import type Pocketbase, { AuthModel } from 'pocketbase';
import type { TypedPocketBase } from '$lib/pocketbase-types';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			pb: TypedPocketBase;
			user: AuthModel;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
