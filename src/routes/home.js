const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/HomeController');

const homeController = new HomeController();

router.get('/', (req, res) => homeController.index(req, res));
router.get('/mentions', (req, res) => homeController.mentions(req, res));
router.get('/sections', (req, res) => homeController.sections(req, res));
router.get('/metriques', (req, res) => homeController.metriques(req, res));
router.get('/orientations', (req, res) => homeController.orientation(req, res));

module.exports = router;