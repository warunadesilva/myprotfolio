
const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
require('dotenv').config();

const app = express();

// 🔥 CORS Configuration - vhjd.png එකේ තිබුණු Frontend URL එකට අවසර දීම
app.use(cors({
    origin: "https://myprotfolio-six-pied.vercel.app", // ඔයාගේ නිවැරදි Frontend URL එක මෙතන තියෙන්න ඕනේ
    methods: ["GET", "POST"],
    credentials: true
}));

app.use(express.json());

const PORT = process.env.PORT || 5000;

// 🔥 Firebase Initialization
try {
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') : undefined,
            }),
            databaseURL: process.env.FIREBASE_DATABASE_URL
        });
    }
    console.log(`🔥 Firebase Firestore is Connected!`);
} catch (error) {
    console.error("❌ Firebase Initialization Error:", error.message);
}

const db = admin.firestore();

// --- ROUTES ---

app.get('/', (req, res) => {
    res.json({ message: "Portfolio Backend is running successfully!", status: "Connected" });
});

app.get('/get-projects', async (req, res) => {
    try {
        const snapshot = await db.collection('projects').orderBy('createdAt', 'desc').get();
        const projects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(projects);
    } catch (error) { res.status(500).json({ error: error.message }); }
});

app.get('/get-certificates', async (req, res) => {
    try {
        const snapshot = await db.collection('certificates').orderBy('createdAt', 'desc').get();
        const certificates = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(certificates);
    } catch (error) { res.status(500).json({ error: error.message }); }
});

app.post('/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        await db.collection('contacts').add({ name, email, message, sentAt: new Date() });
        res.status(201).json({ success: true, message: "Message Sent Successfully!" });
    } catch (error) { res.status(500).json({ error: error.message }); }
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
