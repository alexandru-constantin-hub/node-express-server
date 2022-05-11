const express = require('express');
const students = require('../controllers/students.js');

const router = express.Router();


router.post('/login', students.login);

module.exports = router;