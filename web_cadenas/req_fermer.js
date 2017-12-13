//=========================================================================
// Traitement de "req_fermer"
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

	cadenas.etat = "f";
	cadenas.secret[0] = cadenas.actuel[0];
	cadenas.secret[1] = cadenas.actuel[1];
	cadenas.secret[2] = cadenas.actuel[2];
	cadenas.secret[3] = cadenas.actuel[3];

	fs.writeFileSync("cadenas.json", JSON.stringify(cadenas), "UTF-8");

	// AFFICHAGE DE LA PAGE MACHINE

	page = fs.readFileSync('modele_cadenas.html', 'utf-8');

	marqueurs = {};

	marqueurs.cadenas = "cadenas_ferme.png";

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
