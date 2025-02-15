const HomeController = require('./HomeController');
const AboutModel = require('../models/AboutModel');

class AboutController extends HomeController {
    constructor() {
        super();
        this.model = new AboutModel();
    }

    async index(req, res) {
        try {
            return this.success(res, {}, 'Welcome to the API');
        } catch (error) {
            return console.error('Error index', error);
        }
    }

    async coge(req, res) {
        try {
            const currentYear = await this.model.getCurrentYear();
            const coge = await this.model.getCogeByYear(currentYear[0].id);
            const team = await this.model.getTeamByCoge(coge[0].id);

            const data = {
                year: currentYear[0],
                team: team,
                coge: coge[0]
            }

            console.log('data', data);  
            return this.success(res, data, 'Liste des membres de l\'équipe');
        } catch (error) {
            return console.error('Error team', error);
        }
    }
}

module.exports = AboutController;