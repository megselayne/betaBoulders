const db = require('../db/config');

class ClimbingRoute {
    constructor(climb) {
        this.id = climb.id || null;
        this.name = climb.name;
        this.type = climb.type;
        this.rating = climb.rating;
        this.image = climb.image;
        this.longitude = climb.longitude || null;
        this.latitude = climb.latitude || null;
    }
    static getById(id) {
        return db.oneOrNone(` SELECT * FROM climbing_routes WHERE id = $1`, id)
        .then((climb) => {
            if(climb) return new this (climb);
            throw new Error('Climb not found');
        });
    }
    save() {
        return db.one(
            `
            INSERT INTO climbing_routes
            (name, type, rating, image, longitude, latitude)
            VALUES
            ($/name/, $/type/, $/rating/, $/image/, $/longitude/, $/latitude/)
            RETURNING *
            `, this
        )
        .then((climb) => {
            return Object.assign(this, climb);
        })
    }
}


module.exports = ClimbingRoute;