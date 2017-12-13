//=========================================================================
// Site WEB qui permet de jouer à deviner un nombre
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

var clic_debuter = require("./clic_debuter");
var clic_commencer = require("./clic_commencer");
var clic_analyser = require("./clic_analyser");
var clic_abandonner = require("./clic_abandonner");
var clic_quitter = require("./clic_quitter");
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
				clic_debuter(request, response, param);
				break;
			case '/clic_commencer' :
				clic_commencer(request, response, param);
				break;
			case '/clic_analyser' :
				clic_analyser(request, response, param);
				break;
			case '/clic_abandonner' :
				clic_abandonner(request, response, param);
				break;
			case '/clic_quitter' :
				clic_quitter(request, response, param);
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

exports.app = mon_serveur;
