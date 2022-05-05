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
var strNomApplication = 'http://424w.cgodin.qc.ca/m-airouche/Kit_Ajax_projet/gestion-bd-projet1.php';
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
    lblNomComplet.innerText = "Constantin Alexandru"
   
    

    function recupereReponseServeur(strVerdict) {
        lblSuccursales.innerText = "Nombre de succursale(s) "+strVerdict.slice(0,-1)
    }

   

    requeteServeur(`${strNomApplication}`, `Action=Succursale-Compte&Aut=011111115356`, recupereReponseServeur, true);
    requeteServeur(`${strNomApplication}`, `Action=Succursale-Liste&Aut=011111115356`, recupereReponseServeur1, true);



   

    
    function recupereReponseServeur1(strVerdict) {
        let tableContent = strVerdict.split(";")
        let tableMiddle = ''
        for(let i=0; i<tableContent.length-1; i++) {
            tableMiddle += `<tr><td class="sCelNoSuccursale">${i}</td><td class="sCelVille">${tableContent[i].split(",")[0]}</td><td class="sCelBudget">${tableContent[i].split(",")[1]}$</td></tr>`
        }
        
        let tableTop =  `<table clas=="sTableauSuccursales"><thead><tr class="sEnteteTableauSuccursales"><th>No</th><th>Ville</th><th>Budget</th></tr></thead><tbody class="sCorpsTableauSuccursales">`
        let tableBottom =  `</tbody></table>`
        
        let table = tableTop +tableMiddle+ tableBottom
        
    
        let tableContainer = document.createElement("div");
        tableContainer.innerHTML = table;
        divSuccursales.appendChild(tableContainer);
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
        requeteServeur(`${strNomApplication}`, `Action=Connexion&Mat=${identifiant.value}&MDP=${passe.value}`, recupereReponseServeur, true);
        recupereReponseServeur();
        masqueB('divIdentification', false);
        masqueB('divOperationsSuccursales', false);
        masqueB('divSuccursales', false);
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
        requeteServeur(`${strNomApplication}`, `Action=Succursale-Ajout&Aut=011111115356&Ville=${tbVilleAjout.value}&Budget=${tbBudgetAjout.value}`, recupereReponseServeur, true);
    }

   function recupereReponseServeur(strVerdict) {
       console.log(strVerdict);
        if(!specialCharacter.test(tbVilleAjout.value) && (parseInt(tbBudgetAjout.value) > 100 || parseInt(tbBudgetAjout.value) < 9999999)) {
            if(strVerdict == "OKI;" ) {
                lblMessageAjout.innerText = "Succursale ajoutée";
            }
            if(strVerdict == "OKM;" ) {
                lblMessageAjout.innerText = "Succursale modifiee";
            }
            if(strVerdict == "PASOK;" ) {
                lblMessageAjout.innerText = "Succursale existe";
            }
        }
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
        requeteServeur(`${strNomApplication}`, `Action=Succursale-Retrait&Aut=011111115356&Ville=${tbVilleRetrait.value}`, recupereReponseServeur, true);
    }

   function recupereReponseServeur(strVerdict) {
       console.log(strVerdict);
        if(!specialCharacter.test(tbVilleAjout.value)) {
            if(strVerdict == "OK;" ) {
                lblMessageRetrait.innerText = "Succursale retiree";
            }
            if(strVerdict == "PASOK;" ) {
                lblMessageRetrait.innerText = "Succursale inconnue!";
            }
        }
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
    lblMessageAjout.innerText = "Ville invalide!"
   }

    if(!specialCharacter.test(tbVilleBudgetVisualisation.value)) {
        requeteServeur(`${strNomApplication}`, `Action=Succursale-Budget&Aut=011111115356&Ville=${tbVilleBudgetVisualisation.value}`, recupereReponseServeur, true);
    }

   function recupereReponseServeur(strVerdict) {
       console.log(strVerdict);
        if(!specialCharacter.test(tbVilleBudgetVisualisation.value)) {
            if(strVerdict !== "PASOK;" ) {
                lblMessageBudgetVisualisation.innerText = strVerdict.slice(0,-1);
            }
            if(strVerdict == "PASOK;" ) {
                lblMessageBudgetVisualisation.innerText = "Succursale inconnue!";
            }
        }
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



