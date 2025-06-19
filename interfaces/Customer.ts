export interface Customer {
    id: string;
    name: string;
    surname: string;
    phone: string;
    email: string;
    city: string;
    password: string;
    date: string;
    favorites: string[]; //id[]
    accountType: "customer";
}
