const express = require('express');
const projet1json = require('../controllers/projet1-json.js');

const router = express.Router();

router.get('/succursales', projet1json.getSuccursales);
router.post('/succursale', projet1json.createSuccursale);
router.get('/succursale/:nome', projet1json.getSuccursale);
router.put('/succursale/:nome', projet1json.updateSuccursale);
router.delete('/succursale/:nome', projet1json.deleteSuccursale);

module.exports = router;