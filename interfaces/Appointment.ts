export interface Appointment {
    id: string;
    customer: string;
    business: string;
    service: { title: string; name: string; price: number };
    worker: string;
    date: string;
    hour: string;
}
