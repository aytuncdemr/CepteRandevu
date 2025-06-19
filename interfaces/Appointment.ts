export interface Appointment {
    id: string;
    customer: string; //id
    business: string; //id
    service: { worker: string; title: string; price: number };
    date: string;
}
