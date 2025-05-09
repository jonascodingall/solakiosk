<script lang="ts">
	import KidForm from '$lib/components/forms/kid-form.svelte';
	import * as Card from '$lib/components/ui/card';
	import type { PageData } from './$types.js';
	let { data }: { data: PageData } = $props();
</script>

<div class="flex h-screen items-center justify-center">
	<Card.Root>
		<Card.Header>
			<Card.Title>Kind Menu</Card.Title>
		</Card.Header>
		<Card.Content>
			<KidForm {data} action="?/update" />
		</Card.Content>
	</Card.Root>
</div>
