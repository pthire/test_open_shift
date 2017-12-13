//=========================================================================
// Traitement de "clic_quitter"
// Auteur : P. Thiré
// Version : 06/05/2013
//=========================================================================
"use strict";

var fs = require("fs");
require('remedial');

var trait = function (request, response, param) {

	var page;

	// AFFICHAGE DE LA PAGE au_revoir

	page = fs.readFileSync('page_au_revoir.html', 'utf-8');
	response.writeHead(200, {'Content-Type': 'text/html'});
	response.write(page);

	response.end();
};

//---------------------------------------------------------------------------

module.exports = trait;
