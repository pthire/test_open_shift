//=========================================================================
// Traitement de "req_identifier"
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

	// ON CHERCHE SI LE MEMBRE EST DEJA CONNECTE

	trouve = false;
	i = 0;
	while(i<connectes.length && trouve === false) {
		if(connectes[i].pseudo === query.pseudo) {
			trouve = true;
			iPseudo = i;
		}
		i++;
	}

	// ON AJOUTE (OU NON) LE MEMBRE ET ON LE MET EN ETAT "LIBRE"

	if(trouve === false) {
		connecte = {};
		connecte.pseudo = query.pseudo;
		connecte.etat = "LIBRE";
		connectes.push(connecte);
	} else {
		connectes[iPseudo].etat = "LIBRE";
	}

	contenu_fichier = JSON.stringify(connectes);
	fs.writeFileSync("connectes.json", contenu_fichier, "UTF-8");

	// ON RENVOIE PAGE ACCUEIL MEMBRE

	page = fs.readFileSync('mod_accueil_membre.html', 'utf-8');

	htmlMembres = "";
	for(i=0; i<connectes.length; i++) {
		if(connectes[i].pseudo !== query.pseudo && connectes[i].etat === "LIBRE") {
			htmlMembres += "<a href='req_inviter_adversaire?pseudo=" + query.pseudo + "&adversaire=" + connectes[i].pseudo + "'>" + connectes[i].pseudo + "</a><br>";
		}
	}
	if(htmlMembres !== "") {
		htmlMembres = "Cliquez sur un joueur pour l'inviter à une partie :<p>" + htmlMembres;
	} else {
		htmlMembres = "Pas d'autres joueurs disponibles pour l'instant ...";
	}

	marqueurs = {};
	marqueurs.pseudo = query.pseudo;
	marqueurs.listeMembres = htmlMembres;

	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

//---------------------------------------------------------------------------

module.exports = trait;
