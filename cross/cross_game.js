//=========================================================================
// Site WEB : cross game
// Auteur : P. Thiré
// Version : 06/05/2013
//=========================================================================

"use strict";

var util = require("util");
var http = require("http");
var url = require("url");
var querystring = require("querystring");

//-------------------------------------------------------------------------
// DECLARATION DES DIFFERENTS MODULES CORRESPONDANT A CHAQUE ACTION
//-------------------------------------------------------------------------

/*
console.log('Starting directory: ' + process.cwd());
try {
  process.chdir('./web_cross');
  console.log('New directory: ' + process.cwd());
}
catch (err) {
  console.log('chdir: ' + err);
}
*/

var clic_commencer = require("./clic_commencer");
var clic_inverser = require("./clic_inverser");
var get_fichier = require("./get_fichier");
var page_erreur = require("./page_erreur");

//-------------------------------------------------------------------------
// FONCTION DE CALLBACK APPELLEE POUR CHAQUE REQUETE
//-------------------------------------------------------------------------

var traite_requete = function (request, response) {
	var url_request = url.parse(request.url).query;
	var param = querystring.parse(url_request);
	var pathname = url.parse(request.url).pathname;
	util.puts(pathname);

	// CONTROLEUR

	try {
		switch (pathname) {
			case '/':
				clic_commencer(request, response, param);
				break;
			case '/clic_inverser':
				clic_inverser(request, response, param);
				break;
			default:
				get_fichier(request, response, param);
				break;
		}
	} catch (e) {
		console.log('Erreur : ' + e.stack);
		console.log('Erreur : ' + e.message);
		//console.trace();
		page_erreur(request, response, param);
	}
};

//-------------------------------------------------------------------------
// CREATION ET LANCEMENT DU SERVEUR
//-------------------------------------------------------------------------

var mon_serveur = http.createServer(traite_requete);
var port = 4000;
util.puts("Serveur en ecoute sur port " + port);
mon_serveur.listen(port);
