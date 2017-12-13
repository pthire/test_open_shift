//=========================================================================
// Traitement de "req_commencer"
// Auteur : P. Thiré
// Version : 09/10/2015
//=========================================================================

"use strict";

var fs = require("fs");
require("remedial");

var trait = function (req, res, query) {

	var lang;
	var nbc;
	var dic;
	var odic;
	var word;
	var alea;
	var i;
	
	lang = query.lang || "fr";
	nbc = query.nbc || 4 + Math.floor(Math.random()* 4);
	if(!nbc) {
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.write("Error : nbc missing (number of characters)");
		res.end();
	} else {
		if(lang === "fr") {
			dic = fs.readFileSync("french_dictionnary.json", "utf-8");
		} else if(lang === "en") {
			dic = fs.readFileSync("english_dictionnary.json", "utf-8");
		} else {
			res.writeHead(200, {'Content-Type': 'text/plain'});
			res.write("Error : lang unknown");
			res.end();
		}

		if(dic) {
			dic = JSON.parse(dic);

			if(!dic[nbc]) {
				res.writeHead(200, {'Content-Type': 'text/plain'});
				res.write("Error : no word with nbc character(s)");
				res.end();
			} else {
				alea = Math.floor(Math.random()*dic[nbc].length);
				word = dic[nbc][alea];
				res.writeHead(200, {'Content-Type': 'text/plain'});
				res.write(word);
				res.end();
			}
		}
	}

};
//--------------------------------------------------------------------------

module.exports = trait;
