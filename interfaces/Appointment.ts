export interface Appointment {
    id: string;
    customer: string; //id
    business: string; //id
    service: { worker: string; name: string; price: number };
    date: string;
}
