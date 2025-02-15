const BaseController = require('./BaseController');
const HomeModel = require('../models/HomeModel');

class HomeController extends BaseController {
    constructor() {
        super();
        this.model = new HomeModel(); 

    }

    async index(req, res) {
        try {
            const data = await this.model.getData();
            return this.success(res, data, 'Welcome to the API');
        } catch (error) {
            return console.error('Error index', error);
        }
    }

    async sections(req, res) {
        try {
            const data = await this.model.getSections();
            return this.success(res, data, 'Liste des sections');
        } catch (error) {
            return console.error('Error sections', error);
        }
    }

    async metriques (req, res) {
        try {
            const etudiants = await this.model.getEtudiants();
            const matieres = await this.model.getMatieres();
            const promotions = await this.model.getPromotions();

            console.log('etudiants', etudiants);
            console.log('matieres', matieres);
            console.log('promotions', promotions);

            const data = {
                etudiants: etudiants.length,
                matieres: matieres.length,
                promotions: promotions.length
            };

            return this.success(res, data, 'Liste des metriques');
        } catch (error) {
            return console.error('Error metriques', error);
        }
    }

    async orientation(req, res) {
        try {
            const data = await this.model.getOrientation();
            return this.success(res, data, 'Liste des orientations');
        } catch (error) {
            return console.error('Error orientation', error);
        }
    }
}

module.exports = HomeController;