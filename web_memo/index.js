//=========================================================================
// Site WEB qui permet de tester sa mémoire visuelle
// Auteur : P. Thiré
// Version : 28/11/2015
//=========================================================================

"use strict";

var http = require("http");
var url = require("url");
var querystring = require("querystring");

//-------------------------------------------------------------------------
// DECLARATION DES DIFFERENTS MODULES CORRESPONDANT A CHAQUE ACTION
//-------------------------------------------------------------------------

var req_accueillir = require("./req_accueillir.js");
var req_commencer = require("./req_commencer.js");
var req_questionner = require("./req_questionner.js");
var req_verifier = require("./req_verifier.js");
var req_rejouer = require("./req_rejouer.js");
var req_abandonner = require("./req_abandonner.js");

var req_static = require("./req_static");
var req_erreur = require("./req_erreur");

//-------------------------------------------------------------------------
// FONCTION DE CALLBACK APPELLEE POUR CHAQUE REQUETE
//-------------------------------------------------------------------------

var traite_requete = function (req, res) {
	var url_req = url.parse(req.url).query;
	var query = querystring.parse(url_req);
	var pathname = url.parse(req.url).pathname;
	console.log(pathname);

	// CONTROLEUR

	try {
		switch (pathname) {
			case '/':
			case '/req_accueillir':
				req_accueillir(req, res, query);
				break;
			case '/req_commencer':
				req_commencer(req, res, query);
				break;
			case '/req_questionner':
				req_questionner(req, res, query);
				break;
			case '/req_verifier':
				req_verifier(req, res, query);
				break;
			case '/req_rejouer':
				req_rejouer(req, res, query);
				break;
			case '/req_abandonner':
				req_abandonner(req, res, query);
				break;
			default:
				req_static(req, res, pathname);
				break;
		}
	} catch (e) {
		console.log('Erreur : ' + e.stack);
		console.log('Erreur : ' + e.message);
		//console.trace();
		req_erreur(req, res, query);
	}
};

//-------------------------------------------------------------------------
// CREATION ET LANCEMENT DU SERVEUR
//-------------------------------------------------------------------------

var mon_serveur = http.createServer(traite_requete);

exports.app = mon_serveur;
/*
var port = process.env.PORT || 5000;
console.log("Serveur en ecoute sur port " + port);
mon_serveur.listen(port);
*/
