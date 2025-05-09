<script lang="ts">
	import { goto } from '$app/navigation';
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { formSchema, type FormSchema } from './kid-schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	interface IProp {
		data: { form: SuperValidated<Infer<FormSchema>> };
		action?: string;
	}

	let { data, action = '' }: IProp = $props();

	const form = superForm(data.form, {
		validators: zodClient(formSchema)
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance {action}>
	<div class="flex flex-col gap-5">
		<Form.Field {form} name="firstname">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Vorname</Form.Label>
					<Input {...props} bind:value={$formData.firstname} autocomplete="off" />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="lastname">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Nachname</Form.Label>
					<Input {...props} bind:value={$formData.lastname} autocomplete="off" />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<div class="flex gap-5">
			<Form.Field {form} name="startCredit">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Start Kredit</Form.Label>
						<Input type="number" {...props} bind:value={$formData.startCredit} autocomplete="off" />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="nfcid">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>NFCID</Form.Label>
						<Input {...props} bind:value={$formData.nfcid} autocomplete="off" />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
		</div>
		<Form.Button class="block w-full">Submit</Form.Button>
	</div>
</form>
