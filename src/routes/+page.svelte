<script lang="ts">
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import { toggleMode } from 'mode-watcher';

	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();
	let nachname = $state();
	let vorname = $state();
	if (form) {
		nachname = form.nachname;
		vorname = form.vorname;
	}
</script>

<Button onclick={toggleMode}>Toggle Mode</Button>

<div class="flex h-screen items-center justify-center">
	<form method="POST">
		<Card.Root>
			<Card.Header>
				<Card.Title>Eingabe</Card.Title>
			</Card.Header>
			<Card.Content>
				<div class="mb-10">
					<Label>Preis</Label>
					<Input name="preis" type="number" />
				</div>
				<div class="mb-10">
					<Label>NFC-ID</Label>
					<Input name="nfcid" />
				</div>
				<div class="flex space-x-5">
					<div>
						<Label>Nachname</Label>
						<Input bind:value={nachname} name="nachname" class="max-w-xs" />
					</div>
					<div>
						<Label>Vorname</Label>
						<Input bind:value={vorname} name="vorname" class="max-w-xs" />
					</div>
				</div>
			</Card.Content>
			<Card.Footer class="flex justify-between">
				<Button type="reset" variant="destructive">Reset</Button>
				<Button type="submit">Okay</Button>
			</Card.Footer>
		</Card.Root>
	</form>
</div>
