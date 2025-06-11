const express = require("express");
// Create an instance of the Express application
const app = express();
// Define the port number the server will listen on
const port = 3000;

// Middleware to parse JSON bodies (for handling JSON data in requests)
app.use(express.json());
// Middleware to parse URL-encoded bodies (for handling form data)
app.use(express.urlencoded({ extended: true }));

// Define a basic route for the root URL ('/')
// When a GET request is made to '/', this function will be executed.
app.get("/", (req, res) => {
    // Send a simple text response
    res.send("Hello from your simple Express app!");
});

app.post("/", (req, res) => {
    const body = req.body;

    if (body.email === "aytunc@hotmail.com" && body.password === "12345") {
        res.status(200).send({ id: "abc123", accountType: "customer" });
        res.end();
    } else {
        res.status(404).send({ message: "Hatalı kullanıcı adı veya şifre" });
        res.end();
    }
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
    res.send(businessCategories);
});

app.post("/api/v1/auth/register", (req, res) => {
    res.send({ message: "başarıyla kayıt olundu" });
});
app.post("/api/v1/auth/login", (req, res) => {
    if (req.body.email === "customer@hotmail.com") {
        res.send({ id: "#12345", accountType: "customer" });
    }
    if (req.body.email === "business@hotmail.com") {
        res.send({ id: "#12345", accountType: "business" });
    } else {
        res.status(404).send("no");
    }
});

// Define another route for '/api/greet/:name'
// This demonstrates how to use route parameters
app.get("/api/greet/:name", (req, res) => {
    // Extract the 'name' parameter from the request URL
    const name = req.params.name;
    // Send a personalized greeting
    res.send(`Hello, ${name}! Welcome to the API.`);
});

// Define a route for '/api/data' that returns JSON data
app.get("/api/data", (req, res) => {
    // Send JSON data as a response
    res.json({
        message: "This is some sample JSON data.",
        timestamp: new Date().toISOString(),
        items: ["item1", "item2", "item3"],
    });
});

// Start the server and make it listen for incoming requests on the specified port
app.listen(port, () => {
    console.log(`Simple Express app listening at http://localhost:${port}`);
});

// Basic error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});
