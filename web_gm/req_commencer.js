//=========================================================================
// Traitement de "req_commencer"
// Auteur : P. Thiré
// Version : 09/10/2015
//=========================================================================

"use strict";

var fs = require("fs");
var gm = require('gm').subClass({ imageMagick: true });
require("remedial");

function write (base, res) {
  base.stream('png', function (err, stdout, stderr) {
	if (!err) {
		res.setHeader('Expires', new Date(Date.now() + 604800000));
		res.setHeader('Content-Type', 'image/png');
		stdout.pipe(res);
	} else {
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.write("Error stream");
		res.end();
	}

  });
}

var trait = function (req, res, query) {

	var image;
	var shape;
	var radius;
	var size;
	var sizeX;
	var sizeY;
	var color;
	var shape;
	
	shape = query.shape;
	color = query.color || "grey";
	radius = query.radius || 100;
	size = query.size || 100;
	sizeX = query.sizeX || 100;
	sizeY = query.sizeY || 100;

	if(shape === "circle") {
		image = gm(200, 200, "white")
		.fill(color)
		.drawCircle(100, 100, 100, 200)
		.fill("#000")
		.drawText(0, 0, shape + " " + color, "Center")
		.resize(radius)
		.transparent("white")
		write(image, res);
	} else if(shape === "rectangle") {
		image = gm(200, 200, "white")
		.fill(color)
		.drawRectangle(0, 0, 200, 200)
		.fill("#000")
		.drawText(0, 0, shape + " " + color, "Center")
		.resize(sizeX, sizeY, "!")
		.transparent("white")
		write(image, res);
	} else if(shape === "triangle") {
		image = gm(200, 200, "white")
		.fill(color)
		.drawPolygon([0, 200], [100, 100-86.6], [200, 200])
		.fill("#000")
		.drawText(0, 50, shape + " " + color, "Center")
		.resize(size)
		.transparent("white")
		.trim()
		write(image, res);
	} else {
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.write("Error : shape unknown");
		res.end();
	}

};
//--------------------------------------------------------------------------

module.exports = trait;
