interface LoginData{
    email:string;
    password:string;
}

interface Customer {
    // customers collection
    id: string;
    name: string;
    surname: string;
    phone: string;
    email: string;
    city: string;
    password: string; // encrypted password
    createdAt: string;
    favoriedBusinesses: string[]; // business ids
    accountType: "customer";
}

// ----------------------------------------
interface Business {
    // businesses collection
    name: string;
    id: string;
    phone: string;
    email: string;
    password: string; // encrypted password
    profilePictureUrl: string;
    galleryUrls: string[];
    favoritesCount: number;
    businessCategory: string;
    city: string;
    description: string;
    address: string;
    createdAt: string;
    workingDays: string[]; // sunday,monday...
    workingHours: string[]; // 12.00 12.30...
    serviceCategories: ServiceCategory[];
    workers: string[]; // murat...
    averageStar: number;
    accountType: "business";
}

interface ServiceCategory {
    title: string;
    services: Service[];
}

interface Service {
    workersName: string[];
    price: number;
    name: string;
}
// ----------------------------------------

interface Appointment {
    // appointments collection
    id: string;
    customerId: string;
    businessId: string;
    serviceCategory: string; // Erkek,kadın...
    serviceName: string; // Saç kesimi, manikür...
    price: number;
    worker: string; // Murat
    date: string; // 2023-10-01
    hour: string; // 12.00, 12.30...
}

interface Notification {
    // notifications collection
    id: string;
    title: string;
    description: string;
    createdAt: string;
    isRead: boolean;
    to: string; // customer id
    from: string; // business id
}

interface Comment {
    // comments collection
    id: string;
    customerId: string;
    businessId: string;
    title: string;
    worker: string; // Murat
    comment: string;
    star: number; // 1-5
    createdAt: string;
}
