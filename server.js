const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const multer = require('multer');
const config = require('cloudinary');
const uploader = require('cloudinary');
const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single('image');

//routers here
const climbingRouter = require('./routes/climbing-router');
const authRouter = require('./routes/auth-router');
const userRouter = require('./routes/user-router');
const userRouteRouter = require('./routes/userRoute-router');

//app initialize
const app = express();
//.env
require('dotenv').config();

//middleware
app.use(methodOverride('_method'));
app.use(logger('dev'));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
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

//home page
app.get('/' ,(req, res) => {
    res.render('index',{
        appName: 'BetaBoulders',
        user: req.user
    });
});

//testing cloudinary post
app.post('/upload', multerUploads, (req, res) => {
    console.log(req.file);
    });

//app.use rotuers
app.use('/routes', climbingRouter);
app.use('/auth', authRouter);
app.use('/userRoute', userRouteRouter);
app.use('/user', userRouter);


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

