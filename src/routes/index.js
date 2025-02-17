const express = require('express');
const router = express.Router();

const homeRoutes = require('./home');
const aboutRoutes = require('./about');
const contactRoutes = require('./contact');
// const authRoutes = require('./auth');
const serviceRoutes = require('./service');

// Définition des routes avec préfixe /api/v1
router.use('/home', homeRoutes);
router.use('/about', aboutRoutes);
router.use('/contact', contactRoutes);
router.use('/services', serviceRoutes);
// router.use('/auth', authRoutes);

module.exports = router;