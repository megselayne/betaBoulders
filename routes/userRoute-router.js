const express = require('express');
const userRouteRouter = express.Router();

const userRoutesController = require('../controllers/user-routes-controller');
const authHelpers = require('../services/auth/auth-helpers');

userRouteRouter.post('/:id([0-9]+)',authHelpers.loginRequired, userRoutesController.create);
userRouteRouter.get('/edit/:id([0-9]+)', userRoutesController.show, (req, res) => {
    res.render('users/edit', {
        userRoute: res.locals.userRoute,
    });
});
userRouteRouter.put('/:id([0-9]+)', userRoutesController.update);
userRouteRouter.delete('/:id([0-9]+)', authHelpers.loginRequired, userRoutesController.destroy);

module.exports = userRouteRouter;