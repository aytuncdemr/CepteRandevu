export interface Appointment {
    id: string;
    customer: string;
    business: string;
    service: { worker: string; name: string; price: number };
    date: string;
}
