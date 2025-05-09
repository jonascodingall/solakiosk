import type { KidsResponse } from '$lib/pocketbase-types';
import type { ColumnDef } from '@tanstack/table-core';
import { createRawSnippet } from 'svelte';
import { renderComponent, renderSnippet } from '../ui/data-table';
import KidsTableActions from './kids-table-actions.svelte';

export const columns: ColumnDef<KidsResponse>[] = [
	{
		accessorKey: 'id',
		header: 'Id'
	},
	{
		accessorKey: 'firstname',
		header: 'Vorname'
	},
	{
		accessorKey: 'lastname',
		header: 'Nachname'
	},
	{
		accessorKey: 'startCredit',
		header: () => {
			const startCreditSnippet = createRawSnippet(() => ({
				render: () => `<div class="text-right">Start Kredit</div>`
			}));
			return renderSnippet(startCreditSnippet, '');
		},
		cell: ({ row }) => {
			const formatter = new Intl.NumberFormat('de-DE', {
				style: 'currency',
				currency: 'EUR'
			});

			const startcreditCellSnippet = createRawSnippet<[string]>((getStartCredit) => {
				const startCredit = getStartCredit();
				return {
					render: () => `<div class="text-right font-medium">${startCredit}</div>`
				};
			});

			return renderSnippet(
				startcreditCellSnippet,
				formatter.format(parseFloat(row.getValue('startCredit')))
			);
		}
	},
	{
		accessorKey: 'nfcid',
		header: 'NFCID'
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			// You can pass whatever you need from `row.original` to the component
			return renderComponent(KidsTableActions, { kid: row.original });
		}
	}
];
