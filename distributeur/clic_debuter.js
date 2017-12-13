//=========================================================================
// Traitement de "clic_debuter"
// Auteur : P. Thiré
// Version : 06/05/2013
//=========================================================================
"use strict";

var fs = require("fs");
require('remedial');

var trait = function (request, response, param) {

	var page;
	var patch = {};

	// REMISE A ZERO DU COMPTE

	fs.writeFileSync(__dirname + '/compte', 0);
	
	// AFFICHE page_distributeur

	page = fs.readFileSync(__dirname + '/page_distributeur.html', 'utf-8');
	patch.compte = 0;
	page = page.supplant(patch);

	response.writeHead(200, {'Content-Type': 'text/html'});
	response.write(page);
	response.end();
};

//--------------------------------------------------------------------------

module.exports = trait;
