import type { Actions, PageServerLoad } from './$types';
import { formSchema } from '$lib/components/forms/kid-schema.js';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { KidsRecord } from '$lib/pocketbase-types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals, params }) => {
	let form = await superValidate(zod(formSchema));
	return {
		form: form
	};
};

export const actions: Actions = {
	create: async (event) => {
		const form = await superValidate(event, zod(formSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const newKid: Partial<KidsRecord> = {
			firstname: form.data.firstname,
			lastname: form.data.lastname,
			startCredit: Number(form.data.startCredit),
			nfcid: form.data.nfcid
		};

		await event.locals.pb.collection('kids').create(newKid);

		redirect(303, '/kids');
	}
};
