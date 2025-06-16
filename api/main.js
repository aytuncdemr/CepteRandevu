const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/v1/business/categories", (req, res) => {
    const businessCategories = [
        "Kuaför",
        "Berber",
        "Güzellik Salonu",
        "Manikür / Pedikür / Nail Art",
        "Cilt Bakımı Uzmanı",
        "Masaj Salonu",
        "Solaryum",
        "Diş Hekimi",
        "Ortodontist",
        "Psikolog",
        "Psikolojik Danışman",
        "Diyetisyen",
        "Fizyoterapist",
        "Pilates Eğitmeni",
        "Yoga Eğitmeni",
        "Fitness Salonu / PT",
        "Kişisel Antrenör",
        "Veteriner",
        "Hayvan Kuaförü",
        "Fotoğrafçı",
        "Özel Ders Eğitmeni",
        "Müzik Öğretmeni",
        "Dans Kursu",
        "Sürücü Kursu",
        "Çiçekçi",
        "Organizasyon Firması",
        "Düğün / Kına Salonu",
        "Kına / Nişan Organizasyonu",
        "Kreş / Anaokulu",
        "Ev Temizlik Hizmeti",
        "Halı Yıkama",
        "Çilingir",
        "Tesisatçı",
        "Elektrikçi",
        "Boyacı / Usta",
        "Kombi Servisi",
        "Bilgisayar / Telefon Servisi",
        "Araba Servisi",
        "Oto Yıkama",
        "Cam Filmi / Araç Kaplama",
        "Emlak Danışmanı",
        "Avukat",
        "Muhasebeci / Mali Müşavir",
        "Danışmanlık Hizmeti",
        "Moda Danışmanı",
        "İç Mimar",
        "Tercüman",
        "Yaşam Koçu",
        "Motivasyon Koçu",
        "Logoped (Dil ve Konuşma Terapisti)",
    ];

    res.send(businessCategories).end();
});

app.post("/api/v1/auth/register", (req, res) => {
    res.send({ message: "başarıyla kayıt olundu" });
    res.end();
});

app.post("/api/v1/auth/login", (req, res) => {
    if (req.body.email === "customer@hotmail.com") {
        res.send({ id: "#12345", accountType: "customer" });
    }
    if (req.body.email === "business@hotmail.com") {
        res.send({ id: "#23241", accountType: "business" });
    } else {
        //nodemailer
        res.status(404).send("no");
    }
    res.end();
});

app.post("/api/v1/auth/reset-password", (req, res) => {
    // ....
    // nodemail ....

    res.send({
        message: `Yeni şifreniz e-postanıza ${req.body.email} başarıyla gönderildi`,
    });
    res.end();
});

app.get("/api/v1/auth/reset-password", (req, res) => {
    // ....
    // nodemail ....

    res.send({
        message: `Yeni şifreniz e-postanıza ${req.body.email} başarıyla gönderildi`,
    });
    res.end();
});

app.get("/api/v1/notifications", (req, res) => {
    res.send([
        {
            id: "1",
            title: "Yeni Mesaj",
            description: "Müşteri destek ekibinden yeni bir mesajınız var.",
            date: "16/06/2025 09:00",
            isRead: false,
            customer: "musteri_001",
            business: "isletme_001",
        },
        {
            id: "2",
            title: "Randevu Hatırlatıcısı",
            description: "Yarın saat 10:00’da bir randevunuz var.",
            date: "15/06/2025 08:30",
            isRead: true,
            customer: "musteri_002",
            business: "isletme_002",
        },
        {
            id: "3",
            title: "Ödeme Başarılı",
            description: "Yapmış olduğunuz ödeme başarıyla işlendi.",
            date: "14/06/2025 12:15",
            isRead: true,
            customer: "musteri_003",
            business: "isletme_001",
        },
        {
            id: "4",
            title: "Yeni Kampanya",
            description: "Tüm hizmetlerde yaz indirimlerimizi kaçırmayın!",
            date: "13/06/2025 15:45",
            isRead: false,
            customer: "musteri_004",
            business: "isletme_003",
        },
        {
            id: "5",
            title: "Hizmet Tamamlandı",
            description:
                "Aldığınız hizmet başarıyla tamamlandı. Teşekkür ederiz!",
            date: "12/06/2025 11:00",
            isRead: true,
            customer: "musteri_005",
            business: "isletme_002",
        },
        {
            id: "6",
            title: "Geri Bildirim Talebi",
            description:
                "Son ziyaretiniz için geri bildirim bırakmayı unutmayın.",
            date: "11/06/2025 17:20",
            isRead: false,
            customer: "musteri_006",
            business: "isletme_003",
        },
        {
            id: "7",
            title: "Güncelleme Bildirimi",
            description: "Hizmet şartlarımız güncellendi. Detayları inceleyin.",
            date: "10/06/2025 10:00",
            isRead: false,
            customer: "musteri_007",
            business: "isletme_001",
        },
        {
            id: "8",
            title: "Abonelik Süresi Doldu",
            description:
                "Aboneliğinizin süresi doldu. Yenilemek için tıklayın.",
            date: "09/06/2025 09:30",
            isRead: true,
            customer: "musteri_008",
            business: "isletme_002",
        },
        {
            id: "9",
            title: "Hediye Çeki Kazandınız",
            description: "50₺ değerinde hediye çeki kazandınız!",
            date: "08/06/2025 13:40",
            isRead: false,
            customer: "musteri_009",
            business: "isletme_003",
        },
        {
            id: "10",
            title: "Güvenlik Uyarısı",
            description: "Hesabınıza yeni bir giriş tespit edildi.",
            date: "07/06/2025 21:15",
            isRead: true,
            customer: "musteri_010",
            business: "isletme_001",
        },
    ]);
});

