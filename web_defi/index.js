//=========================================================================
// Site WEB demo processus mise en relation de 2 joueurs
// Auteur : P. Thiré
// Version : 09/10/2015
//=========================================================================

"use strict";

var http = require("http");
var url = require("url");
var querystring = require("querystring");

//-------------------------------------------------------------------------
// DECLARATION DES DIFFERENTS MODULES CORRESPONDANT A CHAQUE REQUETE
//-------------------------------------------------------------------------

var req_commencer = require("./req_commencer.js");
var req_identifier = require("./req_identifier.js");
var req_attendre_invitation = require("./req_attendre_invitation.js");
var req_inviter_adversaire = require("./req_inviter_adversaire.js");
var req_attendre_reponse_invitation = require("./req_attendre_reponse_invitation.js");
var req_refuser_invitation = require("./req_refuser_invitation.js");
var req_accepter_invitation = require("./req_accepter_invitation.js");
var req_attendre_tour = require("./req_attendre_tour.js");
var req_jouer = require("./req_jouer.js");
var req_deconnecter = require("./req_deconnecter.js");
var req_read_dir = require("./req_read_dir.js");
var req_aff_fic = require("./req_aff_fic.js");

var req_static = require("./req_static.js");
var erreur = require("./erreur.js");

//-------------------------------------------------------------------------
// FONCTION DE CALLBACK APPELLEE POUR CHAQUE REQUETE
//-------------------------------------------------------------------------

var traite_requete = function (req, res) {

    var ressource;
    var requete;
    var pathname;
    var query;

    console.log("URL reçue : " + req.url);
    requete = url.parse(req.url, true);
    pathname = requete.pathname;
    query = requete.query;

    // ROUTEUR

    try {
        switch (pathname) {
            case '/':
            case '/req_commencer':
                req_commencer(req, res, query);
                break;
            case '/req_identifier':
                req_identifier(req, res, query);
                break;
            case '/req_attendre_invitation':
                req_attendre_invitation(req, res, query);
                break;
            case '/req_inviter_adversaire':
                req_inviter_adversaire(req, res, query);
                break;
            case '/req_attendre_reponse_invitation':
                req_attendre_reponse_invitation(req, res, query);
                break;
            case '/req_refuser_invitation':
                req_refuser_invitation(req, res, query);
                break;
            case '/req_accepter_invitation':
                req_accepter_invitation(req, res, query);
                break;
            case '/req_attendre_tour':
                req_attendre_tour(req, res, query);
                break;
            case '/req_jouer':
                req_jouer(req, res, query);
                break;
            case '/req_deconnecter':
                req_deconnecter(req, res, query);
                break;
            case '/req_read_dir':
                req_read_dir(req, res, query);
                break;
            case '/req_aff_fic':
                req_aff_fic(req, res, query);
                break;
            default:
                req_static(req, res, pathname);
                break;
        }
    } catch (e) {
        console.log('Erreur : ' + e.stack);
        console.log('Erreur : ' + e.message);
        //console.trace();
        erreur(req, res, query);
    }
};

//-------------------------------------------------------------------------
// CREATION ET LANCEMENT DU SERVEUR
//-------------------------------------------------------------------------

var mon_serveur = http.createServer(traite_requete);
exports.app = mon_serveur;
