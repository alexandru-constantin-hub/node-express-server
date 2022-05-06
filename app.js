const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname,'public')));

app.use((req, res, next) =>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
})

const projet1 = require('./routes/projet1');
const projet1json = require('./routes/projet1-json');

app.use('/projet1', projet1);

app.get('/', function(req, res) {
    res.sendFile(path.join(path.join(__dirname,'public'), 'index.html'));
});

app.use('/projet1-json', projet1json);


app.listen(8080);