const HomeController = require('./HomeController');
const ServiceModel = require('../models/ServiceModel');

const PdfPrinter = require('pdfmake');
const fs = require('fs');
const path = require('path');
const { parse } = require('url');

class ServiceController extends HomeController {
    constructor() {
        super();
        this.model = new ServiceModel();

        // Define fonts for PDF
        this.fonts = {
            Roboto: {
                normal: path.join(__dirname, '../assets/fonts/Roboto-Regular.ttf'),
                bold: path.join(__dirname, '../assets/fonts/Roboto-Medium.ttf'),
                italics: path.join(__dirname, '../assets/fonts/Roboto-Italic.ttf'),
                bolditalics: path.join(__dirname, '../assets/fonts/Roboto-MediumItalic.ttf')
            }
        };

    }

    generateInscriptionPDF(etudiant, services) {
        const printer = new PdfPrinter(this.fonts);
        
        // Vérification et formatage des services
        let soldeCumul = 0.0;

        const formattedServices = services.map((service, index) => {
            soldeCumul += parseFloat(service.montant);
            return [
                index + 1,
                service.designation || 'Non spécifié',
                service.montant ? `${service.montant} $` : '0 $',
                `${soldeCumul} $`
            ];
        });

        //Date au format francais cad JJ/MM/AAAA
        const date_naissance = new Date(etudiant.date_naiss).toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit', 
            year: 'numeric'
        });

        const docDefinition = {
            pageSize: 'A4',
            pageMargins: [40, 60, 40, 60],
            // userPassword: '123',
            // ownerPassword: '123456',
            permissions: {
                printing: 'highResolution', //'lowResolution'
                modifying: false,
                copying: false,
                annotating: true,
                fillingForms: true,
                contentAccessibility: true,
                documentAssembly: true
            },
            background: function(currentPage, pageSize) {
                return {
                    image: path.join(__dirname, '../assets/background.jpg'),
                    width: pageSize.width,
                    height: pageSize.height
                };
            },
            content: [
                // En-tête
                {
                    columns: [
                        [
                            { text: 'I.N.B.T.P', style: 'companyName', color: '#03a9f4' },
                            { text: '21, Avenue de la Montagne, Q. Joli-Parc', style: 'details' },
                            { text: 'Kinshasa/Ngaliema, RDC', style: 'details' },
                            { text: 'Téléphone : +243 99 812 04 23', style: 'details' },
                            { text: 'Section : Hydraulique et Environnement', style: 'details' },
                        ],
                        [
                            {
                                qr: `https://he.inbtp.net/checkUpInscription/${etudiant.id}`, //`https://he-section.site/checkUpEnrol/${session.id}`,
                                fit: 150,
                                alignment: 'right',
                            },
                        ],
                    ],
                },
                { text: '', margin: [0, 10] }, // Espace entre en-tête et contenu
                // Informations sur la facture
                {   
                    columns: [
                        [
                            { text: `INSCRIPTION PREPARATOIRE`, style: 'subheader' },
                            { text: `Lieu de naissance : ${etudiant.lieu_naissance}`, style: 'details' },
                            { text: `Date de naissance : ${date_naissance}`, style: 'details' },
                            { text: `Adresse : ${etudiant.adresse}`, style: 'details'},
                            { text: `Téléphone : ${etudiant.telephone}`, style: 'details'},
                            { text: `Email: ${etudiant.e_mail}`, style: 'details'}
                        ],
                        [
                            { text: `${etudiant.nom} ${etudiant.post_nom} ${etudiant.prenom}`, style: 'subheader' },
                            { text: `Matricule : ${etudiant.matricule}`, style: 'details' },
                            { text: `Sexe : ${etudiant.sexe}`, style: 'details' },
                            { text: `Solde Minerval : ${parseFloat(etudiant.solde)} CDF`, style: 'details' }
                        ],
                    ],
                },

                { text: '', margin: [0, 10] }, // Espace entre informations et tableau

                // Tableau des services
                {
                    table: {
                        widths: [20, '*', 100, 100],
                        body: [
                            [
                                { text: 'N°', bold: true, fillColor: '#03a9f4', color: 'white' },
                                { text: 'Service', bold: true, fillColor: '#03a9f4', color: 'white'},
                                { text: 'Montant', bold: true, fillColor: '#03a9f4', color: 'white'},
                                { text: 'Cumul', bold: true, fillColor: '#03a9f4', color: 'white',},
                            ],
                            ...formattedServices,
                            [
                                { text: 'Total', colSpan: 3, alignment: 'right', bold: true },
                                '', '', { text: `${soldeCumul} $`, alignment: 'left', bold: true, fillColor: '#e0e0e0' },
                            ],
                        ],
                    },
                    layout: 'lightHorizontalLines',
                },

                // Pied de page
                {
                    text: 'Merci pour votre confiance !\nSi vous avez des questions, contactez-nous.',
                    style: 'footer',
                    alignment: 'center',
                    margin: [0, 20, 0, 0],
                },
            ],
            styles: {
                companyName: { fontSize: 16, bold: true },
                header: { fontSize: 18, bold: true, margin: [0, 0, 0, 10], color: '#03a9f4' },
                subheader: { fontSize: 14, bold: true, margin: [0, 5, 0, 10] },
                details: { fontSize: 12, margin: [0, 2, 0, 2] },
                footer: { fontSize: 10, italics: true, color: '#777' },
            },
        };
        return printer.createPdfKitDocument(docDefinition);
    }

    async index(req, res) {
        try {
            const data = await this.model.getAllPromotions();
            return this.success(res, data, 'Liste des promotions');

        } catch (error) {
            return console.error('Error index', error);
        }
    }
 
    async inscription(req, res) {
        try {
            //Récupération des données de l'étudiant dans le formulaire
            const data = req.body;
            
            let user = {
                id: null,
                nom: data.nom,
                post_nom: data.postnom,
                prenom: data.prenom,
                sexe: data.sexe,
                date_naissance: data.dateNaissance,
                adresse: data.adresse,
                telephone: data.telephone,
                lieu_naissance: data.lieuNaissance,
                email: data.email,
                inscription: data.url,
                orderNumber: data.orderNumber
            };
    
            const services = data.frais;
    
            const reponse = await this.model.createEtudiant(user);
            
            const etudiantId = await this.model.lastInsertedId();
    
            user.id = etudiantId;
    
            //Création de la commande d'inscription
            services.map(async service => {
                const commande = {
                    id_frais_acad: service.id,
                    id_etudiant: etudiantId,
                    date_creation: new Date(),
                    statut: 'OK',
                    id_agent: 20,
                    ref: `${etudiantId}.${service.id}.${new Date().getFullYear()}.${service.designation}`,
                    id_annee: 1,
                    payment: 'MOBILE MONEY',
                    orderNumber: data.orderNumber
                };
                await this.model.createCommandeInscription(commande);
            });
            
            //Enregistrement du fichier
            await this.model.setMatricule(etudiantId, "PREP");
            await this.model.createAdminInscription({id_etudiant: etudiantId, inscription: user.inscription});
            // const fileName = await serviceController.uploadFile(file);
            const etudiant = await this.model.getETudiantById(etudiantId);
            
            const pdfDoc = this.generateInscriptionPDF(etudiant[0], services);
        
            const chunks = [];
            pdfDoc.on('data', chunk => chunks.push(chunk));
            pdfDoc.on('end', () => {
                const result = Buffer.concat(chunks);
                
                // Ajouter le PDF à la réponse
                return this.success(res, {
                    etudiant,
                    pdf: {
                        data: result.toString('base64'),
                        filename: `inscription_${etudiant[0].id}.pdf`
                    }
                }, 'Inscription effectuée avec succès');            
                
            });
    
            pdfDoc.end();
            
        } catch (error) {
            return this.error(res, error);
        }
    };
    

}

module.exports = ServiceController;