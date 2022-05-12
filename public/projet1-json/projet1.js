// Projet1.js
// Par Ronald Jean-Julien et VotreNom
// Date de remise: 
// Librairie pour projet1.htm

/*
|----------------------------------------------------------------------------------|
| (GLOBAL; AJAX) Déclaration des variables de travail globales
|----------------------------------------------------------------------------------|
*/
/* Détection automatique du dossier où est entreposé l'application serveur */
var strNomApplication = 'http://localhost:8080/student';
let divSuccursales = document.getElementById('divSuccursales');
let identifiant = document.getElementById('tbMatricule');
let passe = document.getElementById('tbMotDePasse');
let connexionMessage = document.getElementById('lblMessageConnexion');
let lblMessageAjout = document.getElementById('lblMessageAjout');
let tbVilleAjout = document.getElementById('tbVilleAjout');
let tbBudgetAjout = document.getElementById('tbBudgetAjout');
let btnEffacerAjout = document.getElementById('btnEffacerAjout');
let lblNomComplet = document.getElementById('lblNomComplet');
let lblSuccursales = document.getElementById('lblSuccursales');
let tbVilleRetrait = document.getElementById('tbVilleRetrait');
let lblMessageRetrait = document.getElementById('lblMessageRetrait');
let tbVilleBudgetVisualisation = document.getElementById('tbVilleBudgetVisualisation');
let lblMessageBudgetVisualisation = document.getElementById('lblMessageBudgetVisualisation');
let lblRequete = document.getElementById('lblRequete');
let lblReponse = document.getElementById('lblReponse');
let btnNonSouvenir = document.getElementById('btnNonSouvenir');
let btnSouvenir = document.getElementById('btnSouvenir');

