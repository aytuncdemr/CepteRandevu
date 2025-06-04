interface Customer { // customers collection
    name: string;
    surname: string;
    id: string;
    phone: string;
    email: string;
    password: string;
    createdAt: string;
    favoriedBusinesses: string[]; // business ids
    userType: "customer";
}

interface Business { // businesses collection
    name: string;
    id: string;
    phone: string;
    email: string;
    password: string;
    profilePictureUrl: string;
    category: string;
    description: string;
    address: string;
    createdAt: string;
    workingDays: string[]; // sunday,monday...
    workingHours: string[]; // 12.00 12.30...
    serviceCategories: ServiceCategory[];
    workers: string[]; // murat...
    averageStar: number;
    userType: "business";
}

interface ServiceCategory {
    title: string;
    services: Service[];
}

interface Service {
    workersName: string[];
    price: number;
}


interface Appointment{ // appointments collection

    id: string;
    customerId: string;
    businessId: string;
    serviceCategory: string; // Saç kesimi...
    service: string;
    worker: string; // Murat
    date: string; // 2023-10-01
    time: string; // 12.00    

}

interface Notification{ // notifications collection
    id: string;
    title: string;
    description: string;
    createdAt: string;
    isRead: boolean;
    to: string;  // customer id
    from:string; // business id   
}

interface Comment{ // comments collection
    id: string;
    customerId: string;
    businessId: string;
    title:string;
    worker: string; // Murat
    comment: string;
    star: number; // 1-5
    createdAt: string;
}
