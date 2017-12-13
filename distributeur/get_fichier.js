//=========================================================================
// Traitement de l'envoi d'une requête fichier
// Auteur : P. Thiré
// Version : 06/05/2013
//=========================================================================

"use strict";

var fs = require("fs");
var path = require("path");
var url = require("url");
require('remedial');

var get_file = function (request, response, param) {

	var type;
	var sousType;
	var file = url.parse(request.url).pathname;

	// FABRIQUE LE PATH ABSOLU DU FICHIER DEMANDE

	file = __dirname + file;

	// AJUSTE LE TYPE EN FONCTION DE L'EXTENSION

	var extname = path.extname(file);
	if(extname === ".html") {
		type = 'text';
		sousType = 'html';
	} else if (extname === ".css") {
		type = 'text';
		sousType = 'css';
	} else if (extname === ".js") {
		type = 'text';
		sousType = 'js';
	} else if (extname === ".jpg" || extname === ".jpeg") {
		type = 'image';
		sousType = 'jpeg';
	} else if (extname === ".gif") {
		type = 'image';
		sousType = 'gif';
	} else if (extname === ".png") {
		type = 'image';
		sousType = 'png';
	}

	// ENVOI L'ENTETE AVEC LE TYPE PUIS LE FICHIER
	// SI LE FICHIER N'EXISTE PAS, ENVOI D'UNE PAGE 404

	try {
		var page = fs.readFileSync(file);
		response.writeHead(200, {'Content-Type': type + "/" + sousType});
		response.write(page);
		response.end();
	} catch (e) {
		response.writeHead(200, {'Content-Type': 'text/plain'});
		response.write('ERREUR 404 : fichier non trouvé');
		response.end();
	}
};

//---------------------------------------------------------------------------

module.exports = get_file;
