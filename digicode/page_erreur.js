//=========================================================================
// Affichage d'une page d'erreur
// Auteur : P. Thiré
// Version : 06/05/2013
//=========================================================================

"use strict";

var fs = require("fs");
var path = require("path");
"use strict";


var show_erreur = function (request, response, param) {

	response.writeHead(200, {'Content-Type': 'text/plain'});

	response.write('ERREUR SERVEUR');

	response.end();
};

//--------------------------------------------------------------------------

module.exports = show_erreur;
