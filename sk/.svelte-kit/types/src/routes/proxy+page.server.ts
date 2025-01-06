// @ts-nocheck
import type { KindModel } from '$lib/models/kindModel.js';
import type { PageServerLoad } from './$types.js'
import {pb} from './pocketbase'



export const load = async ({ cookies }: Parameters<PageServerLoad>[0]) => {
    const nachname = cookies.get("nachname")
    const vorname = cookies.get("vorname")
    return {vorname, nachname}
};

export const actions = {
    default: async ({cookies, request}) => {
        const data = await request.formData();
        const nfcid = data.get('nfcid')
        const preis = data.get('preis')?.toString()

        const kind = await pb.collection('kinder').getFirstListItem(`nfcid="${nfcid}"`)
        kind.konto = kind.konto - Number(preis)
        await pb.collection('kinder').update(kind.id, kind)
        return kind
    }
}
