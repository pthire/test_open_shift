//=========================================================================
// Traitement de "clic_touche"
// Auteur : P. Thiré
// Version : 05/01/2014
//=========================================================================
"use strict";

var fs = require("fs");
var util = require("util");
require('remedial');

var trait = function (request, response, param) {

	var patch = {};
	var code;
	var touche;
	var status;
	var porte;

	// RECUPERE TOUCHE

	touche = param["touche"];

	// RECUPERE CODE

	code = fs.readFileSync(__dirname + '/code', 'UTF-8');

	// CONCATENE TOUCHE

	code = code + touche;

	// ON REGARDE SI CODE OK

	if(code === "3141") {
		util.puts("raz");
		porte = "po.png";
	} else if (code.length === 4) {
		util.puts("raz");
		porte = "pf.png";
	} else {
		porte = "pf.png";
	}

	// RE-ENREGISTRE LE CODE

	fs.writeFileSync(__dirname + '/code', code, 'UTF-8');

	// AFFICHAGE PAGE HTML

	var page = fs.readFileSync(__dirname + '/page_digicode.html', 'utf-8');

	patch.code = code;
	patch.porte = porte;
	patch.refresh = '<meta http-equiv="refresh" content="5; url=clic_debuter">';

	page = page.supplant(patch);

	response.writeHead(200, {'Content-Type': 'text/html'});
	response.write(page);
	response.end();
};

//--------------------------------------------------------------------------

module.exports = trait;
