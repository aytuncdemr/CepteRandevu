export interface Appointment {
    id: string;
    customer: string; //id
    business: string; //id
    category:string; //business category for icon
    service: { worker: string; title: string; price: number };
    date: string;
}
