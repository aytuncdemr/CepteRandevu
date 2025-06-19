export interface Business {
    id: string;
    name: string;
    phone: string;
    email: string;
    password: string;
    picture: string;
    favorites: number;
    category: string;
    city: string;
    description: string;
    address: string;
    date: string;
    workDays: string[];
    workHours: string[];
    services: { title: string; price: number }[];
    workers: string[];
    averageStar: number;
    accountType: "business";
}
