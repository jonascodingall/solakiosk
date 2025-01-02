<script>
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
</script>

<div class="flex h-screen items-center justify-center">
	<Card.Root>
		<Card.Header>
			<Card.Title>Eingabe</Card.Title>
		</Card.Header>
		<Card.Content>
			<div class="mb-10">
				<Label>Preis</Label>
				<Input type="number" />
			</div>
			<div class="mb-10">
				<Label>NFC-ID</Label>
				<Input />
			</div>
			<div class="flex space-x-5">
				<div>
					<Label>Nachname</Label>
					<Input class="max-w-xs" />
				</div>
				<div>
					<Label>Vorname</Label>
					<Input class="max-w-xs" />
				</div>
			</div>
		</Card.Content>
		<Card.Footer class="flex justify-between">
			<Button variant="destructive">Reset</Button>
			<Button>Okay</Button>
		</Card.Footer>
	</Card.Root>
</div>
