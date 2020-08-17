const UserRoutes = require('../models/UserRoutes');

const userRoutesController = {
    show(req, res, next) {
        UserRoutes.getByRouteId(req.params.id)
        .then((userRoute) => {
            res.locals.userRoute = userRoute;
            console.log(res.locals.userRoute);
            next();
        })
        .catch(next);
    },
    create(req, res, next) {
        console.log(req.user.id)
        new UserRoutes({
            user_id: req.user.id,
            route_id: req.params.id
        })
        .save()
        .then(() => {
            res.redirect('/user');
        })
        .catch(next);
    },
    update(req, res, next) {
        UserRoutes.getByRouteId(req.params.id)
        .then((userRoute) => {
            console.log('got to update--------------------');
            console.log(userRoute);
            console.log(req.body);
            return userRoute.update(req.body);
        })
        .then((updatedRoute) => {
            res.redirect(`/userRoute/${updatedRoute.id}`)
        })
        .catch(next);
    },
    destroy(req, res, next) {
        UserRoutes.getByRouteId(req.params.id)
        .then((userRoute) => {
            return userRoute.delete();
        })
        .then(() => {
            res.redirect('/user')
        })
    }
}

module.exports = userRoutesController;