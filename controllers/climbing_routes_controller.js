const ClimbingRoute = require('../models/Climbing_Route');

const climbingRouteController ={
    index(req, res, next) {
        ClimbingRoute.getAll()
        .then((climbs) => {
            res.render('climbingRoutes/index', {
                message: 'ok',
                data: { climbs },
            });
        })
        .catch(next);
    }
}


module.exports = climbingRouteController;