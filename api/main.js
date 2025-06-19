const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const businesses = [
    {
        id: "biz001",
        name: "Şık Saç Salonu",
        phone: "+905321234567",
        email: "sik.sac.salonu@example.com",
        password: "hashed_password_1",
        picture:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPQ6eHZGNN1GmXgZvdTbvAfMxxp4KEz2eFpQ&s",
        favorites: 120,
        category: "Kuaför",
        city: "İstanbul",
        description: "En modern saç kesimleri ve bakımları.",
        address: "Büyükdere Cad. No:100, Şişli",
        date: "12/05/2025 14:30",
        workDays: [
            "Pazartesi",
            "Salı",
            "Çarşamba",
            "Perşembe",
            "Cuma",
            "Cumartesi",
        ],
        workHours: ["09:00", "19:00"],
        services: [
            {
                title: "Saç Kesimi",
                price: 200,
            },
            {
                title: "Fön",
                price: 80,
            },
            {
                title: "Saç Boyama",
                price: 450,
            },
        ],
        workers: ["Ayşe Yılmaz", "Can Demir"],
        averageStar: 4.8,
        accountType: "business",
    },
    {
        id: "biz002",
        name: "Lezzet Durağı Restoranı",
        phone: "+905439876543",
        email: "lezzet.duragi@example.com",
        password: "hashed_password_2",
        picture:
            "https://www.gastronomidergisi.com/images/haber/roof%20mezzepotamia10336.jpg",
        favorites: 350,
        category: "Restoran",
        city: "Ankara",
        description: "Geleneksel Türk mutfağının eşsiz tatları.",
        address: "Atatürk Bulvarı No:50, Çankaya",
        date: "15/05/2025 19:00",
        workDays: [
            "Pazartesi",
            "Salı",
            "Çarşamba",
            "Perşembe",
            "Cuma",
            "Cumartesi",
            "Pazar",
        ],
        workHours: ["11:00", "23:00"],
        services: [
            {
                title: "İskender Kebap",
                price: 250,
            },
            {
                title: "Mercimek Çorbası",
                price: 70,
            },
            {
                title: "Sütlaç",
                price: 90,
            },
        ],
        workers: ["Murat Can", "Zeynep Ak"],
        averageStar: 4.5,
        accountType: "business",
    },
    {
        id: "biz003",
        name: "Modern Diş Kliniği",
        phone: "+905051112233",
        email: "modern.dis.klinigi@example.com",
        password: "hashed_password_3",
        picture:
            "https://a2dent.com.tr/uploads/tbl_blog/635103a6d2489-dudullu-dis-hekimi-ve-dis-klinig-i-detay-jpg-a2dent-istanbul-dis-klinigi",
        favorites: 80,
        category: "Sağlık",
        city: "İzmir",
        description: "Sağlıklı gülüşler için kapsamlı diş hizmetleri.",
        address: "Kordonboyu Cad. No:20, Konak",
        date: "20/05/2025 10:00",
        workDays: ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma"],
        workHours: ["09:00", "18:00"],
        services: [
            {
                title: "Diş Temizliği",
                price: 300,
            },
            {
                title: "Dolgu",
                price: 600,
            },
            {
                title: "Kanal Tedavisi",
                price: 1200,
            },
        ],
        workers: ["Dr. Elif Gür", "Asistan Deniz Kaya"],
        averageStar: 4.9,
        accountType: "business",
    },
    {
        id: "biz004",
        name: "Fit Hayat Spor Salonu",
        phone: "+905554443322",
        email: "fit.hayat@example.com",
        password: "hashed_password_4",
        picture:
            "https://www.fitty.tech/wp-content/uploads/2024/02/airport-form-center.jpg",
        favorites: 200,
        category: "Spor",
        city: "Bursa",
        description: "Kişisel antrenörler ve grup dersleri ile formda kalın.",
        address: "Osmangazi Cad. No:15, Nilüfer",
        date: "22/05/2025 08:00",
        workDays: [
            "Pazartesi",
            "Salı",
            "Çarşamba",
            "Perşembe",
            "Cuma",
            "Cumartesi",
        ],
        workHours: ["07:00", "22:00"],
        services: [
            {
                title: "Aylık Üyelik",
                price: 500,
            },
            {
                title: "Kişisel Antrenör",
                price: 300,
            },
            {
                title: "Yoga Dersi",
                price: 100,
            },
        ],
        workers: ["Burak Öz", "Selin Toprak"],
        averageStar: 4.6,
        accountType: "business",
    },
    {
        id: "biz005",
        name: "Kitap Kurdu Cafe",
        phone: "+905337778899",
        email: "kitap.kurdu@example.com",
        password: "hashed_password_5",
        picture:
            "https://www.caginofis.com/wp-content/uploads/2023/07/pendik-kutuphane-projesi-31.webp",
        favorites: 180,
        category: "Cafe",
        city: "Eskişehir",
        description: "Sıcak içecekler ve sessiz bir okuma ortamı.",
        address: "Üniversite Cad. No:45, Tepebaşı",
        date: "25/05/2025 11:00",
        workDays: ["Her Gün"],
        workHours: ["08:00", "23:00"],
        services: [
            {
                title: "Filtre Kahve",
                price: 60,
            },
            {
                title: "Latte",
                price: 70,
            },
            {
                title: "Pasta Dilimi",
                price: 90,
            },
        ],
        workers: ["Merve Can", "Deniz Özcan"],
        averageStar: 4.7,
        accountType: "business",
    },
    {
        id: "biz006",
        name: "Pets Alive Veteriner Kliniği",
        phone: "+905445556677",
        email: "pets.alive@example.com",
        password: "hashed_password_6",
        picture: "https://img.youtube.com/vi/AK7VKdsA04I/maxresdefault.jpg",
        favorites: 95,
        category: "Evcil Hayvan",
        city: "Antalya",
        description: "Sevimli dostlarınız için güvenilir sağlık hizmetleri.",
        address: "Sahil Yolu Cad. No:30, Muratpaşa",
        date: "28/05/2025 16:00",
        workDays: [
            "Pazartesi",
            "Salı",
            "Çarşamba",
            "Perşembe",
            "Cuma",
            "Cumartesi",
        ],
        workHours: ["09:00", "17:00"],
        services: [
            {
                title: "Genel Muayene",
                price: 350,
            },
            {
                title: "Aşı",
                price: 200,
            },
            {
                title: "Tırnak Kesimi",
                price: 100,
            },
        ],
        workers: ["Veteriner Dr. Emre Kurt", "Asistan Gizem Yıldız"],
        averageStar: 4.8,
        accountType: "business",
    },
    {
        id: "biz007",
        name: "Tekno Destek Servisi",
        phone: "+905301239876",
        email: "tekno.destek@example.com",
        password: "hashed_password_7",
        picture:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG783wv48HkbgCoRv74Yn9le_hPqHxN7EHkQ&s",
        favorites: 60,
        category: "Teknoloji",
        city: "Gaziantep",
        description:
            "Bilgisayar ve telefon tamirinde güvenilir çözüm ortağınız.",
        address: "Sanayi Cad. No:1, Şahinbey",
        date: "01/06/2025 13:00",
        workDays: ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma"],
        workHours: ["09:00", "18:00"],
        services: [
            {
                title: "Bilgisayar Tamiri",
                price: 400,
            },
            {
                title: "Telefon Ekran Değişimi",
                price: 700,
            },
            {
                title: "Yazılım Yükleme",
                price: 250,
            },
        ],
        workers: ["Hasan Koç", "Fatma Ergün"],
        averageStar: 4.4,
        accountType: "business",
    },
    {
        id: "biz008",
        name: "Sanat Atölyesi",
        phone: "+905352345678",
        email: "sanat.atolyesi@example.com",
        password: "hashed_password_8",
        picture:
            "https://teknomaker.com.tr/wp-content/uploads/2020/08/g%C3%B6rsel-sanatlar-at%C3%B6lyesi-optimized-2-1024x576.jpg",
        favorites: 150,
        category: "Eğitim",
        city: "Adana",
        description: "Yaratıcılığınızı keşfetmek için çeşitli sanat kursları.",
        address: "Reşatbey Mah. Park Cad. No:5, Seyhan",
        date: "05/06/2025 17:00",
        workDays: ["Salı", "Perşembe", "Cumartesi"],
        workHours: ["10:00", "20:00"],
        services: [
            {
                title: "Yağlı Boya Kursu",
                price: 800,
            },
            {
                title: "Seramik Atölyesi",
                price: 600,
            },
            {
                title: "Suluboya Dersi",
                price: 400,
            },
        ],
        workers: ["Nilay Erdem", "Umut Kaya"],
        averageStar: 4.9,
        accountType: "business",
    },
    {
        id: "biz009",
        name: "Temiz Eller Kuru Temizleme",
        phone: "+905367890123",
        email: "temiz.eller@example.com",
        password: "hashed_password_9",
        picture:
            "https://drycenter.com/Uploads/images/dry-center-marmarapark-kuru-temizleme-esenyurt-istanbul.jpg",
        favorites: 75,
        category: "Temizlik",
        city: "Konya",
        description: "Profesyonel kuru temizleme ve ütü hizmetleri.",
        address: "Meram Cad. No:110, Meram",
        date: "08/06/2025 09:00",
        workDays: ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma"],
        workHours: ["08:00", "19:00"],
        services: [
            {
                title: "Takım Elbise Kuru Temizleme",
                price: 150,
            },
            {
                title: "Gömlek Ütüleme",
                price: 50,
            },
            {
                title: "Halı Yıkama (metrekare)",
                price: 30,
            },
        ],
        workers: ["Ali Veli", "Nazlı Çelik"],
        averageStar: 4.7,
        accountType: "business",
    },
    {
        id: "biz010",
        name: "Doğa Eczanesi",
        phone: "+905312345678",
        email: "doga.eczanesi@example.com",
        password: "hashed_password_10",
        picture: "https://www.eczanedolabi.com/Upload/eczane-tasarimi-1_n.jpg",
        favorites: 40,
        category: "Sağlık",
        city: "Samsun",
        description: "Sağlık ürünleri ve ilaç temininde güvenilir adresiniz.",
        address: "Barış Cad. No:7, Atakum",
        date: "10/06/2025 11:30",
        workDays: [
            "Pazartesi",
            "Salı",
            "Çarşamba",
            "Perşembe",
            "Cuma",
            "Cumartesi",
        ],
        workHours: ["08:30", "19:30"],
        services: [
            {
                title: "Reçeteli İlaç Temini",
                price: 0,
            },
            {
                title: "Vitamin Takviyeleri",
                price: 100,
            },
            {
                title: "Cilt Bakım Ürünleri",
                price: 250,
            },
        ],
        workers: ["Eczacı Elmas Koçak", "Eczane Teknisyeni Kerem Arslan"],
        averageStar: 4.6,
        accountType: "business",
    },
];

