<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import type { PageProps } from './$types';
	import type { KidsResponse } from '$lib/pocketbase-types';
	import KidsForm from '$lib/components/features/kids-form/kids-form.svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { enhance } from '$app/forms';

	let { data }: PageProps = $props();

	let dialogOpen = $state(false);
	let editing = $state(false);

	const editDialog = (kid: KidsResponse) => {
		dialogOpen = true;
		editing = true;
		data.form.data = kid;
	};

	const clearFormData = () => {
		data.form.data.id = '';
		data.form.data.firstname = '';
		data.form.data.lastname = '';
		data.form.data.nfcid = '';
		data.form.data.startCredit = 0;
	};

	$effect(() => {
		data.form;
		dialogOpen = false;
	});
</script>

<Dialog.Root bind:open={dialogOpen}>
	<Dialog.Trigger
		onclick={() => {
			clearFormData();
			editing = false;
		}}
	>
		Damn
	</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Are you sure absolutely sure?</Dialog.Title>
			<Dialog.Description>
				This action cannot be undone. This will permanently delete your account and remove your data
				from our servers.
			</Dialog.Description>
		</Dialog.Header>
		<KidsForm {data} action={editing ? '?/update' : '?/create'} />
	</Dialog.Content>
</Dialog.Root>

<table class="mt-8 w-full border-collapse border border-gray-200">
	<thead>
		<tr>
			<th class="border border-gray-200 px-4 py-2">Vorname</th>
			<th class="border border-gray-200 px-4 py-2">Nachname</th>
			<th class="border border-gray-200 px-4 py-2">Start Kredit</th>
			<th class="border border-gray-200 px-4 py-2">NFC-ID</th>
			<th class="border border-gray-200 px-4 py-2">Aktionen</th>
		</tr>
	</thead>
	<tbody>
		{#each data.kids as kid}
			<tr>
				<td class="border border-gray-200 px-4 py-2">{kid.firstname}</td>
				<td class="border border-gray-200 px-4 py-2">{kid.lastname}</td>
				<td class="border border-gray-200 px-4 py-2">{kid.startCredit}</td>
				<td class="border border-gray-200 px-4 py-2">{kid.nfcid}</td>
				<td class="border border-gray-200 px-4 py-2">
					<Button type="button" variant="outline" onclick={() => editDialog(kid)}>
						Bearbeiten
					</Button>
					<form method="POST" action="?/delete" class="inline" use:enhance>
						<input type="hidden" name="id" value={kid.id} />
						<Button type="submit" variant="destructive" class="ml-2">Löschen</Button>
					</form>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
