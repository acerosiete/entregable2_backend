const express = require('express');
const router = express.Router();
const digiController = require('../controller/digimon.controller');

router.get('/', digiController.getAllDigimons);
router.post('/', digiController.saveDigimon);
router.get('/name/:id', digiController.getDigimonByName);
router.get('/busqueda/:id', digiController.getDigimonByLevel);
router.get('/imagenAleatoria', digiController.getRandomImage);

module.exports = router;