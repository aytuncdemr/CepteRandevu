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

const appointments = [
    {
        id: "1",
        customer: "Ahmet Yılmaz",
        business: "Berber Salonu Deluxe",
        category: "Berber",
        service: { worker: "Mert Can", title: "Sakal Tıraşı", price: 80 },
        date: "12/05/2025 09:00",
    },
    {
        id: "2",
        customer: "Elif Demir",
        business: "Diş Kliniği Gülüş",
        category: "Diş Hekimi",
        service: {
            worker: "Dr. Ayça Turan",
            title: "Diş Temizliği",
            price: 300,
        },
        date: "13/05/2025 11:30",
    },
    {
        id: "3",
        customer: "Mehmet Koç",
        business: "PsikoTerapi Merkezi",
        category: "Psikolog",
        service: { worker: "Uz. Psk. Ebru Yılmaz", title: "Seans", price: 500 },
        date: "14/05/2025 15:00",
    },
    {
        id: "4",
        customer: "Fatma Özkan",
        business: "Veteriner Pati Dostu",
        category: "Veteriner",
        service: {
            worker: "Dr. Ahmet Kılıç",
            title: "Aşı Uygulaması",
            price: 200,
        },
        date: "15/05/2025 13:45",
    },
    {
        id: "5",
        customer: "Burak Aydın",
        business: "Emlak Ofisi Elite",
        category: "Emlak Danışmanı",
        service: {
            worker: "Selin Baş",
            title: "Kiralık Daire Gezisi",
            price: 0,
        },
        date: "16/05/2025 10:00",
    },
    {
        id: "6",
        customer: "Zeynep Kurt",
        business: "Müzik Atölyesi Nota",
        category: "Müzik Öğretmeni",
        service: { worker: "Barış Aksoy", title: "Gitar Dersi", price: 150 },
        date: "17/05/2025 17:30",
    },
    {
        id: "7",
        customer: "Emre Sarı",
        business: "PT Akademi",
        category: "Kişisel Antrenör",
        service: {
            worker: "Ali Kılıç",
            title: "Kişisel Antrenman",
            price: 250,
        },
        date: "18/05/2025 08:00",
    },
    {
        id: "8",
        customer: "Selin Aksoy",
        business: "Fizyoterapi Gelişim",
        category: "Fizyoterapist",
        service: { worker: "Esra Demir", title: "Rehabilitasyon", price: 400 },
        date: "19/05/2025 16:00",
    },
    {
        id: "9",
        customer: "Mustafa Arslan",
        business: "Yoga Stüdyosu Lotus",
        category: "Yoga Eğitmeni",
        service: { worker: "Melisa Çetin", title: "Grup Yogası", price: 120 },
        date: "20/05/2025 18:00",
    },
    {
        id: "10",
        customer: "Deniz Çelik",
        business: "Düğün Organizasyon Efsane",
        category: "Organizasyon Firması",
        service: {
            worker: "Buse Yıldız",
            title: "Düğün Planlama",
            price: 2000,
        },
        date: "21/05/2025 14:00",
    },
    {
        id: "11",
        customer: "Ayşe Kara",
        business: "Çocuk Anaokulu Bal Arısı",
        category: "Kreş / Anaokulu",
        service: {
            worker: "Öğr. Selda Kaplan",
            title: "Tanıtım Günü",
            price: 0,
        },
        date: "22/05/2025 10:30",
    },
    {
        id: "12",
        customer: "Can Yıldız",
        business: "Fotoğrafçı LensArt",
        category: "Fotoğrafçı",
        service: { worker: "Tuna Arda", title: "Mezuniyet Çekimi", price: 750 },
        date: "23/05/2025 13:00",
    },
    {
        id: "13",
        customer: "Merve Şahin",
        business: "Araba Servisi OtoMax",
        category: "Araba Servisi",
        service: { worker: "Usta Cemil", title: "Yağ Değişimi", price: 300 },
        date: "24/05/2025 09:30",
    },
    {
        id: "14",
        customer: "Kerem Toprak",
        business: "Ev Temizlik Hizmeti Mis Gibi",
        category: "Ev Temizlik Hizmeti",
        service: { worker: "Fatma Ay", title: "Detaylı Temizlik", price: 500 },
        date: "25/05/2025 08:00",
    },
    {
        id: "15",
        customer: "Gülcan Özdemir",
        business: "Avukatlık Bürosu Adalet",
        category: "Avukat",
        service: {
            worker: "Av. Mert Genç",
            title: "Dava Danışmanlığı",
            price: 600,
        },
        date: "26/05/2025 12:00",
    },
    {
        id: "16",
        customer: "Tuna Akın",
        business: "Boyacı Usta Kemal",
        category: "Boyacı / Usta",
        service: { worker: "Kemal Usta", title: "Oda Boyama", price: 900 },
        date: "27/05/2025 11:00",
    },
    {
        id: "17",
        customer: "Ceyda Güneş",
        business: "Danışmanlık Vizyon",
        category: "Danışmanlık Hizmeti",
        service: {
            worker: "Dr. Gökhan Aydın",
            title: "İş Danışmanlığı",
            price: 700,
        },
        date: "28/05/2025 15:45",
    },
    {
        id: "18",
        customer: "Engin Albayrak",
        business: "Bilgisayar Servisi TeknoFix",
        category: "Bilgisayar / Telefon Servisi",
        service: { worker: "Ali Yazıcı", title: "SSD Montajı", price: 250 },
        date: "29/05/2025 14:30",
    },
    {
        id: "19",
        customer: "İpek Turgut",
        business: "Moda Danışmanı Stilize",
        category: "Moda Danışmanı",
        service: {
            worker: "Ayda Koç",
            title: "Kişisel Stil Analizi",
            price: 350,
        },
        date: "30/05/2025 16:30",
    },
    {
        id: "20",
        customer: "Bora Şimşek",
        business: "Sürücü Kursu Yol Bilgisi",
        category: "Sürücü Kursu",
        service: {
            worker: "İnstr. Emine Arı",
            title: "Direksiyon Dersi",
            price: 200,
        },
        date: "31/05/2025 10:15",
    },
];

