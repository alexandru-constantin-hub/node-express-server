const express = require('express');
const index = require('../controllers/projet1.js');

const router = express.Router();

router.get('', index.getProjet1);

module.exports = router;