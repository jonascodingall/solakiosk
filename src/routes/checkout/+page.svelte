<script lang="ts">
	import CheckoutForm from '$lib/components/forms/checkout-form.svelte';
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
			<CheckoutForm {data} />
		</Card.Content>
	</Card.Root>
</div>
