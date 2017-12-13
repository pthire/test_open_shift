//=========================================================================
// Traitement de "req_deconnecter"
// Auteur : P. Thiré
// Version : 09/10/2015
//=========================================================================

"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var marqueurs;
	var pseudo;
	var page;
	var contenu_fichier;
	var connecte;
	var connectes;
	var i;
	var trouve;
	var iPseudo;
	var htmlMembres;

	// ON LIT LA LISTE DES MEMBRES CONNECTES

	contenu_fichier = fs.readFileSync("connectes.json", 'utf-8');    
	connectes = JSON.parse(contenu_fichier);

	// ON CHERCHE L'INDICE DU MEMBRE

	trouve = false;
	i = 0;
	while(i<connectes.length && trouve === false) {
		if(connectes[i].pseudo === query.pseudo) {
			trouve = true;
			iPseudo = i;
		}
		i++;
	}

	// ON RETIRE LE MEMBRE DE LA LISTE DES CONNECTES

	if(trouve === true) {
		connectes.splice(iPseudo, 1);
	}

	contenu_fichier = JSON.stringify(connectes);
	fs.writeFileSync("connectes.json", contenu_fichier, "UTF-8");

	// ON RENVOIE PAGE ACCUEIL MEMBRE

	page = fs.readFileSync('mod_accueil.html', 'utf-8');

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

//---------------------------------------------------------------------------

module.exports = trait;
