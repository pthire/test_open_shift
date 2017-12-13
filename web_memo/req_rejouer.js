//=========================================================================
// Traitement de "req_rejouer"
// Auteur : P. Thiré
// Version : 29/11/2015
//=========================================================================

"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var page;
	var hasard;
	var marqueurs;
	var contenu;
	var questions;

	// ON LIT LE FICHIER QUESTIONNAIRE

	contenu = fs.readFileSync("questions.json", "UTF-8");
	questions = JSON.parse(contenu);

	// ON CHOISIT UN NB ALEATOIRE POUR TIRER UNE QUESTION AU HASARD

	hasard = Math.floor(Math.random() * questions.length);

	// AFFICHE page_jeu

	page = fs.readFileSync('modele_image.html', 'utf-8');
	marqueurs = {
	 	image_question : questions[hasard].image,
		nq : hasard
	};
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

//---------------------------------------------------------------------------

module.exports = trait;
