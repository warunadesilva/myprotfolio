const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// 🔥 Firebase Initialization (JSON ෆයිල් එක වෙනුවට Env Variables පාවිච්චි කරමු)
try {
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                // Private Key එකේ තියෙන \n අකුරු ටික හරියට පේළි වලට කඩන්න මේ replace එක අනිවාර්යයි
                privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            }),
            databaseURL: process.env.FIREBASE_DATABASE_URL
        });
    }
    console.log(`-----------------------------------------`);
    console.log(`🔥 Firebase Firestore is Connected!`);
    console.log(`-----------------------------------------`);
} catch (error) {
    console.error("❌ Firebase Initialization Error:", error.message);
}

const db = admin.firestore();

// --- 0. ROOT ROUTE (Vercel එකට වැඩේ ගොඩද කියලා බලන්න) ---
app.get('/', (req, res) => {
    res.json({ message: "Portfolio Backend is running successfully!" });
});

// --- 1. PROJECTS ROUTES ---
app.post('/add-project', async (req, res) => {
    try {
        const { title, description, techStack, link } = req.body;
        const newProject = { title, description, techStack, link, createdAt: new Date() };
        const docRef = await db.collection('projects').add(newProject);
        res.status(201).json({ success: true, message: "Project added!", id: docRef.id });
    } catch (error) { res.status(500).json({ error: error.message }); }
});

app.get('/get-projects', async (req, res) => {
    try {
        const snapshot = await db.collection('projects').orderBy('createdAt', 'desc').get();
        const projects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(projects);
    } catch (error) { res.status(500).json({ error: error.message }); }
});

// --- 2. CERTIFICATES ROUTES ---
app.post('/add-certificate', async (req, res) => {
    try {
        const { title, issuedBy, category, color } = req.body;
        const newCert = { title, issuedBy, category, color, createdAt: new Date() };
        const docRef = await db.collection('certificates').add(newCert);
        res.status(201).json({ success: true, message: "Certificate added!", id: docRef.id });
    } catch (error) { res.status(500).json({ error: error.message }); }
});

app.get('/get-certificates', async (req, res) => {
    try {
        const snapshot = await db.collection('certificates').orderBy('createdAt', 'desc').get();
        const certificates = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(certificates);
    } catch (error) { res.status(500).json({ error: error.message }); }
});

// --- 3. CONTACT FORM ROUTE ---
app.post('/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        await db.collection('contacts').add({ name, email, message, sentAt: new Date() });
        res.status(201).json({ success: true, message: "Message Sent Successfully!" });
    } catch (error) { res.status(500).json({ error: error.message }); }
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});