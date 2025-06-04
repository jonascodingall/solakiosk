<script lang="ts" generics="TValue">
	import { type ColumnDef, getCoreRowModel } from '@tanstack/table-core';
	import { createSvelteTable, FlexRender } from '$lib/components/ui/data-table/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import type { Snippet } from 'svelte';
	import { Button } from '$lib/components/ui/button';
	import { enhance } from '$app/forms';
	import type { KidsResponse } from '$lib/pocketbase-types';

	type DataTableProps<KidsResponse, TValue> = {
		columns: ColumnDef<KidsResponse, TValue>[];
		data: KidsResponse[];
		children?: Snippet;
		editDialog: (kid: KidsResponse) => void;
	};

	let { data, columns, children, editDialog }: DataTableProps<KidsResponse, TValue> = $props();

	const table = createSvelteTable({
		get data() {
			return data;
		},
		columns,
		getCoreRowModel: getCoreRowModel()
	});
</script>

<div class="rounded-md border">
	<Table.Root>
		<Table.Header>
			{#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
				<Table.Row>
					{#each headerGroup.headers as header (header.id)}
						<Table.Head>
							{#if !header.isPlaceholder}
								<FlexRender
									content={header.column.columnDef.header}
									context={header.getContext()}
								/>
							{/if}
						</Table.Head>
					{/each}
				</Table.Row>
			{/each}
		</Table.Header>
		<Table.Body>
			{#each table.getRowModel().rows as row (row.id)}
				<Table.Row data-state={row.getIsSelected() && 'selected'}>
					{#each row.getVisibleCells() as cell (cell.id)}
						<Table.Cell>
							<FlexRender content={cell.column.columnDef.cell} context={cell.getContext()} />
						</Table.Cell>
					{/each}
					<Table.Cell>
						<Button type="button" variant="outline" onclick={() => editDialog(row.original)}
							>Bearbeiten</Button
						>
						<form method="POST" action="?/delete" class="inline" use:enhance>
							<input type="hidden" name="id" value={row.original.id} />
							<Button type="submit" variant="destructive" class="ml-2">Löschen</Button>
						</form>
					</Table.Cell>
				</Table.Row>
			{:else}
				<Table.Row>
					<Table.Cell colspan={columns.length} class="h-24 text-center">No results.</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
