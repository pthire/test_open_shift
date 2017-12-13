//=========================================================================
// Traitement de "req_commencer"
// Auteur : P. Thiré
// Version : 09/10/2015
//=========================================================================

"use strict";

var fs = require("fs");
require("remedial");

var trait = function (req, res, query) {

	var page;
	var marqueurs;
	var secret;
	var partie;

	// AFFICHAGE DE LA PAGE D'ACCUEIL

	page = fs.readFileSync('mod_accueil.html', 'utf-8');

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};
//--------------------------------------------------------------------------

module.exports = trait;
