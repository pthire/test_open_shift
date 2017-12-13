//=========================================================================
// Traitement de "req_aff_fic"
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
	var contenu_fichier;
	var jsonFic;
	var marqueurs;

	contenu_fichier = fs.readFileSync(query.fic, "utf-8");
	jsonFic = JSON.stringify(JSON.parse(contenu_fichier),null, "\t");

	page = fs.readFileSync('mod_fichier.html', 'utf-8');
	marqueurs = {};
	marqueurs.jsonFic = jsonFic;
	marqueurs.nom_fichier = query.fic;
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
