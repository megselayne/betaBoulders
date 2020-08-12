const express = require('express');
const userRouteRouter = express.Router();

const userRoutesController = require('../controllers/user-routes-controller');
const authHelpers = require('../services/auth/auth-helpers');

userRouteRouter.post('/:id([0-9]+)',authHelpers.loginRequired, userRoutesController.create);


module.exports = userRouteRouter;