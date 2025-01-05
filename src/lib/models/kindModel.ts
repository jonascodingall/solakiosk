import RecordModel from 'pocketbase'


export type KindModel = RecordModel & {id:string, nfcid: string, konto: number, vorname: string, nachname: string}