const ClimbingRoute = require('../models/Climbing_Route');

const climbingRouteController ={
    index(req, res, next) {
        ClimbingRoute.getAll()
        .then((climbs) => {
            console.log(climbs);
            res.render('climbingRoutes/index', {
                message: 'ok',
                data: { climbs },
            });
        })
        .catch(next);
    },
    show(req, res, next) {
        ClimbingRoute.getById(req.params.id)
        .then((climb) => {
            res.locals.climb = climb;
            console.log(res.locals.climb);
            next();
        })
        .catch(next);
    }
}


module.exports = climbingRouteController;