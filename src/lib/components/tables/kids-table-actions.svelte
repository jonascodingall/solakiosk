<script lang="ts">
	import Ellipsis from '@lucide/svelte/icons/ellipsis';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import type { KidsResponse } from '$lib/pocketbase-types';
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';

	interface IProp {
		kid: KidsResponse;
	}
	let { kid }: IProp = $props();

	let form: HTMLFormElement;
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		{#snippet child({ props })}
			<Button {...props} variant="ghost" size="icon" class="relative size-8 p-0">
				<Ellipsis />
			</Button>
		{/snippet}
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Group>
			<DropdownMenu.GroupHeading>Actions</DropdownMenu.GroupHeading>
			<DropdownMenu.Item onclick={() => navigator.clipboard.writeText(kid.nfcid)}>
				NFCID kopieren
			</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Item onclick={() => goto(`/kids/${kid.id}`)}>Kind bearbeiten</DropdownMenu.Item>
		<form method="POST" use:enhance bind:this={form} action="kids/{kid.id}?/delete">
			<DropdownMenu.Item onclick={() => form.submit()}>Kind löschen</DropdownMenu.Item>
		</form>
	</DropdownMenu.Content>
</DropdownMenu.Root>
