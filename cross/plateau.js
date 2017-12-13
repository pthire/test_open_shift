//=========================================================================
// Objet plateau
// Auteur : P. Thiré
// Version : 06/05/2013
//=========================================================================
"use strict";

var fs = require("fs");
require('remedial');

var plateau = {};

plateau.init = function () {

	plateau.pions = [];
	plateau.pions[0] = ["b", "b", "b"];
	plateau.pions[1] = ["b", "b", "b"];
	plateau.pions[2] = ["b", "b", "b"];

	return plateau;
};

plateau.lire = function (fichier) {

	var contenu = fs.readFileSync(fichier, 'utf-8');

	this.pions = JSON.parse(contenu);

	return this;
};

plateau.ecrire = function (fichier) {

	var contenu;

	contenu = JSON.stringify(this.pions);

	fs.writeFileSync(fichier, contenu, 'utf-8');

	return this;
};

plateau.inverser = function (ligne, colonne) {

	if(this.pions[ligne-1][colonne-1] === "r") {
		this.pions[ligne-1][colonne-1] = "b";
	} else {
		this.pions[ligne-1][colonne-1] = "r";
	}

	if(ligne-2 >= 0) {
		if(this.pions[ligne-2][colonne-1] === "r") {
			this.pions[ligne-2][colonne-1] = "b";
		} else {
			this.pions[ligne-2][colonne-1] = "r";
		}
	}

	if(ligne <=2) {
		if(this.pions[ligne][colonne-1] === "r") {
			this.pions[ligne][colonne-1] = "b";
		} else {
			this.pions[ligne][colonne-1] = "r";
		}
	}

	if(colonne-2 >= 0) {
		if(this.pions[ligne-1][colonne-2] === "r") {
			this.pions[ligne-1][colonne-2] = "b";
		} else {
			this.pions[ligne-1][colonne-2] = "r";
		}
	}

	if(colonne <=2) {
		if(this.pions[ligne-1][colonne] === "r") {
			this.pions[ligne-1][colonne] = "b";
		} else {
			this.pions[ligne-1][colonne] = "r";
		}
	}

	return this;
};

//--------------------------------------------------------------------------

module.exports = plateau;
