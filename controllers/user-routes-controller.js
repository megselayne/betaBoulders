const UserRoutes = require('../models/UserRoutes');

const userRoutesController = {
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
    }
}

module.exports = userRoutesController;