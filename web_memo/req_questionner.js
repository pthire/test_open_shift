//=========================================================================
// Traitement de "req_questionner"
// Auteur : P. Thiré
// Version : 29/11/2015
//=========================================================================

"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var page;
	var marqueurs;
	var contenu;
	var questions;

	// ON LIT LE FICHIER QUESTIONNAIRE

	contenu = fs.readFileSync("questions.json", "UTF-8");
	questions = JSON.parse(contenu);

	// AFFICHE page_jeu

	page = fs.readFileSync('modele_question.html', 'utf-8');
	marqueurs = {
	 	nq : query.nq,
		texte_question : questions[query.nq].question,
		rep0 : questions[query.nq].reponses[0],
		rep1 : questions[query.nq].reponses[1],
		rep2 : questions[query.nq].reponses[2],
	};
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

//---------------------------------------------------------------------------

module.exports = trait;