app.use((req, res, next) => {
    const delay = Math.random() * (3000 - 500) + 500; // Between 500ms and 3000ms
    setTimeout(() => {
        next();
    }, delay);
});

app.delete("/api/v1/customers/:id/favorites/:id2", (req, res) => {
    const a = req.params.id;
    const b = req.params.id2;

    res.send({ message: a + b + " başarılıyla silindi" });
});

app.get("/api/v1/customers/:id/favorites", (req, res) => {
    res.send(businesses.filter((elem) => Math.random() < 0.5));
    res.end();
});

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
        res.send({ id: "12345", accountType: "customer" });
    }
    if (req.body.email === "business@hotmail.com") {
        res.send({ id: "3241", accountType: "business" });
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

app.get("/api/v1/customers", (req, res) => {
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
    res.send({ message: "Değişiklikler başarıyla kayıt edildi" }).end();
});

app.get("/api/v1/appointments", (req, res) => {
    res.send([
        {
            id: "1",
            customer: "müşteri_001",
            business: "Güzellik Dünyası",
            service: {
                worker: "Ayşe Yılmaz",
                name: "Klasik Cilt Bakımı",
                price: 300,
            },
            date: "12/06/2025 10:30",
        },
        {
            id: "2",
            customer: "müşteri_002",
            business: "Elif Spa & Wellness",
            service: {
                worker: "Zeynep Korkmaz",
                name: "Aromaterapi Masajı",
                price: 600,
            },
            date: "12/06/2025 11:15",
        },
        {
            id: "3",
            customer: "müşteri_003",
            business: "Makyaj Atölyesi",
            service: {
                worker: "Elif Demir",
                name: "Gelin Makyajı",
                price: 400,
            },
            date: "12/06/2025 13:00",
        },
        {
            id: "4",
            customer: "müşteri_004",
            business: "BarberKing Erkek Kuaförü",
            service: { worker: "Mehmet Kaya", name: "Saç Kesimi", price: 150 },
            date: "12/06/2025 14:20",
        },
        {
            id: "5",
            customer: "müşteri_005",
            business: "Nail Art Studio",
            service: { worker: "Buse Arslan", name: "Manikür", price: 120 },
            date: "12/06/2025 15:00",
        },
        {
            id: "6",
            customer: "müşteri_006",
            business: "Elif Spa & Wellness",
            service: {
                worker: "Deniz Çetin",
                name: "Detoks Bakımı",
                price: 500,
            },
            date: "12/06/2025 16:30",
        },
        {
            id: "7",
            customer: "müşteri_007",
            business: "BarberKing Erkek Kuaförü",
            service: { worker: "Ali Can", name: "Sakal Tıraşı", price: 90 },
            date: "12/06/2025 17:15",
        },
        {
            id: "8",
            customer: "müşteri_008",
            business: "Kuaför Stil",
            service: { worker: "Selin Öztürk", name: "Fön", price: 70 },
            date: "12/06/2025 18:00",
        },
        {
            id: "9",
            customer: "müşteri_009",
            business: "Huzur Spa Merkezi",
            service: {
                worker: "Emine Aydın",
                name: "Derin Doku Masajı",
                price: 750,
            },
            date: "12/06/2025 19:30",
        },
        {
            id: "10",
            customer: "müşteri_010",
            business: "Güzellik Dünyası",
            service: {
                worker: "Fatma Koç",
                name: "Anti-Aging Bakım",
                price: 450,
            },
            date: "12/06/2025 20:15",
        },
    ]);
});

app.get("/api/v1/businesses", (req, res) => {
    res.send(businesses);
});

app.get("/api/v1/businesses/:id", (req, res) => {
    const id = req.params.id;

    res.send(businesses.find((elem) => elem.id === id));
});

app.get("/api/v1/businesses/:id/comments", (req, res) => {
    const id = req.params.id;

    res.json([
        {
            id: "1",
            customer: "c1",
            business: "b1",
            service: "Saç Kesimi",
            worker: "w1",
            comment: "Gerçekten harika bir hizmetti, çok memnun kaldım.",
            star: 5,
            date: "12/05/2025 15:30",
        },
        {
            id: "2",
            customer: "c2",
            business: "b1",
            service: "Manikür",
            worker: "w2",
            comment: "İşini çok iyi yapan biri, teşekkür ederim.",
            star: 4,
            date: "13/05/2025 14:00",
        },
        {
            id: "3",
            customer: "c3",
            business: "b2",
            service: "Masaj",
            worker: "w3",
            comment: "Oldukça rahatlatıcıydı, tekrar geleceğim.",
            star: 5,
            date: "14/05/2025 17:45",
        },
        {
            id: "4",
            customer: "c4",
            business: "b3",
            service: "Saç Boyama",
            worker: "w1",
            comment:
                "Renk istediğim gibi olmadı, biraz hayal kırıklığına uğradım.",
            star: 2,
            date: "15/05/2025 10:15",
        },
        {
            id: "5",
            customer: "c5",
            business: "b1",
            service: "Tıraş",
            worker: "w2",
            comment: "Gayet özenli ve titizdi.",
            star: 4,
            date: "16/05/2025 09:30",
        },
        {
            id: "6",
            customer: "c6",
            business: "b4",
            service: "Cilt Bakımı",
            worker: "w4",
            comment: "Yüzümde gözle görülür bir fark oluştu, teşekkür ederim.",
            star: 5,
            date: "17/05/2025 16:00",
        },
        {
            id: "7",
            customer: "c7",
            business: "b2",
            service: "Pedikür",
            worker: "w2",
            comment: "Fena değildi ama biraz aceleye gelmiş gibiydi.",
            star: 3,
            date: "18/05/2025 13:30",
        },
        {
            id: "8",
            customer: "c8",
            business: "b3",
            service: "Kaş Alımı",
            worker: "w5",
            comment: "İstediğim şekli tam anlayamadı.",
            star: 2,
            date: "19/05/2025 12:00",
        },
        {
            id: "9",
            customer: "c9",
            business: "b4",
            service: "Fön",
            worker: "w1",
            comment: "Çok profesyonel ve ilgiliydi.",
            star: 5,
            date: "20/05/2025 11:00",
        },
        {
            id: "10",
            customer: "c10",
            business: "b2",
            service: "Saç Kesimi",
            worker: "w3",
            comment: "Saç modelini çok beğendim, kesinlikle tekrar geleceğim.",
            star: 5,
            date: "21/05/2025 18:30",
        },
    ]);
});

app.listen(port, () => {});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});
