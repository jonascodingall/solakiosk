<script lang="ts">
	import KidsTable from '$lib/components/tables/kids-table.svelte';
	import { columns } from '$lib/components/tables/kids-columns.js';

	let { data } = $props();
</script>

<div class="mt-20 flex justify-center">
	<KidsTable data={data.kids} {columns} />
</div>
