//=========================================================================
// Traitement de "clic_analyser"
// Auteur : P. Thiré
// Version : 06/05/2013
//=========================================================================

"use strict";

var fs = require("fs");
require('remedial');

var trait = function (request, response, param) {

	var page;
	var nb_secret;
	var nb_joueur;
	var joueur;
	var patch = {};
	var comparaison;

	// RECUPERE LE NB PROPOSE PAR LE JOUEUR ET LE NOM DU JOUEUR

	nb_joueur = param.nb_joueur;
	nb_joueur = parseInt(nb_joueur, 10);
	joueur = param.joueur;

	// RECUPERE LE NB SECRET

	nb_secret = fs.readFileSync('secret', 'UTF-8');
	nb_secret = parseInt(nb_secret, 10);

	// COMPARE LE NB PROPOSE PAR LE JOUEUR ET LE NB SECRET

	if(nb_secret < nb_joueur) {
		comparaison = "-";
	} else if (nb_secret > nb_joueur) {
		comparaison = "+";
	} else {
		comparaison = "=";
	}
	
	// SI LE JOUEUR N'A PAS TROUVE, ON RE-AFFICHE LA PAGE jeu
	// SI LE JOUEUR A TROUVE, ON AFFICHE LA PAGE gagne

	if(comparaison !== "=") {

		page = fs.readFileSync('page_jeu.html', 'UTF-8');

		patch.nb_secret = nb_secret;
		if(comparaison === "-") {
			patch.commentaire = "C'est plus petit que " + nb_joueur;
		} else if (comparaison === "+") {
			patch.commentaire = "C'est plus grand que " + nb_joueur;
		}

		page = page.supplant(patch);

	} else {

        page = fs.readFileSync('page_gagne.html', 'UTF-8');

	}

	// ENVOI DE LA PAGE

	response.writeHead(200, {'Content-Type': 'text/html'});
	response.write(page);
	response.end();
};

//---------------------------------------------------------------------------

module.exports = trait;
