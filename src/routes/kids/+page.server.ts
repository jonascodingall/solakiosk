import { Collections } from '$lib/pocketbase-types';
import { superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { kidSchema } from '$lib/components/features/kids-form/schema';

export const load: PageServerLoad = async ({ locals }) => {
	const data = await locals.pb.collection(Collections.Kids).getFullList();

	return {
		kids: data,
		form: await superValidate(zod(kidSchema))
	};
};

export const actions: Actions = {
	create: async ({ request, locals }) => {
		const form = await superValidate(request, zod(kidSchema));
		if (!form.valid) return { form };
		await locals.pb.collection(Collections.Kids).create(form.data);
		return { form };
	},

	update: async ({ request, locals }) => {
		const form = await superValidate(request, zod(kidSchema));
		if (!form.valid) return { form };
		console.log('update');
		await locals.pb.collection(Collections.Kids).update(form.data.id!, form.data);
		return { form };
	},

	delete: async ({ request, locals }) => {
		const form = await request.formData();
		const id = form.get('id')?.toString();
		if (!id) return;
		await locals.pb.collection(Collections.Kids).delete(id);
	}
};
