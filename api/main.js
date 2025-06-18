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
            pictures: [
                "data:image/jpeg;base64,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",
            ],
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
                { title: "Saç Kesimi", price: 200 },
                { title: "Fön", price: 80 },
                { title: "Saç Boyama", price: 450 },
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
            pictures: ["https://www.gastronomidergisi.com/images/haber/roof%20mezzepotamia10336.jpg"
            ],
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
                { title: "İskender Kebap", price: 250 },
                { title: "Mercimek Çorbası", price: 70 },
                { title: "Sütlaç", price: 90 },
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
            pictures: ["https://kiracdis.com/tema/genel/uploads/haberler/beylikduzudisci_1.jpg"
            ],
            favorites: 80,
            category: "Sağlık",
            city: "İzmir",
            description: "Sağlıklı gülüşler için kapsamlı diş hizmetleri.",
            address: "Kordonboyu Cad. No:20, Konak",
            date: "20/05/2025 10:00",
            workDays: ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma"],
            workHours: ["09:00", "18:00"],
            services: [
                { title: "Diş Temizliği", price: 300 },
                { title: "Dolgu", price: 600 },
                { title: "Kanal Tedavisi", price: 1200 },
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
            pictures: [
                "https://www.fitty.tech/wp-content/uploads/2024/02/airport-form-center.jpg",
            ],
            favorites: 200,
            category: "Spor",
            city: "Bursa",
            description:
                "Kişisel antrenörler ve grup dersleri ile formda kalın.",
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
                { title: "Aylık Üyelik", price: 500 },
                { title: "Kişisel Antrenör", price: 300 },
                { title: "Yoga Dersi", price: 100 },
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
            pictures: [
                "https://www.caginofis.com/wp-content/uploads/2023/07/pendik-kutuphane-projesi-31.webp",
            ],
            favorites: 180,
            category: "Cafe",
            city: "Eskişehir",
            description: "Sıcak içecekler ve sessiz bir okuma ortamı.",
            address: "Üniversite Cad. No:45, Tepebaşı",
            date: "25/05/2025 11:00",
            workDays: ["Her Gün"],
            workHours: ["08:00", "23:00"],
            services: [
                { title: "Filtre Kahve", price: 60 },
                { title: "Latte", price: 70 },
                { title: "Pasta Dilimi", price: 90 },
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
            pictures: [
                "https://www.zootopiaveterinerklinigi.com/wp-content/uploads/2024/09/zootopia-veteriner-klinigi.webp",
            ],
            favorites: 95,
            category: "Evcil Hayvan",
            city: "Antalya",
            description:
                "Sevimli dostlarınız için güvenilir sağlık hizmetleri.",
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
                { title: "Genel Muayene", price: 350 },
                { title: "Aşı", price: 200 },
                { title: "Tırnak Kesimi", price: 100 },
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
            pictures: [
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG783wv48HkbgCoRv74Yn9le_hPqHxN7EHkQ&s",
            ],
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
                { title: "Bilgisayar Tamiri", price: 400 },
                { title: "Telefon Ekran Değişimi", price: 700 },
                { title: "Yazılım Yükleme", price: 250 },
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
            pictures: [
                "https://teknomaker.com.tr/wp-content/uploads/2020/08/g%C3%B6rsel-sanatlar-at%C3%B6lyesi-optimized-2-1024x576.jpg",
            ],
            favorites: 150,
            category: "Eğitim",
            city: "Adana",
            description:
                "Yaratıcılığınızı keşfetmek için çeşitli sanat kursları.",
            address: "Reşatbey Mah. Park Cad. No:5, Seyhan",
            date: "05/06/2025 17:00",
            workDays: ["Salı", "Perşembe", "Cumartesi"],
            workHours: ["10:00", "20:00"],
            services: [
                { title: "Yağlı Boya Kursu", price: 800 },
                { title: "Seramik Atölyesi", price: 600 },
                { title: "Suluboya Dersi", price: 400 },
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
            pictures: [
                "https://drycenter.com/Uploads/images/dry-center-marmarapark-kuru-temizleme-esenyurt-istanbul.jpg",
            ],
            favorites: 75,
            category: "Temizlik",
            city: "Konya",
            description: "Profesyonel kuru temizleme ve ütü hizmetleri.",
            address: "Meram Cad. No:110, Meram",
            date: "08/06/2025 09:00",
            workDays: ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma"],
            workHours: ["08:00", "19:00"],
            services: [
                { title: "Takım Elbise Kuru Temizleme", price: 150 },
                { title: "Gömlek Ütüleme", price: 50 },
                { title: "Halı Yıkama (metrekare)", price: 30 },
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
            pictures: [
                "https://www.eczanedolabi.com/Upload/eczane-tasarimi-1_n.jpg",
            ],
            favorites: 40,
            category: "Sağlık",
            city: "Samsun",
            description:
                "Sağlık ürünleri ve ilaç temininde güvenilir adresiniz.",
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
                { title: "Reçeteli İlaç Temini", price: 0 },
                { title: "Vitamin Takviyeleri", price: 100 },
                { title: "Cilt Bakım Ürünleri", price: 250 },
            ],
            workers: ["Eczacı Elmas Koçak", "Eczane Teknisyeni Kerem Arslan"],
            averageStar: 4.6,
            accountType: "business",
        },]; 

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
