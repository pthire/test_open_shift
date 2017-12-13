//=========================================================================
// Traitement de "req_changer"
// Auteur : P. Thiré
// Version : 01/12/2017
//=========================================================================
"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var marqueurs;
	var page;
	var cadenas;
	var etat;
	var i;

	// LECTURE ET MODIFICATION DU FICHIER QUI CONTIENT L'ETAT DU CADENA

	cadenas = JSON.parse(fs.readFileSync("cadenas.json", "utf-8"));

	if(query.sens === "plus") {
		cadenas.actuel[query.nb] = (cadenas.actuel[query.nb]+1) % 10;
	} else {
		cadenas.actuel[query.nb] = cadenas.actuel[query.nb]-1;
		if(cadenas.actuel[query.nb] < 0) {
			cadenas.actuel[query.nb] = 9;
		}
	}

	// TEST SI ON EST SUR LA BONNE COMBINAISON

	etat = 0;
	for(i=0; i<cadenas.actuel.length; i++) {
		if(cadenas.actuel[i] === cadenas.secret[i]) {
			etat++;
		}
	}
	if(etat === 4) {
		cadenas.etat = "o";
	}

	fs.writeFileSync("cadenas.json", JSON.stringify(cadenas), "UTF-8");

	// AFFICHAGE DE LA PAGE MACHINE

	page = fs.readFileSync('modele_cadenas.html', 'utf-8');

	marqueurs = {};
	if(cadenas.etat === "o") {
		marqueurs.cadenas = "cadenas_ouvert.jpg";
	} else {
		marqueurs.cadenas = "cadenas_ferme.jpg";
	}
	marqueurs.c1 = cadenas.actuel[0];
	marqueurs.c2 = cadenas.actuel[1];
	marqueurs.c3 = cadenas.actuel[2];
	marqueurs.c4 = cadenas.actuel[3];

	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};
//--------------------------------------------------------------------------

module.exports = trait;
