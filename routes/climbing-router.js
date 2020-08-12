const express = require('express');
const climbingRouter = express.Router();
const climbingRouteController = require('../controllers/climbing_routes_controller');


climbingRouter.get('/', climbingRouteController.index);
climbingRouter.get('/:id([0-9]+)', climbingRouteController.show, (req, res) => {
    res.render('climbingRoutes/show', {
        climb: res.locals.climb,
    });
});
climbingRouter.get('/add', (req, res) =>{
    res.render('climbingRoutes/add');
})
climbingRouter.get('/:id([0-9]+)/edit', climbingRouteController.show, (req, res) => {
    res.render('climbingRoutes/edit', {
        climb: res.locals.climb,
    });
});
climbingRouter.post('/',climbingRouteController.create);
climbingRouter.put('/:id([0-9]+)', climbingRouteController.update);
climbingRouter.delete('/:id([0-9]+)', climbingRouteController.destroy);






module.exports = climbingRouter;