//=========================================================================
// Traitement de "clic_choisir"
// Auteur : P. Thiré
// Version : 06/05/2013
//=========================================================================
"use strict";

var fs = require("fs");
require('remedial');

var trait = function (request, response, param) {

	var patch = {};
	var choix;
	var rendu;
	var compte;

	var prix = {};
	prix["coca"] = 2;
	prix["kinder"] = 1.5;
	prix["chips"] = 1;

	// RECUPERE COMPTE

	compte = fs.readFileSync(__dirname + '/compte', 'UTF-8');
	compte = parseFloat(compte);

	// REMET LE COMPTE A ZERO

	fs.writeFileSync(__dirname + '/compte', 0);

	// DETERMINATION DU PRODUIT CHOISI

	choix = param.choix;
	prix = prix[choix];

	// ANALYSE

	rendu = compte - prix;
	if(rendu < 0) {
		choix = "";
	}	

	// AFFICHAGE DE LA page_produit

	var page = fs.readFileSync(__dirname + '/page_produit.html', 'utf-8');

	if(rendu >= 0) {
		patch.choix = choix;
	} else {
		patch.choix = "";
		rendu = compte;
	}

	if(rendu === 0) {
		patch.piece1 = "";
		patch.piece2 = "";
	} else if(rendu === 0.5) {
		patch.piece1 = "50";
		patch.piece2 = "";
	} else if(rendu === 1) {
		patch.piece1 = "1";
		patch.piece2 = "";
	} else if (rendu === 1.5) {
		patch.piece1 = "1";
		patch.piece2 = "50";
	} else {
		patch.piece1 = "2";
		patch.piece2 = "";
	}

	page = page.supplant(patch);

	response.writeHead(200, {'Content-Type': 'text/html'});
	response.write(page);
	response.end();
};

//--------------------------------------------------------------------------

module.exports = trait;
