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
    },
    create(req, res, next) {
        new ClimbingRoute({
            name: req.body.name,
            type: req.body.type,
            rating: req.body.rating,
            image: req.body.image,
            longitude: req.body.latitude,
            latitude: req.body.latitude
        })
        .save()
        .then((climb) =>{
            res.redirect('/routes');
        })
        .catch(next);
    }
}


module.exports = climbingRouteController;