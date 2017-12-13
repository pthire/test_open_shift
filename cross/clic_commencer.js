//=========================================================================
// Traitement de "clic_commencer"
// Auteur : P. Thiré
// Version : 06/05/2013
//=========================================================================
"use strict";

var plateau = require("./plateau.js");
var fs = require("fs");
require('remedial');

var trait = function (request, response, param) {

	var patch = {};
	var ligne;
	var colonne;
	var page;

	// INITIALISATION DU PLATEAU AVEC DES PIONS DE MEME COULEUR

	plateau.init();

	plateau.ecrire("plateau");

	// FABRIQUE PAGE PLATEAU

	page = fs.readFileSync(__dirname + '/page_cross_game.html', 'utf-8');

	for(ligne=0; ligne < 3; ligne++) {
		for(colonne=0; colonne < 3; colonne++) {
			if(plateau.pions[ligne][colonne] == "r") {
				patch["pion_" + (ligne+1) + ":" + (colonne+1)] = "pr.png";
			} else {
				patch["pion_" + (ligne+1) + ":" + (colonne+1)] = "pb.png";
			}	
		}
	}

	page = page.supplant(patch);

	// ENVOIE LA PAGE AU NAVIGATEUR

	response.writeHead(200, {'Content-Type': 'text/html'});
	response.write(page);
	response.end();
};

//--------------------------------------------------------------------------

module.exports = trait;
