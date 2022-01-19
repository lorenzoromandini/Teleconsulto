import { Medico } from "./medico";

export interface Consulto {
    codice_consulto ?: string,
    cognome_paziente ?: string,
    nome_paziente ?: string,
    codice_paziente ?: string,
    partecipanti ?: Array<Medico>,
    oggetto_consulto ?: string,
    data_inizio ?: string,
    richiedente ?: string
}