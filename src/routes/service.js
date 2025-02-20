const express = require('express');
const router = express.Router();
const ServiceController = require('../controllers/ServiceController');

const serviceController = new ServiceController();

router.get('/', (req, res) => serviceController.index(req, res));

router.get('/annees', async (req, res) => {
    const data = await serviceController.model.getAllYears();

    return serviceController.success(res, data, 'Liste des années académiques');
});
router.get('/annee', async (req, res) => {
    const data = await serviceController.model.getCurrentYear();

    return serviceController.success(res, data, 'Liste des années académiques');
});

router.get('/cycles', async (req, res) => {
    const data = await serviceController.model.getAllCycles();

    return serviceController.success(res, data, 'Liste des cycles');
});

router.get('/niveaux', async (req, res) => {
    const data = await serviceController.model.getAllNiveaux();

    return serviceController.success(res, data, 'Liste des niveaux');
});

router.get('/matieres/:id', async (req, res) => {
    const id = req.params.id;
    const annee = await serviceController.model.getCurrentYear();
    console.log(annee.data);
    const data = await serviceController.model.getMatieresByPromotion(parseInt(id), parseInt(annee[0].id));

    return serviceController.success(res, data, 'Liste des matières');

});

router.get('/formulaires/:id', async (req, res) => {
    const id = req.params.id;
    
    const data = await serviceController.model.getFormulaireByPromo(parseInt(id));

    return serviceController.success(res, data, 'Liste des Formulaires');
});

router.get('/frais/:id_formulaire/:id_annee', async (req, res) => {
    const {id_formulaire, id_annee} = req.params;
    
    const data = await serviceController.model.getFraisByForm({id_formulaire, id_annee});

    return serviceController.success(res, data, 'Liste des Frais Académiques');
});

router.post('/inscription', async (req, res) => serviceController.inscription(req, res));
// router.get('/sections', (req, res) => homeController.sections(req, res));
// router.get('/metriques', (req, res) => homeController.metriques(req, res));
// router.get('/orientations', (req, res) => homeController.orientation(req, res));

module.exports = router;