//=========================================================================
// Traitement de "req_verifier"
// Auteur : P. Thiré
// Version : 30/11/2015
//=========================================================================

"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var page;
	var contenu;
	var questions;
	var marqueurs = {};
	var gagne;

	// ON LIT LE FICHIER QUESTIONNAIRE

	contenu = fs.readFileSync("questions.json", "UTF-8");
	questions = JSON.parse(contenu);

	// TEST REPONSE DU JOUEUR

	gagne = false;
	if(Number(query.reponse) === questions[query.nq].br) {
		gagne = true;
	}

	// ON PREPARE PAGE DE RESULAT

	page = fs.readFileSync('modele_resultat.html', 'UTF-8');

	marqueurs.image_question = questions[query.nq].image;
	marqueurs.texte_question = questions[query.nq].question;

	if(gagne === true) {
		marqueurs.verdict = "Bravo ! La réponse était bien : " + questions[query.nq].reponses[questions[query.nq].br];
	} else {
		marqueurs.verdict = "Perdu ! La bonne réponse était : " + questions[query.nq].reponses[questions[query.nq].br];
	}

	page = page.supplant(marqueurs);

	// ENVOI DE LA PAGE

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

//---------------------------------------------------------------------------

module.exports = trait;
