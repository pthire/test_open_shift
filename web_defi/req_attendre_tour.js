//=========================================================================
// Traitement de "req_attendre_tour"
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
	var iAdversaire;
	var htmlMembres;
	var adversaire;
	var fichier_partie;
	var partie;

	// ON LIT LA LISTE DES MEMBRES CONNECTES

	contenu_fichier = fs.readFileSync("connectes.json", 'utf-8');    
	connectes = JSON.parse(contenu_fichier);

	// ON CHERCHE L'INDICE DU MEMBRE ET DE SON ADVERSAIRE

	trouve = false;
	i = 0;
	while(i<connectes.length && trouve === false) {
		if(connectes[i].pseudo === query.pseudo) {
			trouve = true;
			iPseudo = i;
		}
		i++;
	}
	adversaire = connectes[iPseudo].adversaire;

	trouve = false;
	i = 0;
	while(i<connectes.length && trouve === false) {
		if(connectes[i].pseudo === adversaire) {
			trouve = true;
			iAdversaire = i;
		}
		i++;
	}

	// ON LIT LE FICHIER PARTIE POUR VOIR SI C'EST AU MEMBRE DE JOUER
	// SI C'EST LE CAS, ON LUI ENVOIE LA PAGE JEU_ACTIF
	// SINON, ON LUI ENVOIE LA PAGE JEU_PASSIF

	contenu_fichier = fs.readFileSync(connectes[iPseudo].partie, "utf-8");
	partie = JSON.parse(contenu_fichier);

	if(partie.tour === query.pseudo) {
		page = fs.readFileSync('mod_jeu_actif.html', 'utf-8');
		marqueurs = {};
		marqueurs.pseudo = query.pseudo;
		marqueurs.adversaire = adversaire;

	} else {
		page = fs.readFileSync('mod_jeu_passif.html', 'utf-8');
		marqueurs = {};
		marqueurs.pseudo = query.pseudo;
		marqueurs.adversaire = adversaire;
	}

	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

//---------------------------------------------------------------------------

module.exports = trait;
