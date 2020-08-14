const bcrypt = require('bcryptjs');
const User = require('../models/User');
const UserRoutes = require('../models/UserRoutes');

const usersController = {
    index(req, res, next) {
      UserRoutes.getAllByUserId(req.user.id)
      .then((routes) => {
        console.log(routes);
        res.render('users/index',{
          user: req.user,
          data: {
            user: req.user,
            routes  
          },
        })
        
      })
      .catch(next);
    },
    create(req, res, next) {
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(req.body.password, salt);
        new User({
            username: req.body.username,
            email: req.body.email,
            password_digest: hash,
        })
        .save()
        .then((user) => {
            req.login(user, (err) => {
                if (err) return next(err);
                res.redirect('/user',{
                  user: req.user
                })
            });
        })
        .catch(next);
    },
};


module.exports = usersController;