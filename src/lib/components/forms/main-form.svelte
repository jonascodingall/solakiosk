<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { formSchema, type FormSchema } from './main-schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	let { data }: { data: { form: SuperValidated<Infer<FormSchema>> } } = $props();

	const form = superForm(data.form, {
		validators: zodClient(formSchema)
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance>
	<Form.Field {form} name="money">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Geld</Form.Label>
				<Input
					{...props}
					bind:value={$formData.money}
					autocomplete="off"
					onkeydown={({ key }) => {
						if (key == 'Enter') document.getElementById('nfcid')?.focus();
					}}
				/>
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="nfcid">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>NFCID</Form.Label>
				<Input
					{...props}
					bind:value={$formData.nfcid}
					autocomplete="off"
					id="nfcid"
					onkeydown={({ key }) => {
						if (key == 'Enter') form.submit();
					}}
				/>
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button>Submit</Form.Button>
</form>
