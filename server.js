//============================================================================
// SERVEUR VERSION 3
// Patrice ThirÃ©
// 3/10/2015
//============================================================================

"use strict";

var http = require("http");
var url = require("url");
var mon_serveur;
var port;
var ip;

// FONCTION DE TRAITEMENT D'UNE REQUETE

var traite_requete = function (req, res) {

	var requete;
	var pathname;;
	var query;

	// RECUPERATION DE L'URL (REQUETE)

	console.log("url reÃ§ue : " + req.url);

	// ANALYSE DE L'URL (SEPARATION DU PATH ET DE LA QUERY STRING)

	requete = url.parse(req.url, true);
	pathname = requete.pathname;
	query = requete.query;

	console.log("pathname : " + pathname);
	console.log("query string (compte) : " + query.compte);
	console.log("query string (mdp) : " + query.mdp);

	// ENVOI DE LA REPONSE

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write("<html>Bonjour " + query.compte + "</html>");
	res.end();

};

// CREATION ET LANCEMENT DU SERVEUR

mon_serveur = http.createServer(traite_requete);
port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
console.log("listen port " + ip + ":" + port);
//mon_serveur.listen(port);
mon_serveur.listen({"host": 'localhost', "port" : port});
