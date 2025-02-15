require('dotenv').config();
const express = require('express');
const Memcached = require('memcached');
const config = require('../config/database');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 8080;

// corse
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Middleware pour le parsing JSON
app.use(express.json());

// Initialiser Memcached
const memcached = new Memcached(`${config.memcached.host}:${config.memcached.port}`);

// Utiliser toutes les routes avec le préfixe /api/v1
app.use('/api/v1', routes);

// Démarrer le serveur
app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
});