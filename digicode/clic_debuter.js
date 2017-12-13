//=========================================================================
// Traitement de "clic_debuter"
// Auteur : P. Thiré
// Version : 05/01/2014
//=========================================================================
"use strict";

var fs = require("fs");
var util = require("util");
require('remedial');

var trait = function (request, response, param) {

	var page;
	var patch = {};

	// REMISE A ZERO DU CODE

	fs.writeFileSync(__dirname + '/code', "");
	util.puts("raz");
	
	// AFFICHE page_distributeur

	page = fs.readFileSync(__dirname + '/page_digicode.html', 'utf-8');
	patch.code = "";
	patch.porte = "pf.png";
	patch.refresh = "";
	page = page.supplant(patch);

	response.writeHead(200, {'Content-Type': 'text/html'});
	response.write(page);
	response.end();
};

//--------------------------------------------------------------------------

module.exports = trait;
