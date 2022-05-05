const express = require('express');
const projet1 = require('../controllers/projet1.js');

const router = express.Router();

router.get('/', projet1.getProjet1);

module.exports = router;