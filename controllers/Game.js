'use strict';

var url = require('url');

var Game = require('./GameService');

module.exports.getWinner = function getWinner (req, res, next) {
  Game.getWinner(req.swagger.params, res, next);
};
