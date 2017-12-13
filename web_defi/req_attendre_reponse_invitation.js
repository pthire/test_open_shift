//=========================================================================
// Traitement de "req_attendre_reponse_invitation"
// Auteur : P. Thiré
// Version : 09/10/2015
//=========================================================================

"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var marqueurs;
	var pseudo;
	var page;
	var contenu_fichier;
	var connecte;
	var connectes;
	var i;
	var trouve;
	var iPseudo;
	var iAdversaire;
	var htmlMembres;
	var adversaire;

	// ON LIT LA LISTE DES MEMBRES CONNECTES

	contenu_fichier = fs.readFileSync("connectes.json", 'utf-8');    
	connectes = JSON.parse(contenu_fichier);

	// ON CHERCHE L'INDICE DU MEMBRE ET DE SON ADVERSAIRE

	trouve = false;
	i = 0;
	while(i<connectes.length && trouve === false) {
		if(connectes[i].pseudo === query.pseudo) {
			trouve = true;
			iPseudo = i;
		}
		i++;
	}
	adversaire = connectes[iPseudo].adversaire;

	trouve = false;
	i = 0;
	while(i<connectes.length && trouve === false) {
		if(connectes[i].pseudo === adversaire) {
			trouve = true;
			iAdversaire = i;
		}
		i++;
	}

	// ON TESTE SI L'ADVERSAIRE  EST DANS L'ETAT :
	// "INVITE" : L'ADVERSAIRE N'A PAS ENCORE REPONDU
	// "EN_JEU" : L'ADVERSAIRE A ACCEPTE 'INVITATION
	// "LIBRE" : L'ADVERSAIRE A REFUSE L'INVITATION

	if(connectes[iAdversaire].etat === "INVITE") {
		page = fs.readFileSync('mod_attente_reponse_invitation.html', 'utf-8');
		marqueurs = {};
		marqueurs.pseudo = query.pseudo;
		marqueurs.adversaire = adversaire;

	} else if(connectes[iAdversaire].etat === "EN_JEU") {
		page = fs.readFileSync('mod_jeu_passif.html', 'utf-8');
		marqueurs = {};
		marqueurs.pseudo = query.pseudo;
		marqueurs.adversaire = adversaire;

	} else if(connectes[iAdversaire].etat === "LIBRE") {
		connectes[iPseudo].etat = "LIBRE";
		connectes[iPseudo].adversaire = "";

		contenu_fichier = JSON.stringify(connectes);
		fs.writeFileSync("connectes.json", contenu_fichier, "UTF-8");

		page = fs.readFileSync('mod_invitation_refusee.html', 'utf-8');
		marqueurs = {};
		marqueurs.pseudo = query.pseudo;
		marqueurs.adversaire = adversaire;

	} else {
		console.log("erreur ETAT " + adversaire);
	}

	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

//---------------------------------------------------------------------------

module.exports = trait;
