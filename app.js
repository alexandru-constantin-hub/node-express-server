const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname,'public/')));
app.use(express.static(path.join(__dirname,'public/projet1-json')));

app.use((req, res, next) =>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
})

const projet1 = require('./routes/projet1');
const projet1json = require('./routes/projet1-json');
const student = require('./routes/students');

app.use('/projet1', projet1);

app.get('/', function(req, res) {
    res.sendFile(path.join(path.join(__dirname,'public'), 'index.html'));
});

app.get('/succursale', function(req, res) {
    res.sendFile(path.join(path.join(__dirname,'public','projet1-json'), 'index.html'));
});

app.use('/succursales', projet1json);
app.use('/student', student);


app.listen(8080);