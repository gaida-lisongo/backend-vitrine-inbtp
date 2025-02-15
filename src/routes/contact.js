const express = require('express');
const router = express.Router();
const ContactController = require('../controllers/ContactController');

const contactController = new ContactController();

router.post('/', async (req, res) => contactController.saveMessage(req, res));

module.exports = router;