const mysql = require('mysql2/promise');
const config = require('../../config/database');

class Model {
    constructor() {
        console.log('Config:', config.mysql);
        this.pool = mysql.createPool(config.mysql);
        this.initializeDatabase();
    }

    async initializeDatabase() {
        try {
            await this.pool.getConnection();
            console.log('✅ Connexion MySQL réussie!');
        } catch (error) {
            console.error('❌ Erreur de connexion MySQL:', error);
            throw error;
        }
    }

    async query(sql, params = []) {
        try {
            const [results] = await this.pool.execute(sql, params);
            return results;
        } catch (error) {
            throw new Error(`Database error: ${error.message}`);
        }
    }
}

module.exports = Model;