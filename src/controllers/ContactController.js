const AboutController = require('./AboutController');
const ContactModel = require('../models/ContactModel');
const nodemailer = require('nodemailer');

class ContactController extends AboutController {
    constructor() {
        super();
        this.model = new ContactModel();
        // Créer le transporteur une seule fois dans le constructeur
        this.transporter = nodemailer.createTransport({
            host: 'smtp.hostinger.com',
            port: 465,
            auth: {
                user: 'he@inbtp.net',
                pass: 'P@sse2mot'
            }
        });
    }

    async saveMessage(req, res) {
        try {
            const { email, objet, content } = req.body;
            
            // Vérifier les données requises
            if (!email || !objet || !content) {
                return this.error(res, 'Données manquantes');
            }

            // Sauvegarder dans la DB
            const data = await this.model.createMessage(email, objet, content);
            
            // Envoyer l'email
            try {
                const result = await this.sendEmail(email, objet, content);
                return this.success(res, { data, result }, 'Message envoyé');
            } catch (emailError) {
                console.error('Erreur envoi email:', emailError);
                // On retourne quand même un succès car le message est sauvegardé
                return this.success(res, { data }, 'Message sauvegardé mais erreur envoi email');
            }

        } catch (error) {
            console.error('Error saveMessage:', error);
            return this.error(res, 'Erreur lors de la sauvegarde du message');
        }
    }

    async sendEmail(email, objet, contenu) {        
        try {
            const mailOptions = {
                from: '"INBTP Section HE" <he@inbtp.net>',
                to: process.env.SMTP_TO || "lisongobaita@gmail.com",
                subject: `Nouveau message de ${email}: ${objet}`,
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2 style="color: #03a9f4;">Nouveau message via le formulaire de contact</h2>
                        <hr style="border: 1px solid #eee;">
                        <p><strong>De:</strong> ${email}</p>
                        <p><strong>Objet:</strong> ${objet}</p>
                        <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #03a9f4; margin: 20px 0;">
                            <p><strong>Message:</strong></p>
                            <p style="white-space: pre-wrap;">${contenu}</p>
                        </div>
                        <hr style="border: 1px solid #eee;">
                        <p style="color: #666; font-size: 12px;">
                            Ce message a été envoyé via le formulaire de contact du site web de l'INBTP.
                        </p>
                    </div>
                `
            };
            const result = await this.transporter.sendMail(mailOptions);
            return result;

        } catch (error) {
            console.error('Error sendEmail:', error);
            throw new Error('Erreur lors de l\'envoi de l\'email');
        }
    }
}

module.exports = ContactController;