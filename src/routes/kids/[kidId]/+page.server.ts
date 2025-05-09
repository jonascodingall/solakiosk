import type { Actions, PageServerLoad } from './$types';
import { formSchema } from '$lib/components/forms/kid-schema.js';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { KidsRecord } from '$lib/pocketbase-types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals, params }) => {
	const data = await locals.pb.collection('kids').getOne(params.kidId);
	let form = await superValidate(zod(formSchema));
	form.data = data;
	return {
		kid: data,
		form: form
	};
};

export const actions: Actions = {
	update: async (event) => {
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

		await event.locals.pb.collection('kids').update(event.params.kidId, newKid);

		redirect(303, '/kids');
	},

	delete: async ({ locals, params }) => {
		await locals.pb.collection('kids').delete(params.kidId);
		redirect(303, '/kids');
	}
};
