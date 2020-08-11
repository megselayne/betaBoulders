const express = require('express');
const climbingRouter = express.Router();
const climbingRouteController = require('../controllers/climbing_routes_controller');


climbingRouter.get('/', climbingRouteController.index);







module.exports = climbingRouter;