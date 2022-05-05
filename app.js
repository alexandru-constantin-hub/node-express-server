const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname,'public')));

const indexProjet1 = require('./routes/projet1');

app.use('/projet1', indexProjet1);

app.listen(8080);