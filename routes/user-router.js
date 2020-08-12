const express = require('express');
const userRouter = express.Router();

const usersController = require('../controllers/users-controller');
const authHelpers = require('../services/auth/auth-helpers');

userRouter.get('/new', authHelpers.loginRedirect, (req, res) => {
    res.render('auth/register');
});
userRouter.get('/', authHelpers.loginRequired, usersController.index);
userRouter.post('/', usersController.create);


module.exports = userRouter;