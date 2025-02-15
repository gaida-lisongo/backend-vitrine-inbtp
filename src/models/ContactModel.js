const AboutModel = require('./AboutModel');

class ContactModel extends AboutModel {
    async createMessage() {
        const sql = `
            INSERT INTO 
            contact (email, objet, contenu)
            VALUES (?, ?, ?)
        `;
        
        return this.query(sql);
    }

}

module.exports = ContactModel;