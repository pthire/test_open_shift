//=========================================================================
// Traitement de "clic_commencer"
// Auteur : P. Thiré
// Version : 06/05/2013
//=========================================================================

"use strict";

var fs = require("fs");
require('remedial');

var trait = function (request, response, param) {

	var page;
	var secret;
	var patch;

	// ON CHOISIT UN NB ALEATOIRE QU'ON ENRGISTRE DANS LE FICHIER "secret"

	secret = Math.floor(Math.random() * 10) + 1;
	fs.writeFileSync('secret', secret);
	
	// AFFICHE page_jeu

	page = fs.readFileSync('page_jeu.html', 'utf-8');
	patch = {
	 	nb_secret : secret,
		commentaire : "",
		joueur : "albert"
	};
	page = page.supplant(patch);

	response.writeHead(200, {'Content-Type': 'text/html'});
	response.write(page);
	response.end();
};

//---------------------------------------------------------------------------

module.exports = trait;
