const ClimbingRoute = require('../models/Climbing_Route');
const url = require('url');
const querystring = require('querystring');

const climbingRouteController ={
    index(req, res, next) {
        console.log(req.body.type);
        ClimbingRoute.getAll()
        .then((climbs) => {
            console.log(climbs);
            res.render('climbingRoutes/index', {
                user: req.user,
                data: { climbs },
                results: req.body
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
    },
    update(req, res, next) {
        ClimbingRoute.getById(req.params.id)
        .then((climb) => {
            console.log('got by id promise');
            console.log(req.body);
            return climb.update(req.body);
        })
        .then((updatedClimb) => {
            console.log('made it to update section');
            res.redirect(`/routes/${updatedClimb.id}`)
        })
        .catch(next);
    },
    destroy(req, res, next) {
        ClimbingRoute.getById(req.params.id)
        .then((climb) =>{
            return climb.delete();
        })
        .then(() => {
            res.redirect(`/routes`);
        });
    }
}


module.exports = climbingRouteController;