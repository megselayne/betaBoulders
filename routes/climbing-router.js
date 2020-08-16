const express = require('express');
const climbingRouter = express.Router();
const climbingRouteController = require('../controllers/climbing_routes_controller');
const authHelpers = require('../services/auth/auth-helpers');

climbingRouter.get('/', climbingRouteController.index);
climbingRouter.get('/:id([0-9]+)', climbingRouteController.show, (req, res) => {
    res.render('climbingRoutes/show', {
        user: req.user,
        climb: res.locals.climb,
    });
});
climbingRouter.get('/add', authHelpers.loginRequired, (req, res) =>{
    res.render('climbingRoutes/add', {
        user: req.user
    });
})
climbingRouter.get('/:id([0-9]+)/edit',
    authHelpers.loginRequired,
    climbingRouteController.show, (req, res) => {
        res.render('climbingRoutes/edit', {
            user: req.user,
            climb: res.locals.climb,
        });
});
//new climbing route
climbingRouter.post('/new',climbingRouteController.create);
//passing user selected filters from form back to index
climbingRouter.post('/?', climbingRouteController.index);

climbingRouter.put('/:id([0-9]+)', climbingRouteController.update);
climbingRouter.delete('/:id([0-9]+)', 
    authHelpers.loginRequired, 
    climbingRouteController.destroy);



module.exports = climbingRouter;