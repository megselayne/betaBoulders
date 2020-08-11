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
    static getAll() {
        return db.manyOrNone(`SELECT * FROM climbing_routes ORDER BY id ASC`)
        .then((climbs) => {
            return climbs.map((climb) => {
                return new this(climb);
            })
        })
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
    saveMany(){
        return db.manyOrNone(
            `
            INSERT INTO climbing_routes
            (name, type, rating, image, longitude, latitude)
            VALUES
            ($/name/, $/type/, $/rating/, $/image/, $/longitude/, $/latitude/)
            RETURNING *
            `, this
        )
        .then((climbs) =>{
            climbs.map((climb) => {
                return Object.assign(this, climb);
            })
        })
    }
    update(changes) {
        Object.assign(this, changes);
        return db.oneOrNone(
            `
            UPDATE climbing_routes
                name = $/name/,
                type = $/type/,
                rating = $/rating/,
                image = $/image/,
                longitude = $/longitude/,
                latitude = $/latitude/
            WHERE id = $/id/
            RETURNING *
            `, this
        )
        .then((climb) => {
            return Object.assign(this, climb);
        });
    }

    delete() {
        return db.oneOrNone(`DELETE FROM climbing_routes WHERE id = $1`, this.id);
    }
}


module.exports = ClimbingRoute;