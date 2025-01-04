import type { PageServerLoad } from './$types.js'
import {pb} from './pocketbase'



export const load: PageServerLoad = async ({ cookies }) => {
    const nachname = cookies.get("nachname")
    const vorname = cookies.get("vorname")
    return {vorname, nachname}
};

export const actions = {
    default: async ({cookies, request}) => {
        const data = await request.formData();
        const nfcid = data.get('nfcid')
        const kind = await pb.collection('kinder').getFirstListItem(`nfcid="${nfcid}"`)
        return kind
    }
}
