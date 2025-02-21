const ServiceModel = require('./ServiceModel');

class AuthModel extends ServiceModel {
    async createAccount(matricule, password){
        const sql = `
            UPDATE agent SET mdp = ? WHERE matricule = ?
        `;
        
        return this.query(sql, [password, matricule]);
    }

    async getUserByMatricule(matricule) {
        const sql = `
            SELECT * FROM agent WHERE matricule = ?
        `;
        
        return this.query(sql, [matricule]);
    }

    async login(matricule, password) {
        const sql = `
            SELECT agent.*, origine.id_ville, origine.id AS 'origine', ville.nomVille, ville.id_province, province.nomProvince
            FROM agent
            INNER JOIN origine_agent origine ON origine.id_agent = agent.id
            INNER JOIN ville ON ville.id = origine.id_ville
            INNER JOIN province ON province.id = ville.id_province
            WHERE agent.matricule = ? AND agent.mdp = ?
        `;
        
        return this.query(sql, [matricule, password]);
    }

    async changeMdp(id, password) {
        const sql = `
            UPDATE agent
            SET mdp = ?
            WHERE id = ?
        `;
        
        return this.query(sql, [password, id]);
    }
}

module.exports = AuthModel;