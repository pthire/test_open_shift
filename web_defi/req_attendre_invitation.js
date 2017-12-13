//=========================================================================
// Traitement de "req_attendre_invitation"
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

	// ON TESTE SI LE MEMBRE EST TOUJOURS "LIBRE" OU EST "INVITE"
	// S'IL EST TOUJOURS "LIBRE" ON LUI RENVOIE LA PAGE ACCUEIL_MEMBRE
	// S'IL EST "INVITE", ON LUI RENVOIE LA PAGE INVITATION

	if(connectes[iPseudo].etat === "LIBRE") {
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


	} else if (connectes[iPseudo].etat === "INVITE") {
		page = fs.readFileSync('mod_invitation.html', 'utf-8');

		marqueurs = {};
		marqueurs.pseudo = query.pseudo;
		marqueurs.adversaire = connectes[iPseudo].adversaire;
	} else {
		console.log("erreur etat " + query.pseudo);
	}

	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

//---------------------------------------------------------------------------

module.exports = trait;