const comments = [
    {
        id: "1",
        customer: "Ahmet Yılmaz",
        business: "Güzellik Salonu Lale",
        service: "Saç Kesimi",
        worker: "Merve Kaya",
        comment: "Gerçekten harika bir hizmetti, çok memnun kaldım.",
        star: 5,
        date: "12/05/2025 15:30",
    },
    {
        id: "2",
        customer: "Elif Demir",
        business: "Güzellik Salonu Lale",
        service: "Manikür",
        worker: "Zeynep Şahin",
        comment: "İşini çok iyi yapan biri, teşekkür ederim.",
        star: 4,
        date: "13/05/2025 14:00",
    },
    {
        id: "3",
        customer: "Mehmet Koç",
        business: "Estetik Merkezi Ayışığı",
        service: "Masaj",
        worker: "Canan Uslu",
        comment: "Oldukça rahatlatıcıydı, tekrar geleceğim.",
        star: 5,
        date: "14/05/2025 17:45",
    },
    {
        id: "4",
        customer: "Fatma Özkan",
        business: "Masaj Evi Huzur",
        service: "Saç Boyama",
        worker: "Merve Kaya",
        comment: "Renk istediğim gibi olmadı, biraz hayal kırıklığına uğradım.",
        star: 2,
        date: "15/05/2025 10:15",
    },
    {
        id: "5",
        customer: "Burak Aydın",
        business: "Güzellik Salonu Lale",
        service: "Tıraş",
        worker: "Zeynep Şahin",
        comment: "Gayet özenli ve titizdi.",
        star: 4,
        date: "16/05/2025 09:30",
    },
    {
        id: "6",
        customer: "Zeynep Kurt",
        business: "Estetik Merkezi Ayışığı",
        service: "Cilt Bakımı",
        worker: "Ayşe Karaca",
        comment: "Yüzümde gözle görülür bir fark oluştu, teşekkür ederim.",
        star: 5,
        date: "17/05/2025 16:00",
    },
    {
        id: "7",
        customer: "Emre Sarı",
        business: "Estetik Merkezi Ayışığı",
        service: "Pedikür",
        worker: "Zeynep Şahin",
        comment: "Fena değildi ama biraz aceleye gelmiş gibiydi.",
        star: 3,
        date: "18/05/2025 13:30",
    },
    {
        id: "8",
        customer: "Selin Aksoy",
        business: "Masaj Evi Huzur",
        service: "Kaş Alımı",
        worker: "Seda Polat",
        comment: "İstediğim şekli tam anlayamadı.",
        star: 2,
        date: "19/05/2025 12:00",
    },
    {
        id: "9",
        customer: "Mustafa Arslan",
        business: "Güzellik Salonu Lale",
        service: "Fön",
        worker: "Merve Kaya",
        comment: "Çok profesyonel ve ilgiliydi.",
        star: 5,
        date: "20/05/2025 11:00",
    },
    {
        id: "10",
        customer: "Deniz Çelik",
        business: "Estetik Merkezi Ayışığı",
        service: "Saç Kesimi",
        worker: "Canan Uslu",
        comment: "Saç modelini çok beğendim, kesinlikle tekrar geleceğim.",
        star: 5,
        date: "21/05/2025 18:30",
    },
];

app.use((req, res, next) => {
    const delay = Math.random() * (1500 - 500) + 500;
    setTimeout(() => {
        next();
    }, delay);
});

app.get("/api/v1/customers/:id", (req, res) => {
    res.send({
        id: "123",
        name: "Ahmet",
        surname: "Yılmaz",
        phone: "05321234567",
        email: "ahmet.yilmaz@example.com",
        city: "İstanbul",
        password: "FakePassword123!",
        date: "22/07/2025 14:52",
        favorites: [],
        accountType: "customer",
    }).end();
    res.end();
});
app.get("/api/v1/notifications/customers/:id", (req, res) => {
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

app.get("/api/v1/businesses/:id", (req, res) => {
    const id = req.params.id;
    res.send(businesses.find((elem) => Math.random() > 0.6));
});

app.delete("/api/v1/customers/:id/favorites/:id2", (req, res) => {
    const a = req.params.id;
    const b = req.params.id2;

    res.send({ message: a + " " + b + " başarılıyla silindi" });
});

app.get("/api/v1/customers/:id/favorites", (req, res) => {
    res.send(businesses.filter((elem) => Math.random() < 0.5));
    res.end();
});

app.get("/api/v1/appointments/customers/:id", (req, res) => {
    res.send(appointments);
    res.end();
});
app.get("/api/v1/appointments/businesses/:id", (req, res) => {
    res.send(appointments);
    res.end();
});

app.post("/api/v1/appointments", (req, res) => {
    res.send({ message: "başarıyla oldu" });
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
        favorites: [],
        accountType: "customer",
    }).end();
});

app.put("/api/v1/customers", (req, res) => {
    res.send({ message: "Değişiklikler başarıyla kayıt edildi" }).end();
});

app.get("/api/v1/businesses", (req, res) => {
    res.send(businesses);
});

app.get("/api/v1/businesses/:id/comments", (req, res) => {
    res.json(comments).end();
});

app.listen(port, () => {});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});
