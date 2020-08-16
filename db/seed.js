//requires
require('dotenv').config();
const fetch = require('node-fetch');
const db = require('./db/config');

const ClimbingRoute = require('./models/Climbing_Route');

const url = 'https://www.mountainproject.com/data/get-routes-for-lat-lon';
//this lat long is for Joshua tree, where there are a lot of boulders
let lat='33.8734';
let lon = '-115.9010';
let key = process.env.MOUNTAIN_PROJECT_API_KEY;
let maxResults = '50';
// let maxDistance = '200';
// &maxDistance=${maxDistance}
const routes = ()=>{
    const result = fetch(`${url}?lat=${lat}&lon=${lon}&maxResults=${maxResults}&key=${key}`);
    result.then((res)=>{
        return res.json();
    })
    .then((res)=>{
        //mapping each route from API to climbing_routes schema
        res.routes.map((el)=>{
            new ClimbingRoute({
                name: el.name,
                type: el.type,
                rating: el.rating,
                image: el.imgSqSmall,
                longitude: el.longitude,
                latitude: el.latitude
            })
       
        .save()
        .then(() =>{
            console.log('saved');
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ err, message: err.message });
        });
    })
    })
}

console.log(routes());
