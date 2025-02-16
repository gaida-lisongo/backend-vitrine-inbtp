const HomeModel = require('./HomeModel');

class AboutModel extends HomeModel {
    async getAllYears() {
        const sql = 'SELECT * FROM annee';
        return this.query(sql);
    }

    async getYearById(id) {
        const sql = 'SELECT * FROM annee WHERE id = ?';
        return this.query(sql, [id]);
    }

    async getCurrentYear() {
        const sql = `
                    SELECT *
                    FROM annee
                    ORDER BY id DESC
                    LIMIT 1
                `;
        return this.query(sql);
    }

    async getCogeByYear(anneId) {
        const sql = 'SELECT * FROM coge WHERE id_annee = ?';
        return this.query(sql, [anneId]);
    }

    async getTeamByCoge(cogeId) {
        const sql = `
            SELECT 
                a.id,
                a.nom,
                a.post_nom,
                a.prenom,
                a.e_mail,
                a.avatar,
                a.matricule,
                cd.membre as role,
                cd.niveau
            FROM agent a
            INNER JOIN coge_detail cd ON a.id = cd.id_agent
            WHERE cd.id_coge = ?
            ORDER BY cd.niveau DESC
        `;
        
        return this.query(sql, [cogeId]);
    }
}

module.exports = AboutModel;