let specialCharacter =  /[ `!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?~]/


const estDansUnFormatValide1 = (strDonnee, strFormat) => {
	if(strDonnee.length !== strFormat.length) {
		for(let i=0; i<strDonnee.length; i++) {
			if(isNaN(strDonnee[i]) && strFormat[i]=="@") {
				return false
			}
			if(!(isNaN(strDonnee[i]) && strFormat[i]=="#")) {
				return false
			}
		}
		return false
	}
	return true 
}

/*
|--------------------------------------------------------------------------------------------------------------|
| initialiseInterface
|--------------------------------------------------------------------------------------------------------------|
*/
function initialiseInterface(binIdentificationPresente, binOperationsSuccursalesPresente, divSuccursalesPresente) {
    masqueB('divIdentification', !binIdentificationPresente);
    masqueB('divOperationsSuccursales', !binOperationsSuccursalesPresente);
    masqueB('divSuccursales', !divSuccursalesPresente);
}

/*
|--------------------------------------------------------------------------------------------------------------|
| initialiseIdentifiant
|--------------------------------------------------------------------------------------------------------------|
*/
function initialiseIdentifiant() {
 

}

/*
|--------------------------------------------------------------------------------------------------------------|
| enregistreIdentifiant
|--------------------------------------------------------------------------------------------------------------|
*/
function enregistreIdentifiant() {

    if(recupereCookie("user" == "")) {
        enregistreCookie("user", identifiant, 60)
        
    }

    if(recupereCookie("pass" == "")) {
        enregistreCookie("pass", passe, 60) 
    }

    btnSouvenir.style.display = "none"

   
    
    

    
    


}

/*
|--------------------------------------------------------------------------------------------------------------|
| detruitIdentifiant
|--------------------------------------------------------------------------------------------------------------|
*/
function detruitIdentifiant() {
    document.cookie = 'user=; Max-Age=0;'
    document.cookie = 'pass=; Max-Age=0;'
    btnNonSouvenir.style.display = "none"
    btnSouvenir.style.display = "block"

}

/*
|--------------------------------------------------------------------------------------------------------------|
| deconnexion
|--------------------------------------------------------------------------------------------------------------|
*/
function deconnexion() {
    window.location.reload();
}

/*
|--------------------------------------------------------------------------------------------------------------|
| effacerAjoutModification
|--------------------------------------------------------------------------------------------------------------|
*/
function effacerAjoutModification() {
    let lblMessageAjout = document.getElementById('lblMessageAjout').innerText = "";
    let tbVilleAjout = document.getElementById('tbVilleAjout').value = "";
    let tbBudgetAjout = document.getElementById('tbBudgetAjout').value = "";
}

/*
|--------------------------------------------------------------------------------------------------------------|
| effacerRetrait
|--------------------------------------------------------------------------------------------------------------|
*/
function effacerRetrait() {
    tbVilleRetrait.value = ""
    lblMessageRetrait.innerText = ""
}

/*
|--------------------------------------------------------------------------------------------------------------|
| effacerBudgetVisualisation
|--------------------------------------------------------------------------------------------------------------|
*/
function effacerBudgetVisualisation() {
    lblMessageBudgetVisualisation.innerText = ""
    tbVilleBudgetVisualisation.value = ""
}


/*
|--------------------------------------------------------------------------------------------------------------|
| Module ajax_compteSuccursales
|--------------------------------------------------------------------------------------------------------------|
*/
function ajax_compteSuccursales() {
    /*
    |-----------------------------------------------------------------------------------------------------------|
    | recupereReponseServeur
    |-----------------------------------------------------------------------------------------------------------|
    */
    function recupereReponseServeur(strVerdict) {
        console.log(strVerdict);
    }
    requeteServeur(`${strNomApplication}`, `Action=Succursale-Ajout&Aut= 011111115356&Ville=${tbVilleAjout}&${tbBudgetAjout}=10000`, recupereReponseServeur, true);
    lblRequete.innerText = `Action=Succursale-Ajout&Aut= 011111115356&Ville=${tbVilleAjout}&${tbBudgetAjout}=10000`
   
    /*
    |-----------------------------------------------------------------------------------------------------------|
    | Module directeur (ajax_compteSuccursales)
    |-----------------------------------------------------------------------------------------------------------|
    */
    // A programmer
}

/*
|--------------------------------------------------------------------------------------------------------------|
| Module ajax_afficheListeSuccursales
|--------------------------------------------------------------------------------------------------------------|
*/
function ajax_afficheListeSuccursales() {
    /*
    |-----------------------------------------------------------------------------------------------------------|
    | recupereReponseServeur
    |-----------------------------------------------------------------------------------------------------------|
    */
  
    fetch('http://localhost:8080/succursales/succursales ')
            .then(response => response.json()) 
            .then(data => {
                console.log(data)
                let tableMiddle = ''
                    for(let i=0; i<data.length; i++) {
                        tableMiddle += `<tr><td class="sCelNoSuccursale">${i}</td><td class="sCelVille">${data[i].nome}</td><td class="sCelBudget">${data[i].budget}$</td></tr>`
                    }
                    
                    let tableTop =  `<table class="sTableauSuccursales"><thead><tr class="sEnteteTableauSuccursales"><th>No</th><th>Ville</th><th>Budget</th></tr></thead><tbody class="sCorpsTableauSuccursales">`
                    let tableBottom =  `</tbody></table>`
                    
                    let table = tableTop +tableMiddle+ tableBottom
                    
                
                    let tableContainer = document.createElement("div");
                    tableContainer.innerHTML = table;
                    console.log(divSuccursales.querySelector('.sTableauSuccursales'))
                    if(divSuccursales.querySelector('.sTableauSuccursales')){
                        divSuccursales.querySelector('.sTableauSuccursales').remove()
                    }
                    divSuccursales.appendChild(tableContainer);
            })
            .catch(err => console.log(err));
   

    
    function recupereReponseServeur1(strVerdict) {
       
        
    }
    

    
   
    

    
    /*
    |-----------------------------------------------------------------------------------------------------------|
    | Module directeur (ajax_afficheListeSuccursales)
    |-----------------------------------------------------------------------------------------------------------|
    */
    // A programmer
}

/*
|--------------------------------------------------------------------------------------------------------------|
| Module ajax_tenteConnexion
|--------------------------------------------------------------------------------------------------------------|
*/
function ajax_tenteConnexion() {
     /*
    |-----------------------------------------------------------------------------------------------------------|
    | recupereReponseServeur
    |-----------------------------------------------------------------------------------------------------------|
    */

    function recupereReponseServeur(strVerdict) {
        connexionMessage.innerText = strVerdict;
    }


    if(!estDansUnFormatValide1(identifiant.value, '#######')) {
        recupereReponseServeur("Identifiant invalide");
       }
    
        if(!estDansUnFormatValide1(passe.value, '@@@@@@#####')) {
            recupereReponseServeur("Mot de passe invalide");
        }
    
        if(!estDansUnFormatValide1(identifiant.value, '#######') && !estDansUnFormatValide1(passe.value, '@@@@@@#####')) {
            recupereReponseServeur("Identifiant  et mot de passe invalide");
        }
    
        if(estDansUnFormatValide1(passe.value, '@@@@@@#####') && estDansUnFormatValide1(identifiant.value, '#######')) {
            fetch('http://localhost:8080/student/login  ', {
                method: "POST",
                body: JSON.stringify({matricule: identifiant.value, parole: passe.value}),
                headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            .then(response => response.text()) 
            .then(text => {
                console.log(text)
                if(text === "OK") {
                    // recupereReponseServeur();
                    masqueB('divIdentification', false);
                    masqueB('divOperationsSuccursales', false);
                    masqueB('divSuccursales', false);
                    connexionMessage.innerText = "Vous êtes connecté - Alexandru Constantin"
            } else {
                connexionMessage.innerText = text
            }
            })
            .catch(err => console.log(err));
        }



   
    /*
    |-----------------------------------------------------------------------------------------------------------|
    | Module directeur (ajax_tenteConnexion)
    |-----------------------------------------------------------------------------------------------------------|
    */
    // A programmer
}

/*
|--------------------------------------------------------------------------------------------------------------|
| Module ajax_tenteAjoutModificationSuccursale
|--------------------------------------------------------------------------------------------------------------|
*/

 function ajax_tenteAjoutModificationSuccursale() {
  
   /*
   |-----------------------------------------------------------------------------------------------------------|
   | recupereReponseServeur
   |-----------------------------------------------------------------------------------------------------------|
   */
    console.log("test")

   if(specialCharacter.test(tbVilleAjout.value)) {
    lblMessageAjout.innerText = "Ville invalide!"
   }

   if(parseInt(tbBudgetAjout.value) < 100 || parseInt(tbBudgetAjout.value) > 9999999) {
    lblMessageAjout.innerText = "Budget invalide!"
    }

    if(specialCharacter.test(tbVilleAjout.value) && parseInt(tbBudgetAjout.value) < 100 && parseInt(tbBudgetAjout.value) > 9999999) {
        lblMessageAjout.innerText = "Ville et budget invalide!"
    }

   

    if(!specialCharacter.test(tbVilleAjout.value) && parseInt(tbBudgetAjout.value) > 100 && parseInt(tbBudgetAjout.value) < 9999999) {
        let requestOptions = {
            method: 'POST',
            headers: {"Content-type": "application/json; charset=UTF-8"},
            body: JSON.stringify({nome: tbVilleAjout.value, budget: tbBudgetAjout})
        };
        fetch('http://localhost:8080/succursales/succursale', requestOptions)
            .then(response => response.json())
            .then(data => lblMessageAjout.innerText = data.message);
    }

  

    
    
   /*
   |-----------------------------------------------------------------------------------------------------------|
   | Module directeur (ajax_tenteAjoutModificationSuccursale)
   |-----------------------------------------------------------------------------------------------------------|
   */
     // A programmer
}

/*
|--------------------------------------------------------------------------------------------------------------|
| Module ajax_tenteRetraitSuccursale
|--------------------------------------------------------------------------------------------------------------|
*/
function ajax_tenteRetraitSuccursale() {
    
   /*
   |-----------------------------------------------------------------------------------------------------------|
   | recupereReponseServeur
   |-----------------------------------------------------------------------------------------------------------|
   */


   if(specialCharacter.test(tbVilleAjout.value)) {
    lblMessageAjout.innerText = "Ville invalide!"
   }

    if(!specialCharacter.test(tbVilleAjout.value)) {
        fetch('http://localhost:8080/succursales/succursale/'+tbVilleRetrait.value, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            lblMessageRetrait.innerText = data.message})
    .catch(err => console.log(err));
    }

  
  
   /*
   |-----------------------------------------------------------------------------------------------------------|
   | Module directeur (ajax_tenteRetraitSuccursale)
   |-----------------------------------------------------------------------------------------------------------|
   */
        // A programmer
  }


/*
|--------------------------------------------------------------------------------------------------------------|
| Module ajax_tenteVisualisationBudgetSuccursale
|--------------------------------------------------------------------------------------------------------------|
*/

 function ajax_tenteVisualisationBudgetSuccursale() {
    
   /*
   |-----------------------------------------------------------------------------------------------------------|
   | recupereReponseServeur
   |-----------------------------------------------------------------------------------------------------------|
   */
   if(specialCharacter.test(tbVilleBudgetVisualisation.value)) {
    lblMessageBudgetVisualisation.innerText = "Ville invalide!"
   }

    if(!specialCharacter.test(tbVilleBudgetVisualisation.value)) {
        const options = {
            method: 'GET',
            headers: {"Content-type": "application/json; charset=UTF-8"} 
        };
        fetch( 'http://localhost:8080/succursales/succursale/'+tbVilleBudgetVisualisation.value, options )
            .then( response => response.json() )
            .then( response => {
                console.log(response);
                lblMessageBudgetVisualisation.innerText = response[0].budget;
            } );
    }


   /*
   |-----------------------------------------------------------------------------------------------------------|
   | Module directeur (ajax_tenteVisualisationBudgetSuccursale)
   |-----------------------------------------------------------------------------------------------------------|
   */
        // A programmer
}

/*
|--------------------------------------------------------------------------------------------------------------|
| Module ajax_reinitialiseSuccursales
|--------------------------------------------------------------------------------------------------------------|
*/
function ajax_reinitialiseSuccursales() {
    /*
    |-----------------------------------------------------------------------------------------------------------|
    | recupereReponseServeur
    |-----------------------------------------------------------------------------------------------------------|
    */
    function recupereReponseServeur(strVerdict) {
       console.log(strVerdict);
    }

    requeteServeur(`${strNomApplication}`, `Action=Succursale-Suppression&Autt&Aut=011111115356`, recupereReponseServeur, true);


    /*
    |-----------------------------------------------------------------------------------------------------------|
    | Module directeur (ajax_reinitialiseSuccursales)
    |-----------------------------------------------------------------------------------------------------------|
    */
    // A programmer
}



