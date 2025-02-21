const mysql = require('mysql2/promise');
const config = require('../../config/database');

class Model {
    constructor() {
        this.pool = mysql.createPool(config.mysql);
        this.initializeDatabase();
    }

    async initializeDatabase() {
        try {
            await this.pool.getConnection();
        } catch (error) {
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

    async lastInsertedId() {
        try {
            const [results] = await this.pool.query('SELECT LAST_INSERT_ID() as id');
            return results[0].id;
        } catch (error) {
            throw new Error(`Database error: ${error.message}`);
        }
    }   
}

module.exports = Model;