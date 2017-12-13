//=========================================================================
// Traitement de "req_inviter"
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

	// ON LIT LA LISTE DES MEMBRES CONNECTES

	contenu_fichier = fs.readFileSync("connectes.json", 'utf-8');    
	connectes = JSON.parse(contenu_fichier);

	// ON CHERCHE L'INDICE DU MEMBRE ET CELUI DU MEMBRE INVITE A JOUER

	trouve = 0;
	i = 0;
	iAdversaire = -1;
	while(i<connectes.length && trouve !== 2) {
		if(connectes[i].pseudo === query.pseudo) {
			trouve++;
			iPseudo = i;
		} else if(connectes[i].pseudo === query.adversaire) {
			trouve++;
			iAdversaire = i;
		}
		i++;
	}

	// SI L'ADVERSAIRE EST TOUJOURS CONNECTE ET LIBRE
	//    ON MET LE PSEUDO EN ETAT "ATTENTE" EN PRECISANT L'ADVERSAIRE
	//    ON MET L'ADVERSAIRE EN ETAT "INVITE" EN PRECISANT L'ADVERSAIRE
	// SINON EN RENVOIE PAGE ACCUEIL_MEMBRE
	
	console.log(iAdversaire, connectes[iAdversaire].etat);
	if(iAdversaire >= 0 && connectes[iAdversaire].etat === "LIBRE") {
		connectes[iPseudo].etat = "ATTENTE";
		connectes[iPseudo].adversaire = query.adversaire;

		connectes[iAdversaire].etat = "INVITE";
		connectes[iAdversaire].adversaire = query.pseudo;

		contenu_fichier = JSON.stringify(connectes);
		fs.writeFileSync("connectes.json", contenu_fichier, "UTF-8");

		// ON ENVOIE LA PAGE ATTENTE_REPONSE_INVITATION

		page = fs.readFileSync('mod_attente_reponse_invitation.html', 'utf-8');

		marqueurs = {};
		marqueurs.pseudo = query.pseudo;
		marqueurs.adversaire = query.adversaire;
	} else {
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
	
	}

	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

//---------------------------------------------------------------------------

module.exports = trait;
