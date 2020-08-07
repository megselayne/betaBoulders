const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

//routers here


//app
const app = express();

//use
app.use(methodOverride('_method'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ eztended: false}));

//views
app.set('views','views');
app.set('view engine', 'ejs');

//port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});

app.get('/' ,(req, res) => {
    res.json({
        appName: 'BetaBoulders'
    });
});

//app.use rotues


app.use('*', (req,res) =>{
    res.status(404).send({
        error: 'Not Found',
    });
});


app.use((err, req, res, next) => {
    res.status(500).send({ err, message: err.message});
});