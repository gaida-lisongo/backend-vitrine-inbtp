const express = require('express');
const router = express.Router();
const AboutController = require('../controllers/AboutController');

const aboutController = new AboutController();

router.get('/', (req, res) => aboutController.index(req, res));
router.get('/coge', (req, res) => aboutController.coge(req, res));

module.exports = router;