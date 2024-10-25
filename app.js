const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const axios = require('axios');

const taskRoutes = require('./routes/taskRoutes');

const app = express();
app.use(bodyParser.json());

// Define configuration values directly in the code
const MONGO_URI = "mongodb://localhost:27017/microservice2-db"; // Adjust as needed
const PORT = 3002; // Adjust as needed
const CLIENT_FORNISSEUR_API = "http://localhost:3001"; // URL of microservice1

// Connect to MongoDB
mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error(error));

// Routes
app.use('/tasks', taskRoutes);

// Sample route to fetch data from microservice1 for a specific client and fornisseur
app.get('/client-fornisseur/:clientId/:fornisseurId', async (req, res) => {
    try {
        const client = await axios.get(`${CLIENT_FORNISSEUR_API}/clients/${req.params.clientId}`);
        const fornisseur = await axios.get(`${CLIENT_FORNISSEUR_API}/fornisseurs/${req.params.fornisseurId}`);
        res.json({ client: client.data, fornisseur: fornisseur.data });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch client or fornisseur details' });
    }
});

app.listen(PORT, () => {
    console.log(`Task service running on port ${PORT}`);
});
