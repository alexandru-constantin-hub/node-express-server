const fs = require('fs');
const dataPath ='./data/students.json';

 
 const getAllStudents = ()=>{
    const jsonData = fs.readFileSync(dataPath);
    return JSON.parse(jsonData);
 }

 exports.login = (req, res, next)=>{
    const students = getAllStudents().filter(student => student.matricule == req.body.matricule);
    console.log(students);
    console.log( req.body.parole)
    if(students.length < 1){
        res.status(200).send("Le matricule n'existe pas");
    } else if(students.length > 0 && students[0].parole == req.body.parole) {
        res.status(200).send("OK");
    } else {
        res.status(200).send("Ce n'est pas le bon mot de passe");
    }
 };


 

 