app.get("/api/v2/customers/:id/favorites", (req, res) => {
    // ....
    // nodemail ....

    res.send([
        {
            id: "1",
            name: "Güzellik Dünyası",
            phone: "+90 532 123 45 67",
            email: "info@guzellikdunyasi.com",
            password: "hashedpassword1",
            pictures: ["https://example.com/salon1.jpg"],
            favorites: 120,
            category: "Güzellik Salonu",
            city: "İstanbul",
            description: "Profesyonel bakım ve güzellik hizmetleri sunuyoruz.",
            address: "Bağdat Caddesi No:25 Kadıköy/İstanbul",
            date: "06/11/2025 12:50",
            workDays: [
                "Pazartesi",
                "Salı",
                "Çarşamba",
                "Perşembe",
                "Cuma",
                "Cumartesi",
            ],
            workHours: ["09:00 - 18:00"],
            serviceCategories: [
                {
                    title: "Cilt Bakımı",
                    services: [
                        { price: 300, name: "Klasik Cilt Bakımı" },
                        { price: 450, name: "Anti-Aging Bakım" },
                    ],
                },
                {
                    title: "Makyaj",
                    services: [
                        { price: 250, name: "Günlük Makyaj" },
                        { price: 400, name: "Gelin Makyajı" },
                    ],
                },
            ],
            workers: ["çalışan_001", "çalışan_002"],
            averageStar: 4.8,
            accountType: "business",
        },
        {
            id: "2",
            name: "BarberKing Erkek Kuaförü",
            phone: "+90 530 987 65 43",
            email: "iletisim@barberking.com",
            password: "hashedpassword2",
            pictures: ["https://example.com/barber1.jpg"],
            favorites: 85,
            category: "Kuaför",
            city: "Ankara",
            description: "Modern erkek kuaför hizmetleri, tıraş ve bakım.",
            address: "Atatürk Bulvarı No:10 Çankaya/Ankara",
            date: "06/11/2025 12:50",
            workDays: [
                "Pazartesi",
                "Salı",
                "Çarşamba",
                "Perşembe",
                "Cuma",
                "Cumartesi",
                "Pazar",
            ],
            workHours: ["10:00 - 20:00"],
            serviceCategories: [
                {
                    title: "Saç",
                    services: [
                        { price: 150, name: "Saç Kesimi" },
                        { price: 70, name: "Fön" },
                    ],
                },
                {
                    title: "Sakal",
                    services: [
                        { price: 90, name: "Sakal Tıraşı" },
                        { price: 120, name: "Sakal Şekillendirme" },
                    ],
                },
            ],
            workers: ["calisan_101", "calisan_102", "calisan_103"],
            averageStar: 4.5,
            accountType: "business",
        },
        {
            id: "3",
            name: "Elif Spa & Wellness",
            phone: "+90 505 456 78 90",
            email: "spa@elifwellness.com",
            password: "hashedpassword3",
            pictures: ["https://example.com/spa1.jpg"],
            favorites: 200,
            category: "Spa Merkezi",
            city: "İzmir",
            description:
                "Rahatlatıcı ve yenileyici spa deneyimi için sizi bekliyoruz.",
            address: "Alsancak Mahallesi, Cumhuriyet Bulvarı No:55 Konak/İzmir",
            date: "06/11/2025 12:50",
            workDays: [
                "Salı",
                "Çarşamba",
                "Perşembe",
                "Cuma",
                "Cumartesi",
                "Pazar",
            ],
            workHours: ["11:00 - 22:00"],
            serviceCategories: [
                {
                    title: "Masajlar",
                    services: [
                        { price: 600, name: "Aromaterapi Masajı" },
                        { price: 750, name: "Derin Doku Masajı" },
                    ],
                },
                {
                    title: "Vücut Bakımı",
                    services: [
                        { price: 400, name: "Vücut Peelingi" },
                        { price: 500, name: "Detoks Bakımı" },
                    ],
                },
            ],
            workers: ["uzman_201", "uzman_202"],
            averageStar: 4.9,
            accountType: "business",
        },
    ]);
    res.end();
});

app.get("/api/v1/customers", (req, res) => {
    console.log("HIT!");
    res.send({
        id: "123",
        name: "Ahmet",
        surname: "Yılmaz",
        phone: "05321234567",
        email: "ahmet.yilmaz@example.com",
        city: "İstanbul",
        password: "FakePassword123!",
        date: "22/07/2025 14:52",
        favoriedBusinesses: [],
        accountType: "customer",
    }).end();
});
app.put("/api/v1/customers", (req, res) => {
    console.log("HIT!");
    res.send({ message: "Değişiklikler başarıyla kayıt edildi" }).end();
});

[
    {
        id: "1",
        customer: "müşteri_001",
        business: "işletme_001",
        service: {
            title: "Cilt Bakımı",
            name: "Klasik Cilt Bakımı",
            price: 300,
        },
        worker: "çalışan_001",
        date: "12/06/2025 10:35",
        hour: "10:30",
    },
    {
        id: "2",
        customer: "müşteri_002",
        business: "işletme_002",
        service: { title: "Masaj", name: "Aromaterapi Masajı", price: 600 },
        worker: "uzman_001",
        date: "12/06/2025 11:15",
        hour: "11:15",
    },
    {
        id: "3",
        customer: "müşteri_003",
        business: "işletme_003",
        service: { title: "Makyaj", name: "Gelin Makyajı", price: 400 },
        worker: "makyöz_001",
        date: "12/06/2025 13:00",
        hour: "13:00",
    },
    {
        id: "4",
        customer: "müşteri_004",
        business: "işletme_001",
        service: { title: "Saç", name: "Saç Kesimi", price: 150 },
        worker: "berber_001",
        date: "12/06/2025 14:20",
        hour: "14:20",
    },
    {
        id: "5",
        customer: "müşteri_005",
        business: "işletme_002",
        service: { title: "Tırnak", name: "Manikür", price: 120 },
        worker: "çalışan_002",
        date: "12/06/2025 15:00",
        hour: "15:00",
    },
    {
        id: "6",
        customer: "müşteri_006",
        business: "işletme_003",
        service: { title: "Vücut Bakımı", name: "Detoks Bakımı", price: 500 },
        worker: "uzman_002",
        date: "12/06/2025 16:30",
        hour: "16:30",
    },
    {
        id: "7",
        customer: "müşteri_007",
        business: "işletme_004",
        service: { title: "Sakal", name: "Sakal Tıraşı", price: 90 },
        worker: "berber_002",
        date: "12/06/2025 17:15",
        hour: "17:15",
    },
    {
        id: "8",
        customer: "müşteri_008",
        business: "işletme_002",
        service: { title: "Saç", name: "Fön", price: 70 },
        worker: "kuaför_001",
        date: "12/06/2025 18:00",
        hour: "18:00",
    },
    {
        id: "9",
        customer: "müşteri_009",
        business: "işletme_005",
        service: { title: "Masaj", name: "Derin Doku Masajı", price: 750 },
        worker: "masöz_001",
        date: "12/06/2025 19:30",
        hour: "19:30",
    },
    {
        id: "10",
        customer: "müşteri_010",
        business: "işletme_001",
        service: { title: "Cilt Bakımı", name: "Anti-Aging Bakım", price: 450 },
        worker: "uzman_003",
        date: "12/06/2025 20:15",
        hour: "20:15",
    },
];

