const AboutModel = require('./AboutModel');

class ServiceModel extends AboutModel {
    async getAllCycles() {
        const sql = 'SELECT * FROM cycle';
        return this.query(sql);
    }
    
    async getAllNiveaux() {
        const sql = `SELECT niveau.*, cycle.designation
                    FROM niveau
                    INNER JOIN cycle ON cycle.id = niveau.id_cycle
                `;
        return this.query(sql);
    }
    
    async getAllPromotions() {
        const sql = `SELECT promotion.*, niveau.intitule AS 'niveau', section.sigle AS 'section'
                    FROM promotion
                    INNER JOIN section ON section.id = promotion.id_section
                    INNER JOIN niveau ON niveau.id = promotion.id_niveau
                `;
        return this.query(sql);
    }

    async getNiveauById(id) {
        const sql = `SELECT niveau.*, cycle.designation
                    FROM niveau
                    INNER JOIN cycle ON cycle.id = niveau.id_cycle
                    WHERE niveau.id = ?`;
        return this.query(sql, [id]);
    }

    async getPromotionById(id) {
        const sql = `
            SELECT promotion.*, niveau.intitule AS 'niveau', section.sigle AS 'section'
            FROM promotion
            INNER JOIN section ON section.id = promotion.id_section
            INNER JOIN niveau ON niveau.id = promotion.id_niveau
            WHERE promotion.id = ?
        `;
        return this.query(sql, [id]);
    }

    async getFormulaireByPromo(promoId) {
        const sql = `           
                SELECT formulaire.*, dossier.designation, dossier.description, dossier.annexes, dossier.folder, annee.debut, annee.fin
                FROM formulaire
                INNER JOIN dossier ON dossier.id = formulaire.id_dossier
                INNER JOIN annee ON annee.id = formulaire.id_annee
                WHERE formulaire.id_promotion = ?
        `;
        return this.query(sql, [promoId]);
    }

    async getFraisByForm(data) {
        const sql = ` SELECT detail_formulaire.*, formulaire.id_promotion, frais_academique.designation AS 'frais', frais_academique.montant AS 'prix', frais_academique.q_acad, frais_academique.q_coge, frais_academique.id_academique
                FROM detail_formulaire
                INNER JOIN formulaire ON formulaire.id = detail_formulaire.id_formulaire
                INNER JOIN frais_academique ON frais_academique.id = detail_formulaire.id_frais_acad
                WHERE detail_formulaire.id_formulaire = ? AND frais_academique.id_annee = 3;
        `;
        return this.query(sql, [data.id_promotion, data.id_annee]);
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

module.exports = ServiceModel;