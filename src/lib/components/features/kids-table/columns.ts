import type { KidsResponse } from '$lib/pocketbase-types';
import type { ColumnDef } from '@tanstack/table-core';

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
		header: 'Start Kredit'
	},
	{
		accessorKey: 'nfcid',
		header: 'NFCID'
	}
];
