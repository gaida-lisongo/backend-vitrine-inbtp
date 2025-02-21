const Model = require('./Model');

class HomeModel extends Model {
    async getData() {
        const sql = 'SELECT * FROM communique_coge';
        return this.query(sql);
    }

    async getMentions() {
        const sql = 'SELECT * FROM mentions';
        return this.query(sql);
    }

    async getSections() {
        const sql = 'SELECT * FROM section';
        return this.query(sql);
    }

    async getEtudiants() {
        const sql = 'SELECT * FROM etudiant';
        return this.query(sql)
    }

    async getMatieres() {
        const sql = 'SELECT * FROM matiere';
        return this.query(sql)
    }

    async getPromotions() {
        const sql = `SELECT promotion.*, section.sigle, niveau.intitule, niveau.systeme, cycle.designation, cycle.description
                    FROM promotion
                    INNER JOIN section ON promotion.id_section = section.id
                    INNER JOIN niveau ON promotion.id_niveau = niveau.id
                    INNER JOIN cycle ON cycle.id = niveau.id_cycle`;
        return this.query(sql);
    }    

    async getOrientation(){
        const sql = 'SELECT * FROM orientation';
        return this.query(sql);
    }
}

module.exports = HomeModel;