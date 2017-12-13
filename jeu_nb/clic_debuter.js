//=========================================================================
// Traitement de "clic_debuter"
// Auteur : P. Thiré
// Version : 06/05/2013
//=========================================================================
"use strict";

var fs = require("fs");
require('remedial');

var trait = function (request, response, param) {

	// AFFICHAGE DE LA page_accueil

	var page = fs.readFileSync('page_accueil.html', 'utf-8');

	response.writeHead(200, {'Content-Type': 'text/html'});
	response.write(page);
	response.end();
};

//--------------------------------------------------------------------------

module.exports = trait;
