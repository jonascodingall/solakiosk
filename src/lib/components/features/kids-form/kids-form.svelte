<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { superForm, type SuperValidated } from 'sveltekit-superforms/client';
	import { kidSchema } from './schema';
	import { Input } from '$lib/components/ui/input';

	interface IProps {
		data: {
			form: SuperValidated<
				{
					firstname: string;
					lastname: string;
					startCredit: number;
					nfcid: string;
					id?: string | undefined;
				},
				any,
				{
					firstname: string;
					lastname: string;
					nfcid: string;
					id?: string | undefined;
					startCredit?: unknown;
				}
			>;
		};

		action: string;
	}

	let { data, action }: IProps = $props();

	const form = superForm(data.form, {
		validators: zodClient(kidSchema)
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" {action} use:enhance>
	<Form.Field {form} name="id">
		<Form.Control>
			{#snippet children({ props })}
				<Input type="hidden" {...props} bind:value={$formData.id} />
			{/snippet}
		</Form.Control>
	</Form.Field>

	<Form.Field {form} name="firstname">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Vorname</Form.Label>
				<Input {...props} bind:value={$formData.firstname} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="lastname">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Nachname</Form.Label>
				<Input {...props} bind:value={$formData.lastname} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="nfcid">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>NFCID</Form.Label>
				<Input {...props} bind:value={$formData.nfcid} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="startCredit">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Start Guthaben</Form.Label>
				<Input {...props} bind:value={$formData.startCredit} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Button>Submit</Form.Button>
</form>
