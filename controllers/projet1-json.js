const fs = require('fs');
const dataPath ='./data/succursales.json';

const saveSuccursale = (data)=>{
   const stringifyData = JSON.stringify(data);
   fs.writeFileSync(dataPath, stringifyData);
};

const getAllSuccursales = ()=>{
   const jsonData = fs.readFileSync(dataPath);
   return JSON.parse(jsonData);
}




exports.getSuccursales = (req, res, next)=>{
   const succursales = getAllSuccursales();
   res.status(200).send(succursales);
};

exports.createSuccursale = (req, res, next)=>{
    const nome = req.body.nome;
    const budget = req.body.budget;
    let succursales = getAllSuccursales().filter(succursale => succursale.nome === nome);
    if(succursales.length > 0) {
      res.status(200).send({
         message: 'Succursale already exists',
     });
    } else {
      let existSuccursale = getAllSuccursales();
      existSuccursale.push({nome, budget});
      saveSuccursale(existSuccursale);
      res.status(200).send({
      message: 'Succursale created successfully',
      succursale: {nome: nome, budget: budget}
    });
    }
    
    
};

exports.getSuccursale = (req, res, next)=>{
   const succursales = getAllSuccursales().filter(succursale => succursale.nome === req.params.nome);
   console.log(req.params.nome)
   res.status(200).send(succursales);
};

exports.updateSuccursale = (req, res, next)=>{
   const succursales = getAllSuccursales();
   for(let i = 0; i < succursales.length; i++){
      if(succursales[i].nome === req.params.nome){
         succursales[i].budget = req.body.budget;
         succursales[i].nome = req.body.nome;
      }
   }
   saveSuccursale(succursales);
   res.status(200).send({
      message: 'Succursale updated successfully',
      succursale: {nome: req.body.nome, budget: req.body.budget}
   });
};

exports.deleteSuccursale = (req, res, next)=>{
   let exists = false
   const succursales = getAllSuccursales();
   for(let i = 0; i < succursales.length; i++){
      if(succursales[i].nome === req.params.nome){
         exists = true;
          succursales.splice(i, 1);
      }
   }
   if(exists){
      saveSuccursale(succursales);
      res.status(200).send({
         message: 'Succursale delete successfully',
         succursale: {nome: req.params.nome}
      });
   } else {
      res.status(200).send({
         message: 'Succursale doesn\'t exist',
         succursale: {nome: req.params.nome}
      });
   }
  
};






