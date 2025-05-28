import { z } from 'zod';

export const kidSchema = z.object({
	id: z.string().optional(),
	firstname: z
		.string()
		.min(1, { message: 'Vorname darf nicht leer sein.' })
		.max(50, { message: 'Vorname darf maximal 50 Zeichen haben.' }),

	lastname: z
		.string()
		.min(1, { message: 'Nachname darf nicht leer sein.' })
		.max(50, { message: 'Nachname darf maximal 50 Zeichen haben.' }),

	startCredit: z.preprocess(
		(val) => {
			if (typeof val === 'string' && val.trim() !== '') {
				const n = Number(val.replace(',', '.').trim());
				return isNaN(n) ? val : n;
			}
			return val;
		},
		z
			.number({ invalid_type_error: 'Start Kredit muss eine Zahl sein.' })
			.min(0, { message: 'Start Kredit darf nicht negativ sein.' })
			.max(15, { message: 'Start Kredit darf nicht mehr als 15 sein.' })
	),

	nfcid: z.string().regex(/^\d{10}$/, {
		message: 'Die NFC-ID muss genau 10 Ziffern enthalten.'
	})
});

export type KidSchema = typeof kidSchema;
