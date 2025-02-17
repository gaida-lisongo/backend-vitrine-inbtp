const HomeController = require('./HomeController');
const ServiceModel = require('../models/ServiceModel');

class ServiceController extends HomeController {
    constructor() {
        super();
        this.model = new ServiceModel();
    }

    async index(req, res) {
        try {
            const data = await this.model.getAllPromotions();
            return this.success(res, data, 'Liste des promotions');

        } catch (error) {
            return console.error('Error index', error);
        }
    }

    async uploadFile(req, res) {
        try {
            const {file} = req.files;
            const {id_promotion, id_dossier, id_annee} = req.body;

            //Création du dossier de stockage
            const folder = `public/uploads/${id_promotion}/${id_dossier}/${id_annee}`;
            if (!fs.existsSync(folder)) {
                fs.mkdirSync(folder, {recursive: true});
            } else {
                fs.rmdirSync(folder + '/', {recursive: true});
                fs.mkdirSync(folder, {recursive: true});
            }
            

            const data = await this.model.uploadFile({file, id_promotion, id_dossier, id_annee});

            return this.success(res, data, 'Fichier téléchargé avec succès');

        } catch (error) {
            return console.error('Error uploadFile', error);
        }
    }

}

module.exports = ServiceController;