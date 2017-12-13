//=========================================================================
// Traitement de "req_accueillir"
// Auteur : P. Thiré
// Version : 28/11/2015
//=========================================================================
"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	// AFFICHAGE DE LA page_accueil

	var page = fs.readFileSync('modele_accueil.html', 'utf-8');

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

//--------------------------------------------------------------------------

module.exports = trait;
