
export interface Utente{ 
    id?: number;
    idBanca?: number;
    nomeUtente: string;
    password: string;
    bloccato: boolean;
    Role: string;
    Token: string;
}