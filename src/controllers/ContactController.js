const AboutController = require('./AboutController');
const ContactModel = require('../models/ContactModel');
const nodemailer = require('nodemailer');

class ContactController extends AboutController {
    constructor() {
        super();
        this.model = new ContactModel();
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });
    }

    async saveMessage(req, res) {
        try {
            const { email, objet, contenu } = req.body;
            const data = await this.model.createMessage(email, objet, contenu);
            const result = await this.sendEmail(email, objet, contenu);

            console.log('statut sending email', result);
            return this.success(res, {data, result}, 'Message envoyé');
        } catch (error) {
            return console.error('Error saveMessage', error);
        }
    }

    async sendEmail(email, objet, contenu) {
        const mailOptions = {
            from: process.env.SMTP_USER,
            to: "inbpkinshasa@gmail.com",
            subject: `Nouveau message de ${email}: ${objet}`,
            html: `
                <h3>Nouveau message de contact</h3>
                <p><strong>De:</strong> ${email}</p>
                <p><strong>Objet:</strong> ${objet}</p>
                <p><strong>Message:</strong></pz>
                <p>${contenu}</p>
            `
        };

        const result = await this.transporter.sendMail(mailOptions);

        
        return result;
    }
}

module.exports = ContactController;