const fetch = require('node-fetch');
const db = require('./db/config');
const ClimbingRoute = require('./models/Climbing_Route');
const url = 'https://www.mountainproject.com/data/get-routes-for-lat-lon';
//this lat long is for Joshua tree, where there are a lot of boulders
let lat='33.8734';
let lon = '-115.9010';
let key = '200863670-b5451fd9c439cb8d5329b0ff3217db1a';
let maxResults = '2';
// let maxDistance = '200';
// &maxDistance=${maxDistance}
const routes = ()=>{
    const result = fetch(`${url}?lat=${lat}&lon=${lon}&maxResults=${maxResults}&key=${key}`);
    // const result = fetch('https://www.mountainproject.com/data/get-routes-for-lat-lon?lat=42.3601&lon=71.0589&maxDistance=200&minDiff=v0&maxDiff=v5&key=200863670-b5451fd9c439cb8d5329b0ff3217db1a&=')
    result.then((res)=>{
        return res.json();
    })
    .then((res)=>{
        //now this just needs to be 
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