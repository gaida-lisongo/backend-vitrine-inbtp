const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const ServiceController = require('./ServiceController');
const AuthModel = require('../models/AuthModel');
const jwtConfig = require('../config/jwt.config');

class AuthController extends ServiceController {
    constructor() {
        super();
        this.model = new AuthModel();
    }

    cryptPassword(password, salt) {
        try {
            const hashsMdp = crypto.scryptSync(password, salt, 64).toString('hex');
            
            console.log('hashsMdp:', hashsMdp);
            return hashsMdp;
        } catch (error) {
            console.error('Erreur de cryptage:', error);
            throw error;
        }
    }

    async register(req, res) {
        try {
            const { matricule, password } = req.body;

            const userExists = await this.model.getUserByMatricule(matricule);

            if (userExists.length > 0) {
                if (userExists[0].password != null) {
                    return this.error(res, 'Cet utilisateur existe déjà');
                }
            }

            const hashedPassword = this.cryptPassword(password, matricule);

            const user = await this.model.createAccount(matricule, hashedPassword);

            if (user.affectedRows === 0) {
                return this.error(res, 'Erreur lors de l\'enregistrement de l\'utilisateur');
            }

            return this.success(res, {}, 'Utilisateur enregistré avec succès');
        }
        catch (error) {
            return this.error(res, 'Erreur lors de l\'enregistrement de l\'utilisateur', error);
        }
    }

    async login(req, res) {
        try {
            const { matricule, password } = req.body;

            const hashedPassword = this.cryptPassword(password, matricule);
            
            const user = await this.model.login(matricule, hashedPassword);
            if (!user) {
                return this.error(res, 'Identifiants incorrects');
            }
            
            console.log('user:', user);
            const token = jwt.sign(
                { 
                    id: user.id,
                    matricule: user.matricule 
                },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            return this.success(res, {
                user,
                token
            });
        } catch (error) {
            return this.error(res, 'Erreur lors de la connexion', error);
        }
    }

    async changePassword(req, res) {
        try {
            const { matricule, oldPassword, newPassword } = req.body;

            const oldHashedPassword = this.cryptPassword(oldPassword, matricule);
            const user = await this.model.getUserByAuth(matricule, oldHashedPassword);

            if (!user) {
                return this.error(res, 'Ancien mot de passe incorrect');
            }

            const newHashedPassword = this.cryptPassword(newPassword, matricule);

            const updated = await this.model.updatePassword(matricule, newHashedPassword);

            if (!updated) {
                return this.error(res, 'Erreur lors du changement de mot de passe');
            }

            return this.success(res, {}, 'Mot de passe modifié avec succès');
        } catch (error) {
            return this.error(res, 'Erreur lors du changement de mot de passe', error);
        }
    }
}
module.exports = AuthController;