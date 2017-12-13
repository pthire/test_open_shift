"use strict";
var connect = require('connect')
var http = require('http');

var sites = [
			   /**************
			   {
				  "domaine" : "cross",
				  "description" : "Petit jeu de pion",
				  "expose" : true
			   },
			   {
				  "domaine" : "jeu_nb",
				  "description" : "Jeu qui consiste à deviner un nombre",
				  "expose" : true
			   },
			   {
				  "domaine" : "distributeur",
				  "description" : "Simulation d'un distributeur",
				  "expose" : true
			   },
			   {
				  "domaine" : "digicode",
				  "description" : "Simulation d'un digicode",
				  "expose" : true
			   },
			   {
				  "domaine" : "web_defi",
				  "description" : "Demo du processus de défi (mise en relation de 2 joueurs)",
				  "expose" : true
			   },
			   {
				  "domaine" : "web_gm",
				  "description" : "Générateur d'images",
				  "expose" : true
			   },
			   {
				  "domaine" : "web_rw",
				  "description" : "Générateur de mots aléatoires",
				  "expose" : true
			   },
			   {
				  "domaine" : "web_memo",
				  "description" : "Jeu de mémoire",
				  "expose" : true
			   },
			   ***************/
			   {
				  "domaine" : "web_cadenas",
				  "description" : "Simulation d'un cadenas",
				  "expose" : true
			   }
			];

var app = connect();

sites.forEach(function(site) {
	app.use('/' + site.domaine + '/', function(a,b,next) {console.log("==> " + process.cwd()); process.chdir(process.env.PWD + "/" + site.domaine); next()});
	app.use('/' + site.domaine + '/', require('./' + site.domaine + '/index').app);
});

app.use(function(req, res){

		res.write('<!DOCTYPE html>');
		res.write('<html>');

		res.write('<head>');
		res.write('<meta charset="UTF-8" />');
		res.write('</head>');

		sites.forEach(function(site) {
			if(site.expose === true) {
			res.write('<a href="/' + site.domaine + '/"><button>' + site.description + '</button></a>');
			res.write('<p/>');
			}
		});

		res.write('</html>');

		res.end();
});

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
http.createServer(app).listen({"host": ip, "port" : port});
