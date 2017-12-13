//=========================================================================
// Traitement de "clic_payer"
// Auteur : P. Thiré
// Version : 06/05/2013
//=========================================================================
"use strict";

var fs = require("fs");
require('remedial');

var trait = function (request, response, param) {

	var compte;
	var patch = {};
	var page;

	// AJOUTE LA PIECE AU COMPTE (SI ON NE DEPASSE PAS)

	compte = fs.readFileSync(__dirname + '/compte', 'UTF-8');
	compte = parseFloat(compte);

	if(compte < 2) {
		compte += parseFloat(param.piece);
	}

	fs.writeFileSync(__dirname + '/compte', compte);

	// AFFICHAGE DE LA page_distributeur

	page = fs.readFileSync(__dirname + '/page_distributeur.html', 'utf-8');
	patch.compte = compte;
	page = page.supplant(patch);

	response.writeHead(200, {'Content-Type': 'text/html'});
	response.write(page);
	response.end();
};

//--------------------------------------------------------------------------

module.exports = trait;
