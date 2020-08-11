const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

//routers here
const climbingRouter = require('./routes/climbing-router');

//app initialize
const app = express();
//.env
require('dotenv').config();

//middleware
app.use(methodOverride('_method'));
app.use(logger('dev'));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ eztended: false}));
app.use(cookieParser());
app.use(
    session({
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: true,
    })
);
app.use(passport.initialize());
app.use(passport.session());

//views
app.set('views','views');
app.set('view engine', 'ejs');
app.use(express.static('public'));

//port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});

app.get('/' ,(req, res) => {
    res.render('index',{
        appName: 'BetaBoulders',
    });
});

//app.use rotuers
app.use('/routes', climbingRouter);

app.use('*', (req,res) =>{
    res.status(404).send('Not Found');
});

//J's cool error handler :)
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack,
    });
});