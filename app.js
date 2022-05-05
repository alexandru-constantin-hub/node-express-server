const express = require('express');
const path = require('path');


const app = express();

app.get('/projet1', (req, res, next) => {
    res.sendFile(path.join(__dirname,'views','projet1.html'));
});

app.use(express.static(path.join(__dirname, 'views')));


app.listen(8080);