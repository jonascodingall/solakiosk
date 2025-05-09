import { formSchema } from '$lib/components/forms/chekout-schema.js';
import type { TransactionsRecord } from '$lib/pocketbase-types.js';
import type { PageServerLoad, Actions } from './$types.js';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(formSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(formSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const nfcid = form.data.nfcid;
		const money = Number(form.data.money);

		const kid = await event.locals.pb.collection('kids').getFirstListItem(`nfcid="${nfcid}"`);

		const newTransaction: Partial<TransactionsRecord> = {
			kidId: kid.id,
			amount: money
		};

		await event.locals.pb.collection('transactions').create(newTransaction);

		return {
			form
		};
	}
};
