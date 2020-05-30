export interface Cuser {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    password: string;
    role: string;
    conferences: [];
    sessions: [];
}
