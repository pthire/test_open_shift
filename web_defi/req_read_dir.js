//=========================================================================
// Traitement de "req_read_dir"
// Auteur : P. Thiré
// Version : 09/10/2015
//=========================================================================
"use strict";

var fs = require("fs");
var path = require("path");
require("remedial");

var trait = function(req, res, query) {

	var page;
    var html;
	var liste_fics;
	var marqueurs;

	liste_fics = fs.readdirSync("./parties", "utf-8");

	html = "";
	liste_fics.forEach(function(fic) {
		html += "<a href='req_aff_fic?fic=./parties/" + fic + "'>" + fic + "</a>";
		html += "<br>";
	});

	page = fs.readFileSync('mod_dir.html', 'utf-8');
	marqueurs = {};
	marqueurs.listeFic = html;
	page = page.supplant(marqueurs);

    try {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(page);
        res.end();
    } catch (e) {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('ERREUR 404 : ressource inconnue');
        res.end();
    }
};

module.exports = trait;
