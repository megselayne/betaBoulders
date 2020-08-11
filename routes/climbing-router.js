const express = require('express');
const climbingRouter = express.Router();
const climbingRouteController = require('../controllers/climbing_routes_controller');


climbingRouter.get('/', climbingRouteController.index);
climbingRouter.get('/:id([0-9]+)', climbingRouteController.show, (req, res) =>{
    res.render('climbingRoutes/show', {
        climb: res.locals.climb,
    });
})






module.exports = climbingRouter;