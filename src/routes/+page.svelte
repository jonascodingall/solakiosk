<script lang="ts">
	import MainForm from '$lib/components/forms/main-form.svelte';
	import * as Card from '$lib/components/ui/card';
	import type { PageData } from './$types.js';
	let { data }: { data: PageData } = $props();
</script>

<div class="flex h-screen items-center justify-center">
	<Card.Root>
		<Card.Header>
			<Card.Title>Kiosk Menu</Card.Title>
		</Card.Header>
		<Card.Content>
			<MainForm {data} />
		</Card.Content>
	</Card.Root>
</div>
