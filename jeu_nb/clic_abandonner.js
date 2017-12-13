//=========================================================================
// Traitement de "clic_abandonner"
// Auteur : P. Thiré
// Version : 06/05/2013
//=========================================================================

"use strict";

var fs = require("fs");
require('remedial');

var trait = function (request, response, param) {

	var page;

	// LECTURE EN ENVOI DE page_au_revoir

	page = fs.readFileSync('page_au_revoir.html', 'UTF-8');

	response.writeHead(200, {'Content-Type': 'text/html'});
	response.write(page);
	response.end();
};

//--------------------------------------------------------------------------

module.exports = trait;
