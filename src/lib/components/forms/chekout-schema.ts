import { z } from 'zod';

export const formSchema = z.object({
	money: z
		.string()
		.nonempty({ message: 'Gib bitte einen Betrag ein.' })
		.refine(
			(val) => {
				const normalized = val.replace(',', '.').trim();
				const num = Number(normalized);
				return !isNaN(num);
			},
			{ message: 'Der Betrag muss eine gültige Zahl sein.' }
		)
		.refine(
			(val) => {
				const num = Number(val.replace(',', '.').trim());
				return num >= 0.1;
			},
			{ message: 'Der Betrag muss mindestens 0,1 sein.' }
		)
		.refine(
			(val) => {
				const num = Number(val.replace(',', '.').trim());
				return num <= 1.5;
			},
			{ message: 'Der Betrag darf maximal 1,5 sein.' }
		),

	nfcid: z
		.string()
		.nonempty({ message: 'Die NFC-ID darf nicht leer sein.' })
		.regex(/^\d{10}$/, {
			message: 'Die NFC-ID muss genau 10 Ziffern enthalten.'
		})
});

export type FormSchema = typeof formSchema;
