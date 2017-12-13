//=========================================================================
// Traitement de "req_commencer"
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

	// CREATION DU FICHIER POUR MEMORISER L'ETAT DU CADENA

	cadenas = {};
	cadenas.secret = [1, 2, 3, 4];
	cadenas.actuel = [0, 0, 0, 0];
	cadenas.etat = "o";

	fs.writeFileSync("cadenas.json", JSON.stringify(cadenas), "UTF-8");

	// AFFICHAGE DE LA PAGE MACHINE

	page = fs.readFileSync('modele_cadenas.html', 'utf-8');

	marqueurs = {};
	marqueurs.cadenas = "cadenas_ouvert.jpg";
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
