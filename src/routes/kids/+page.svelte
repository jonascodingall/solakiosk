<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import type { PageProps } from './$types';
	import type { KidsResponse } from '$lib/pocketbase-types';
	import KidsForm from '$lib/components/features/kids-form/kids-form.svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { enhance } from '$app/forms';
	import KidsTable from '$lib/components/features/kids-table/kids-table.svelte';
	import { columns } from '$lib/components/features/kids-table/columns';

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
		class={buttonVariants({ variant: 'outline' })}
	>
		Create
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

<KidsTable data={data.kids} {columns} {editDialog} />
