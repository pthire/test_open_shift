//=========================================================================
// Traitement de "clic_inverser"
// Auteur : P. Thiré
// Version : 06/05/2013
//=========================================================================
"use strict";

var plateau = require("./plateau.js");
var fs = require("fs");
require('remedial');

var trait = function (request, response, param) {

	var patch = {};
	var position = [];;
	var ligne;
	var colonne;
	var page;

	// RECUPERATION DE LA POSITION DU BOUTON CLIQUE

	position = param["position"].split(":");
	ligne = position[0];
	colonne = position[1];

	// RECUPERATION DU JEU EN COURS

	plateau.lire("plateau");
	
	// REPERCUTE L'ACTION DU JOUEUR SUR L'OBJET PLATEAU

	plateau.inverser(ligne, colonne);

	// RE-ENREGISTRE LE JEU EN COURS

	plateau.ecrire("plateau");

    // FABRIQUE PAGE PLATEAU

    page = fs.readFileSync(__dirname + '/page_cross_game.html', 'utf-8');

    for(ligne=0; ligne < 3; ligne++) {
        for(colonne=0; colonne < 3; colonne++) {
            if(plateau.pions[ligne][colonne] == "r") {
                patch["pion_" + (ligne+1) + ":" + (colonne+1)] = "pr.png";
            } else {
                patch["pion_" + (ligne+1) + ":" + (colonne+1)] = "pb.png";
            }
        }
    }

    page = page.supplant(patch);	

	// ENVOIE LA PAGE AU NAVIGATEUR

	response.writeHead(200, {'Content-Type': 'text/html'});
	response.write(page);
	response.end();
};

//--------------------------------------------------------------------------

module.exports = trait;
