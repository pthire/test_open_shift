//=========================================================================
// Site WEB qui simule un distributeur
// Auteur : P. Thiré
// Version : 15/06/2013
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
var clic_choisir = require("./clic_choisir");
var clic_payer = require("./clic_payer");
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
			case '/clic_payer':
				clic_payer(request, response, param);
				break;
			case '/clic_choisir':
				clic_choisir(request, response, param);
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