app.get("/api/v1/appointments", (req, res) => {
    res.send([
        {
            id: "1",
            customer: "müşteri_001",
            business: "işletme_001",
            service: {
                worker: "çalışan_001",
                name: "Klasik Cilt Bakımı",
                price: 300,
            },
            date: "12/06/2025 10:30",
        },
        {
            id: "2",
            customer: "müşteri_002",
            business: "işletme_002",
            service: {
                worker: "uzman_001",
                name: "Aromaterapi Masajı",
                price: 600,
            },
            date: "12/06/2025 11:15",
        },
        {
            id: "3",
            customer: "müşteri_003",
            business: "işletme_003",
            service: {
                worker: "makyöz_001",
                name: "Gelin Makyajı",
                price: 400,
            },
            date: "12/06/2025 13:00",
        },
        {
            id: "4",
            customer: "müşteri_004",
            business: "işletme_001",
            service: { worker: "berber_001", name: "Saç Kesimi", price: 150 },
            date: "12/06/2025 14:20",
        },
        {
            id: "5",
            customer: "müşteri_005",
            business: "işletme_002",
            service: { worker: "çalışan_002", name: "Manikür", price: 120 },
            date: "12/06/2025 15:00",
        },
        {
            id: "6",
            customer: "müşteri_006",
            business: "işletme_003",
            service: { worker: "uzman_002", name: "Detoks Bakımı", price: 500 },
            date: "12/06/2025 16:30",
        },
        {
            id: "7",
            customer: "müşteri_007",
            business: "işletme_004",
            service: { worker: "berber_002", name: "Sakal Tıraşı", price: 90 },
            date: "12/06/2025 17:15",
        },
        {
            id: "8",
            customer: "müşteri_008",
            business: "işletme_002",
            service: { worker: "kuaför_001", name: "Fön", price: 70 },
            date: "12/06/2025 18:00",
        },
        {
            id: "9",
            customer: "müşteri_009",
            business: "işletme_005",
            service: {
                worker: "masöz_001",
                name: "Derin Doku Masajı",
                price: 750,
            },
            date: "12/06/2025 19:30",
        },
        {
            id: "10",
            customer: "müşteri_010",
            business: "işletme_001",
            service: {
                worker: "uzman_003",
                name: "Anti-Aging Bakım",
                price: 450,
            },
            date: "12/06/2025 20:15",
        },
    ]);
});

