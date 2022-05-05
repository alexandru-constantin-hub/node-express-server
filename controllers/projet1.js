const path = require('path');

exports.getProjet1 = (req, res, next) => {
    res.sendFile(path.join(__dirname,'../','public','projet1.html'))
};