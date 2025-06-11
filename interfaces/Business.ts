export interface Business {
    id: string;
    name: string;
    phone: string;
    email: string;
    password: string;
    pictures: string[];
    favorites: number;
    category: string;
    city: string;
    description: string;
    address: string;
    date: string;
    workDays: string[];
    workHours: string[];
    serviceCategories: ServiceCategory[];
    workers: string[];
    averageStar: number;
    accountType: "business";
}
interface ServiceCategory {
    title: string;
    services: {price:number,name:string}[];
}
