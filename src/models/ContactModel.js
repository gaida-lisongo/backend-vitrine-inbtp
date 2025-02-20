const AboutModel = require('./AboutModel');

class ContactModel extends AboutModel {
    async createMessage(email, objet, contenu) {
        const sql = `
            INSERT INTO contact (email, objet, contenu)
            VALUES (?, ?, ?)
        `;
        
        return this.query(sql, [email, objet, contenu]);
    }

}

module.exports = ContactModel;