app.get("/api/v1/businesses/", (req, res) => {
    res.send([
        {
            id: "1",
            name: "Glow Beauty Salon",
            phone: "0555 111 2233",
            email: "contact@glowbeauty.com",
            password: "hashed_password",
            pictures: [
                "data:image/jpeg;base64,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",
                "https://images.unsplash.com/photo-1613470208960-9d9e5a7d09c8",
            ],
            favorites: 120,
            category: "Beauty",
            city: "Istanbul",
            description: "High-end beauty treatments and skincare.",
            address: "Nisantasi, Istanbul",
            date: "2023-01-10",
            workDays: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
            ],
            workHours: ["09:00-18:00"],
            serviceCategories: [
                {
                    title: "Facials",
                    services: [
                        { price: 250, name: "Hydrafacial" },
                        { price: 180, name: "Deep Cleaning Facial" },
                    ],
                },
            ],
            workers: ["worker1", "worker2"],
            averageStar: 4.8,
            accountType: "business",
        },
        {
            id: "2",
            name: "Elite Gym",
            phone: "0532 999 8877",
            email: "info@elitegym.com",
            password: "hashed_password",
            pictures: [
                "data:image/jpeg;base64,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",
                "https://images.unsplash.com/photo-1599058917212-d750089bc07b",
            ],
            favorites: 200,
            category: "Fitness",
            city: "Ankara",
            description: "Premium fitness center with personal training.",
            address: "Cankaya, Ankara",
            date: "2023-02-12",
            workDays: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
            ],
            workHours: ["06:00-22:00"],
            serviceCategories: [
                {
                    title: "Fitness",
                    services: [
                        { price: 300, name: "Personal Training" },
                        { price: 150, name: "Group Class" },
                    ],
                },
            ],
            workers: ["worker3", "worker4"],
            averageStar: 4.5,
            accountType: "business",
        },
        {
            id: "3",
            name: "Fresh Cuts Barbershop",
            phone: "0544 123 4567",
            email: "book@freshcuts.com",
            password: "hashed_password",
            pictures: [
                "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExMWFhUXGBgYFxcYFxYXHRYZFxgZFxgVFxcYHSggGB0nHRgVITEhJSorLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGy0lHyUtLS0tLS0tLS0tLS0tLS8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIALcBEwMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAFAAIDBAYBBwj/xABNEAACAQIDAwgGCAMGAwYHAAABAhEAAwQSIQUxQQYTIlFhcYGxMkKRocHwBxQjM1JystFic5JDgrPC4fEVNMMkU2OipNIWRFR0g4Sj/8QAGgEAAwEBAQEAAAAAAAAAAAAAAQIDAAQFBv/EAC8RAAICAQMCBQIGAgMAAAAAAAABAhEDEiExQVEEEyIyYYGhcZGxweHwUtEFFCP/2gAMAwEAAhEDEQA/APJubHV7hXebHV7qkikBXOXGBR1e6ulBUgQmpsThGUKSD0lzDukjzBpbDRVy10LXctT4fDM5hQSeoa1gEAWu5ale2QYIg02KARmWuZafFIiiAjYVDcbQ1ZiontTXTjlaohONFdUB9Y+79qju4biCaL7K2dbdwrZtd2sTG8eytPhuTuFIMIxKkgy78N+48RXVHG5LY5J5lje552lrrNW7VhOIrX4HZOGzX0dRIg2yS25twidY0E99EcNs3DklTaSViZEyCoObwNGOFsXJ4lRfU8+WyoO4EUQstb/CvsFabHYK1bugc2kFXUwq+kCpB17M1IvbiObA3blTh40fKaF89NWZe+yHQR7qsWIAiOHUfbR69jgLYtgGDcSJC8GzEaHdpRC3tNJBZWfSIMburRqzhXAVlvlfcyjXxuAPsNRYawSwYKxJ0EDfxojjyoUt0p3D0d57j31ZwuVAkgnKQ2mXfx40ulja41YPtOW9FSfZVe/bJYqdCN4jNH9M9dEbt1LS5lmeA6O/h626oMBdRVJbOWbfCT75HfWa6BUtrovbG5OJdGl+5oJhMNcaPEkCge0rQtXmRM1xeBICk8DIkgazxNEX281tWtWCwNwFWkAHKRBAMyD28KpX0ysB1Ko91JVPkaLbu0RYK5LnolTrIJ46UW2Bs36y9y3myiSxMToGjd3kUHwn3rfPAUZ5MYprd1ypiZB1jSZ6j1CmirdME20rRp8DyS+r3LDi6HHOARlynUN31i8WPtrv8x/OvQNmbVe7iMPbaIN0etO5W4ZRWBxw+3vj/wAa5+o1OSrNXwv1Y+Nt4rfcFbS9Ne4+VEbX9n3HyobtL017j5UStf2fc3lTmYQ2T/zVr8tz9NHQwW3J3Q/ECewSd9Zu1eKXrbASYcDWN4Amjlp7anpvmcZtIMLrplXhNOiUuR1vBEiVsOV4EsF07i0ilVkYpDJ5zifxdZpVtgbmGu4bv9pFRHDjt/qb969r2/8ARNMthbgYfgeAe4MND4xXnG1+TV+wxW7aZT2jf3HjXl6muT1aT4M/a6Jn9/3rUY/liblm1aOHsnm1y5mTMTrMyd2+s5ctEcKjK9lZxUuTJtDsReDGcqj8ojyq9yf21cwt1b1qA67pAPZxoW5IG6m2LmYTFHTsC9wntnaLYi41x4zMSTAC+4Chxtjq86f4UqHARotj5NPikKdFC2YjiuRUhXsppXspoypitXsKzeKsCDBBkHqIo/d5Q2s+fo2yQAwQNrpvMzJ7aztxdKZYtMzZVWSd27q7a7seR9Diy4k/cGb23bXOB1g9Eq0g6g7jw3amo22ymcv0iSIJjfpEHXsFU22Je9IgAA8SPhXLdpomVA7TVW5dSKjjrb8DSPytwsWgcK7lSxfMqHNmRlAEk7jlPgap4Lb9lHDHBhwPVYCD7VNBTh9ZLLvHHdOk1aa0QPTHsIra5MCxQS/kv7Z5SJeNsJgbdrKxY5cvTncD0Ruquu02DBhhrehBggEacD2VVtWlLavwmQsx2b6uPh0iRcJ7Iy/A1vU9zVBbf7GbV29dxBVTYw9vKSw5tMsk8GMmQOqo7eJvLMLa161B8xUdhU1Jns6QGnb0TXcVcUCAGk6CWnvMZBQt8jJR9qRRJYtqVEboHWdaebr6gOPZV+xcRACbYY8cwUj2Mpqrjb5usrgBJBEIqoIDECQqgT2xScFFuLCL0QW1PSk+DVPjfvB+VfKq1tzkWTOra/1Vb2ksXFH/AIdv3qDW6oPcp4T71vngKmwp1cwT0j29dQ4X7xvngKL8mcI1y5cC2zcgMSAjPAB1YhSIHb20Ur2A3W5oOROybgxeDvlfs2ub51Mo4GnfWX2h/wAxf/nXP1Gt5sw4m3cw2a26WVurE23VRowEEmN5rBY37+9/Nf8AUam1WWvj9xoNvFfyCtpemvcfKiVn+y7m8qG7S9Ne4+VErW613N5VQD4O3h9pb8fNa1O1ZW2xSMxe2B3soHxrLXvvbXf8VrTbT2hZQZWaXD22yL0icqg69QkcaboTfKKAu4kadHjw6zNKuXNu3CSRYQDqLmfGBSoenuapdj0fY/LS6mjGRw+ePjWtw3KDDYlcl5UKn8UEe/4V4qt6KvYTGkHfXA4NcHpak+TZco/o3w15mOEurbfU825JU9zb18ZrzjbPJLFYb76yyjgw6SnuYaVrMTi3UB1JGZd/A6Hq3ejWl5HcsPsjbxAzCQBOvRyroZ38amkUfB4e9k6iDubXTgpNVMCOj/tXunLjYWzrmExGJsxbupbdgEMBiFOhXh4RXlex+S2IuYP61btl7edlJXpEZYklRqBrvp79LJ1uB47PL96tXsIgtI4uqWYnNbhpSNxJiDPYa49kioihpeQnMNbBYBnCjrIY/pBqXHWVR2VLguKCYYBlzDrhtRVTDMWEnrNSkVmtzWRLckxlPfp+9Ppwp0ULMRFaZmKmRUzCmOtVxzpk8kLQUs8qryrkFuyRDLLLJ6R3z1jcKD28Y8EQvHhO/qpgcLMrmrn1oTpbFdupvlnB5ai9kEDty+LXNA28uvqCdTJ1NRWMZdUhluAEQQcqmCOw6USXlJlt5BhcPuIkgE6iJnLVLDbUdGDi3ZkToyFhrG8adVH6iq/8f0K9/G3bjZrl0sQIBhRpJMQBG8n21G7twd54GYq1d2pcuFiwtLmbN0bccAIGug03d9QJiXDhgVkGR0Fie476Ayvt/fyEASoBZyBuE6DuHColsEmRqOstHvmr2M2leujKXBGugS0m/fqAKq30ZIDZRO6Gtt7cpMcN9Z1YYqVbkZXpZSdxHrEg7uO41Yver3N+tqjvLDR+TyFTYgaWu1W/xrg+FL2H7ldPQHe3+aie2zN5T12bJ9ttTQ1PQHe3+aie2/vLf/2+H/wlrPlBXDBuF+9b54CtLyE239VvXmyF86NbgHL6TAzMHq41mcL963zwFX9kem/5h+sU8eRJrY9Rwm1PrTYdTzgAvoABAtJ6XpNM3GPaAOpRvrzPawH1rExu5+7HdnMUU5bY6+LGEe2WRWtG44t5lQOXyqTB0O8CTWUOKCzxOnkKm1eTV8Bx7Y6+Rm0/TXuPlVu5jVVbZmcoMgdtBr+Id2EgDqohbwIhJJOYGerSmseu40Y83XAg9gHhx9laTC7BYKS7BB+FNSejm1c6ceo99CLWG6aBQBEnUqu6OLESezea2t9jAA9Z0U79xVQaKViSlXBXXY+H/wC6B7TJJ7yTJrtXmQgnU0qNE9TBBSnolPipkWuRs9CjQWrWbCp2Bv8APWfdyu7qU+6tNgv+WH9//PWcupPsFQh7isvaUtq45jZuA/hIox9GG37tnDC0h0OIB9uQHwoFtVPsrn5TU/0ej0f5nwU1WaWlk4v1HqN6xs/HZhftrbuTHOLCE6DpEjQ+M1ltvfRXctzcwzrdQakaK0DXuPzpS5UA2rq5T6oPjJpuA5T3gpQMRII9oiopWrKXvR5fgbMpMcTU6XnQNkYrIg5TEgaxpXo30X43CNgOYxVpXHOOQxGonLuO8eBqXlXyCsLbuX8JfWEtPcNtzrlVSSVIGu7cfbRlyCPB5fZumARpx7eun3lZic4JadZmZ4zxmrFzZV21btM6Mq3EV0JEBlIBBB46GqodpaWOh6+sA/Gg/gP4nRbA4AU008MD608PhFdZQNF1HXu91KYpYhJ4VAX3xlH90edXrgqm1vXv3aV2YZ3scuWHVHAdPS8q6kR6Xz7Kfaw7aj5866lpoqxGhqqImSe7/auW1G8zB461ILJgCfKpXsAQJgcdx92lG0CiKyg1OaCRppJ7BqRFImVU9reS1MV6QGmhMQoWQVB1A7+s0zL9mh/ifyt/vQsah+MWH8LR9qIfjT8UdLX5G/x71O2oIuD+Xh/fYtGuYtIFg/itufZiL6/5TQ7f3obuVl9Ad7f5qL8obWW5Z7cLhm/qtA0HUSgEgSWEmYEyJMAn2A0sal62VD6s1tGUnijCbbDsyxFbqg9DmHYC40/OgqzgMSVZsokltOPrSNBvoXh7RdiHPfHhRXY+FBfKDlAddYJ3NxjWmQHRrtg2Ll3EYZMU5ayt1V5kkZSAGaCi9Aax1nWsntiwv1vE5RCi/eCjqUXGCgeEVqHxBS/Z/mST/dI0rLYppvXT13HPtM0kl/6uu37hg28W/cF49YdfHyoqv9n3Ghm0PTXxoku633GnAxzfeJ88Vr0LC3tJFzL/APrWmKkaSGLyx03mK87J+0T59Za2mxsO13nS2It2lQkdIEsfvIygDX0RxG6qRlGKtkpQlJpIOXtogH71+H/y9g8N/p0qoJYw3G9cJk6i2omD1TSrebH5N5EvgCvcA4ipbV0V6v8ARxhl+pKSoku+sD8UfCtO2zrR32kPein4V43/AGW5NKPHz/B6GyPINl35sOOp2A8beb4mhjjU9y+Vei8vtn2bOGzW7SIxeCUVVJm2+/KNd3GvOrJkeA8qbFLU7KN3EG7XH2N38h8qf9H4+6/nge1Vp210+wu/kbypvIwELa6zeWPELV5P0snH3Go5XGbg/LHsZqC4S30h3ithtzkzjLrlltSI/Gn/ALqz17Zd7D3FW8hQmCNVMid/RJqUJxcaTGfJk+TAP1bT8Z8lo86sMFiHk6Ky7+DLBHvoLyVH/Zf75/StaW7H/DcV8+qaeb/UECbk5yncYOwlxFuWbKIjW3UMGUrlG/iCBrVPk7yXw20Ti2t3BYuDEOLVs6qbeRCo69Dm114aVW2Ag+pN+W351Q2SkWrjAkEYq4AQYI+ztcRu3mlfUZdALd2PeW0buU5C7gMIgkXWtkf1Ain808ZAlwMIz9KQdSVhY007TV9MW31ZrUyovaD/APPm85PjRbAW8169pxT9NLLrYy+DIXsE41CGOPXQq9fAMHfXqOIwIyt0eB8q8yx+Hm9oJ6MxHUBJo45WwTjsS2r4iZ7/ABqZrbBBc9QkqG4EqASPAEe2qtuyYOVZIHAExoddKLm3iSbV4i2rqBkTmWXMLek5IhvQMk79Zroc2iCxoF88N86V1sUkb6WNw92S11QCSdyFR3AQAO4VBf2fcCW7hXoNcKq0jVlEsImdAR7RTahdCCjJFwDu/wAFDVRj9nb6s1z9NqfhU+Ivzcld8xJEDS2qkdh0PuqiVJRTJElhEzuCajqmfcKoicibHYxWcMDplsgdpS0inTvU1HibTgWyGJDoXWd6rztxCscOkjn+9PGn4xRzm71bPiebtyT2kyT2k1NjTpY7LTD/ANRiD8aPY3cH27HRBOp1+PCjfKF81yzPDC4ZfBbQAoUnojx+NEdst9pb/kWP8MUH7kbowdhfvG+eAojsb7w/mH6qG4X7xvnqolsP7xu/41RCSNZtnCRYs31RlRrsdJlkxm4DXt3QKxLN03/Ma0m0sQzWlUsYW4IHAb5+FZcnpN30ltzt9h6ShSKm0PTXxokDoncaGY70l8aIjcncaYXodB+0T59ZaOK/TeOLN/1hQJT9qnz6y0atnpv+Zv8ArUXwBe4P27GnifM0qnW6vvPnSqOplKNlyN5UYbD4ZbV1irBmJ6LEasSNRNaBeXGD/wC9P9LftXk0CoURedb8q+8sD5CvPl4RanJN7vc6LXU3XL3lNh8RhsllyzK8t0WAA5t+JEesKxWzjIPh5UO2ljEQXBzgBmcvegX/AFqTk/jFdGIO4ge7tq0MWhUHVtRZ2yPsLv5G8qh5LXgEsNwW9bn2im7Xxts2bozCSjDeN8UP2Li1TDdKZF1TAEkgZZj300o2gJ0z6HTlFhf/AKi1/WKw/wBIGNt3rto2riuAhkqwMGd2lYaxtO3dAnOCrR0gZYZDrpOk+VWbmORFZp1gwDIkwYGoqOPDp5fBjv0Zc3/2fPlyZzmzRHo8Z06q9T5VvhPqGKCmxJw96ADbmebaIjjNeL8loXD5WIBDHQsu6F7e+q+2dohWdcsg2yJB3ZgR+1GWK5XZjdfRrsyzfRkvejzaetl49YortDkjhFxFrDWWKJda5cch85zBeGaY9EaV5Vhdt5baplkBYOu/qiubK2kPtNNGct1kE9ZnXcKWWOVt2MmelYj6LrfOczaxLARzhLoG/tAYGUr21aw/0e37b3HW7bYMRA6SnojLJ0NeV2QxhELM7EFejGZiwIWc2kkxVyxj79ku1xcskCM4kECD0Q0jdx3xQcJ9zJl/ldjr9m+bIuZQBlYAKQSGZTqyzwrLXcOWxIUbyj/pB66ubUxT3nV8snLBygnczUL2lfIuZlMHcCJG9dfKnjFp0M3tZLs5VLDMSqnLJAkgT1ca0uIuZk2aRErZuKe0szxJLcSra/xdlZW1tDKwPNJCqoIh4crrmYMTBJ3xA00irWL2rnUHmo5vKLeUAJbAJJBUgsZZiRBEdtXfPBNcC2sihEIdmJLAggiNeBJ1rmJvThMOvViLzHxtoPhVXaG0ud9QKBwWdSdWbUneahuueatERAuXBG9vQAzERoJmK29AtWXMbcBMDgR7rVtT7wapE9BO9vJK6zyT+ZvIUwnor3t5LXRHghIlxRl/C17kQUsQfu/yN/i3D8aZdPS/o8lrt0+h+U/4j0ewvcjX0R4/Gr21T9on8m1+gVQU9Ed5+NW8e0uv8u3+ms+UboyphT02+eqimwFm43efOPjQnDnpt89VENjHpnv499MBmu5T7D5jDWLvPI/OMDlG9ZBOuutYWeke+i2NtMBOa2wkSUdW1g8N9B51Pf8ACpY1JP1O2PJpx2K2NPSXxokToncfhQvFnpDuNEmOidx+FVF6CQ/aJ8+stFkt/aXDHrN+o7/Cg9o/ap8+staNdnXiXZVBBJPpr1ngTpRptbCNpM6jrXaYMBe/B/5l/eu1PRLsHX8l87UtEf2k/wB0fvWX2tfzXTqTAgT1SeqpQ1C8RcOdtDv6iag40dSdkoanBzVcXexv6TXRd/hb+k0KCS326J7qm2feI3EiqbuSCArf0mpcMrD1W/pNatmbqGUxbSvSPHieo1I1sPoXC9pBPhpQtL2o6Lafwnq7aObGS22t/nUWNObCZp4TmBAHh40qqMGHdyKdjC83P2ouSeAIy79NfnSrNnF4GCuIFx3E6BioGYLI6Op3DqopcweFJ9PEkfxG0P0oD/tUmF2fg1MnnPDU/wDmNT85JVvY/lNuwPztsnPhsGrLOnOZzGnU1whvEUSvYfFYsJmtWrYQQot2mG/fKrC0V5zBAaG+T3JTNm2PrV1bVhmBZioLtAlVLncJ3CpvLJ20qH8uK5ZQt8lWA+1Zx3W7i/5TVrZWyLb3DbsWBdugSZOsDiS47qP2OTljC3sm1LyFHTNbh7iDMHAIJEE6Ee013F8uQivhMIoRLTAW7wYklZncw7xqak5Tm6jb+yBqiuEYzlFjbtq5zXoFdGAAEEMVK6DsrPYohr0OxAIMnfHR6vGtDtfCm+5utc6RktpvJJYn2ms5ek3Jkbo9orvxQSI5Jutx2y0RnXMCFgBjOYk8TB8q0m0NnE2sBlADPadm1jNkuO4LTxAYjXqoDhJUz2d/DXfV9sfcJR82qBgCVXQNM6Ze0+2r07OfUqK217CBFyyGkyCAB4Eb6rNbIs2jH9pcExoeikjqMae2rOLvFwJMxMaAb+4Ux75NtLUCFdmnXewAOkxuVfZRUdhXPc5zoJh0UiWAJHWAZkQ3v8K5d2WjKhQsu+SYZZMcdCo76mxaayCN4HiLaT75qqhdQpUxqfJaZRQjm0R4zZN1TuVhpqj23mI/CxNUroIyz1H9bUdw99S4z9Buj01iOG9ToR31f2phmuQzJbuCN6oiGATvVAK2iVWMssG6ezMap6I8fjV3aB6Y/In6av4XYvPsEtLDfhLqs9YGdhJpm3tk37Vzp2nEKoJy6THAiR76RyWpIppelsC2D02+eqjfJPZ73rpW2pYjUxwGYCfaRQO2pDNII7wR1Ud5Ii8bp5mMxzbwIiZO8gdXGqJk5J9DZcteTNrDYQOhaTcQazB37jXmZOp769M5Y43EnAravMpAdIgoSInq18Ne+vMWOp76W25b/YKVQ6/UrYo9MeNEn9FO40LxB6Q8aJXD0U7jRD0FYP2i/PrCvYdlclLptq630UOA0QfWEwfbXlOwNnPiMSltCoaC3SbKIUgnWvaMByfwuRA9oZsq5iHbVoGb0W653VfF1ObN0EnJTQTiXn+HKB4DhSqccmMFxX/+l0e4tSqtkjxINR/ANghl5y07Hm1zdOAWnUiBuoAmzHO9z3AAecmiFrZR7Tw3n4V42acZKrPbxQlF3QZuYjB+phvbcY1Ud7Z3W1Hia7Z2cVGgPvPvNS/VG6j8+Fcqa6HTv2KwQHgB41Ys2LfE1w4dqYbTfP8AtR56i8dA3hEwY9MOe4gVd+tbNA0s3D/frMNZcELBJPACTr2CuOpRgHUqdNCIPsNaOBt8glnS6Bu9jcMxC2sOcxMABixJO4ADeeynY3YmJWzeunDPbFtc2o4QSW7YFZ7kbjkt4iw9w5UW4CxPAddet8pOVmBbB4hUvoxazcUBZJJZCAN3WaXKpYpqMY3+fcn5rmrMZ9Gd6xztz61kAyD73KBmza6NoDvq7yx2in1rD/8AC2tm6uYTZCEBiMusDL6JO+sTyc2Rdv5LVtZNzQHcAF1Yk8ABVzB7c/4c2Ks2Mly4XyrfBkKoUTzfbM69ldMvDp5XJO/jp2Iqeysr7e2riMTbFzFXg7qzKqwilQLkEQoH4aoWsQA7mR6vHvFCjJniSSfEmrlm0Y6IaTo2uhEgge0eVdKxqKpEnMJpi9N00PuEkyRFWkzQAQY8Y136eAqQWx8mnjCiU52VktaHWIjSdTPVVktrbuwnRKjJ182F6TDqbj1kNUhRfk1HlXr91U0EtZXcSSYAkzA4TwHZUL2jppRBFXr91dZRTKAjmVsRb1G+NDAjii9lVTZ6I37z5L2UVJEjw9ygVA4lV6XE6R3a9v8ApTKArmUb1rXwXj2CpbGJe3lg6QdP7zVYv2xm1OsJ+la5dT0e4/qatpFcrsJ4XEWr4i4ozew+B41JjdhmZttmEDSYO72H3UC5vSe/40Vs7UZGAbUQuvEae+qRjF7SJ65w3g/oDr1sA5XUgjg4/emWtm5jmthlj0sizPf1Vq1xKXV1AYdR19nEVXw2zctwPYutbIPEnTXgw1jvqeTC1wzoxeLjL3KjMY7D3ABJkA/hg+MaVn7npHvr1/lltA28Pbm4txy2R9F6QhumI1G4ceNedDCWT6seLH3kmudKUZer7HXqhOHo++xmr56QojcPRXuq7e2XaPH9QqC7s5gBlJYdRjTxpr3A47Fzko8YpTp6Db/CvSsJtq4vAEfw5j7TNeUbOuczeD3EfLBByjrrc7D25hoOS+6k8CFEmunHOo0c08dytmrXbtz+L2D96VBjtRvxE9uYfEUqpq+Celd/7+YVw1rCL1H2/vVn/iGGXco/pNYMY09ZpjbR4TXyy8NKR9M86Rt8Rtm1wVfYaD43bC9nsNZ+1iC2bXd+1UXvds6fvXRj8Gr3IT8XtsE8dtaQco4HfFDsLiyYzGZYT7fdVK/d0PcascmcfbtMS9lb0jKockBWPrkD0oE6HrrtjhjFbI45ZpSe59D4OwAigQAsFRA0IEAjTf215n9Lel/DmdSra9zLHmap43l/jLYVUa3u35JPnFBmbGbQuAuWuMJywAAo3mANBuFeX4PweXFkWSbVb9S+XJGScYmb2ahZSB1/tWus8mOatG5inFlGt3CubQuwU5VVd51iq/IfbmGweHu3nQXcTzpW1bO4KEQ843ZJYQN8UD25t+9i7hu3nLMdAOCj8KjgK9d23XQ5lUVZev8AKe62Es4VIt20SGy6G6TvLtxH8O7voEu8/PCo7b6cas3sKyMVO/Q8DvAI9xFOkkTbbLWCSG9ILIO4jUMNRIPEEgjvFG0vKoyyADvjcY3UBuYB1MMIMKd49YBhu7CO6rFi2eImg1YjCTkHcR4VAyUuaHCnBwBr5GmiSkyEIaaAf9asc6I4VHK8CKcUbGnA+2ug9VdDL2e2mkb/AN6Io/Ju3a93yKa6DKNeJ8hStgR1R31xgI9vwoijMTZg750UyTrLAE+dK8hi32of8S4PhU2KKyJMdFPci1DizMEmJHRAEAAEjQDd0sx7yTxrXwHuQxpvqTFCSNfVXyqCRUuI9IflX9IratzVsRYfEMjEqY+NGtn7SDmPRafb40CjWlb3nvo6mK4Jm0vXyRB1E6gxQu7smzc9Em23tU+H7GoHxDpbV2HRYjpTO8Hh4U7D4ue6htYqcorYobQ2bfs6kEr+JdR48R41At86a+f71qsPiyI1nsNK7grF86rkb8S6eJ4NTeTfBSHiq9xmUuePh/rUGMwmcHL0W4NGtG8Zyeu2jKfaL1rv8V/aoVso2hGVpiM0Se41OWN8M6o5ovdAO3s67Am609kAeVdoy2B6mX+pf3pUtPsU1LuFeSGwrWKLNfuuiKYARCxYwCelBCxI3itfZ5H4FLwcB7loLBtMrSza9MuxUdWg6qDfRaQbFzsun9CVv0cBYgd9fM+M8XkhmlBPZHo48UZRUjD8s9iWsithsOLRzgQpZjczAiCs5R16SdN8TPnmPwty07W7i5XXRhIMHfBjvr1Ll9iimFYqxVsygEEg6mCARrqCR3E14+zE16v/ABmRzw3Lmzl8TFRlSO3Jg9xpmzBx7RVi3hHcHKCdDu7qLckLOFGFv38Q0lXRUtj0n3Ex1DhJrvk0kQjFuSDXJrkwcSzXLjC3ZtwWdtBGvHwq1yi5cW7Ns4bZwyL6LXo6TDjk6h21k9vcp72I6H3dkRlspoojcT+I9poMDU1jt3Io8lbRGWhv76mtpTbCb566u4ZwoYQDmXLrw6StI7ejHjViFkVmzuAFHMPglA131Fs6wuWZ1NEbccdO2lbFbIGRB1U0EHj5VO2FB3E1xrdZC2VCwFcN4boERVj6uN5NRso7++qJE20Q86B6q0zMN4AqwyrGq/PfUCoJFGgbCDA+qPdXUAncKfza8K6EHbRoW0cHgBSuKB1eGtJ7XVNd5oRRoW0RXiOJHDyAqC7lgajd8TVl7I41E+HAiNN8+01tIUyuctTYzosNN6Wz4FAR51y0sENAMGYIkGDMEcRXb1skydDAjsHADsiK2ncNqiod+ldsAz41KF1qSw2VpyhtdQ3npWo1lvHXQ2HVR6rDQ7/Rag1i8yHTdxFaDbdpBaRlUAlhundDf6VnGJk7qzVMEXcQ1hMaGiNCOFF7dysRmMg++jWAx8kKxg8DwP7VSE+5LJj6o1iYwiOI4VJi0tXYzKMwO/cR40HtMf8AT4VcdvjXU90Qg6exFc2EJ0uNHaFPvkV2n86RpNKp+VDsX86fcA8luU7YQMuTMrGd8QYijOJ+kS6w+zRV7TJP7ViDVnBYNnICjfXi5PB4Jz1yjuexDNkS0plzae2L1/W45bqG4Dwq9yR5NXMW5AHRWJPVM/tVz/4dFnK+IYIkSZ49g7aF43lS622sYf7O03pEaM8ExJ4DXdTxpLTjQzVO5mp21tzB4G0+Hw0XbzKVe5vVJEGDxNeY2rhiJrjMTTbQqsIaURnPUycU+DvqNRV8pb5kNnPO545vLpkic+fv0y+NOIVLYqdDUSUU2vgVtXjbRxdACHMIglkVjEEiASR4VgHMBiIMHcaIC4aGWrHXRDD3DuP+9ahWWrd0jca79YOu6mzTlHCikTbFcYkUw2zVtbYjh4e+qz3I8d1V0k7I3snfFM5vsFSc8YPl7q5NGkbc5EH0aSnspdKfCmpcPz/pRFHs5O/5jdUTMeykGPHurrCCP9eNGgEY7/dSLHT541ITrumm3WIrUayI0/E3SSPyqPYoFNL6CpbhEjuG7uEb6wehUzTwp9u8UmI1EagU0nfTFUmdY76BqCGJuMbSKTIkHu0OndQspUqA5gDPnVc2xJoXuFKokV5B10xqdct1xl18KAUXcDtIqQG1G7tFaEYgEAzMn4Vj1HSFXFxJXceOtPHI48iSxKW6NHzndSoQm0UjViD1RNKrebHuR8qfYr7E2Q99gB5ivQLtjDbKtC5cHOXiOgsaT2ncKVKvFk3Kel8H0EUow1Lk835R8oLuLu85dPYqjQKOoChE0qVdSSSpHJJtvcfTbQpUqIo8VIgpUqxi5h8ETv3VaVI0GlKlQASJPGp7S60qVawMsi9H70melSpkxGiM3jFMBBjSlSo2ChMIppuE0qVNYEPJ0iuZ4791KlTWLRP1aUx3HVSpU5NDWao7gpUqwRjNXHuyT4eVKlQsahjN1U/CNBPxpUqyA0XbNsO6cCZHfoaCtvPfSpUjfqHivR9SFqc43d1KlRARg61ans4fGlSoDIbl7BXKVKlGs//Z",
                "https://images.unsplash.com/photo-1611219287819-bcf393e5b33b",
            ],
            favorites: 80,
            category: "Barber",
            city: "Izmir",
            description: "Modern cuts and traditional shaves.",
            address: "Alsancak, Izmir",
            date: "2022-12-01",
            workDays: [
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
            ],
            workHours: ["10:00-20:00"],
            serviceCategories: [
                {
                    title: "Hair",
                    services: [
                        { price: 100, name: "Haircut" },
                        { price: 70, name: "Beard Trim" },
                    ],
                },
            ],
            workers: ["worker5"],
            averageStar: 4.7,
            accountType: "business",
        },
        {
            id: "4",
            name: "Relax Spa Center",
            phone: "0500 888 7766",
            email: "relax@spa.com",
            password: "hashed_password",
            pictures: [
                "data:image/jpeg;base64,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",
                "https://images.unsplash.com/photo-1601050690590-be338a57114e",
            ],
            favorites: 140,
            category: "Wellness",
            city: "Bursa",
            description: "Relaxation and massage therapies.",
            address: "Nilüfer, Bursa",
            date: "2023-04-20",
            workDays: ["Monday", "Wednesday", "Friday", "Saturday", "Sunday"],
            workHours: ["10:00-22:00"],
            serviceCategories: [
                {
                    title: "Massage",
                    services: [
                        { price: 300, name: "Swedish Massage" },
                        { price: 350, name: "Thai Massage" },
                    ],
                },
            ],
            workers: ["worker6", "worker7", "worker8"],
            averageStar: 4.6,
            accountType: "business",
        },
        {
            id: "5",
            name: "Sparkle Dental Clinic",
            phone: "0507 123 9876",
            email: "appointments@sparkledental.com",
            password: "hashed_password",
            pictures: [
                "data:image/jpeg;base64,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",
                "https://images.unsplash.com/photo-1588776814370-998c92ff11b2",
            ],
            favorites: 60,
            category: "Health",
            city: "Antalya",
            description: "Your smile is our passion.",
            address: "Konyaaltı, Antalya",
            date: "2022-08-15",
            workDays: ["Monday", "Tuesday", "Thursday", "Friday"],
            workHours: ["08:00-17:00"],
            serviceCategories: [
                {
                    title: "Dental",
                    services: [
                        { price: 500, name: "Teeth Whitening" },
                        { price: 750, name: "Root Canal" },
                    ],
                },
            ],
            workers: ["worker9"],
            averageStar: 4.4,
            accountType: "business",
        },
    ]).end();
});

app.listen(port, () => {});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});
