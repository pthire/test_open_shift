//=========================================================================
// Traitement de "req_accepter_invitation"
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

	// ON CREE LE FICHIER PARTIE DANS LE REPERTOIRE parties
	// AVEC LE NOM DU PSEUDO QUI ACCEPTE L'INVITATION
	// LE PREMIER JOUEUR A JOUER EST CELUI QUI ACCEPTE L'INVITATION

	fichier_partie = "./parties/" + query.pseudo + ".json";

	partie = {};
	partie.tour = query.pseudo;

	contenu_fichier = JSON.stringify(partie);
	fs.writeFileSync(fichier_partie, contenu_fichier, "UTF-8");

	// ON MET LE PSEUDO ET SON ADVERSAIRE DANS L'ETAT "EN_JEU"
	// ET ON INDIQUE QUEL EST LE FICHIER PARTIE

	connectes[iPseudo].etat = "EN_JEU";
	connectes[iPseudo].partie = fichier_partie;

	connectes[iAdversaire].etat = "EN_JEU";
	connectes[iAdversaire].partie = fichier_partie;

	contenu_fichier = JSON.stringify(connectes);
	fs.writeFileSync("connectes.json", contenu_fichier, "UTF-8");

	// ON ENVOIE LA PAGE JEU ACTIF (CELUI QUI ACCEPTE L'INVITATION COMMENCE)

	page = fs.readFileSync('mod_jeu_actif.html', 'utf-8');

	marqueurs = {};
	marqueurs.pseudo = query.pseudo;
	marqueurs.adversaire = adversaire;

	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

//---------------------------------------------------------------------------

module.exports = trait;
