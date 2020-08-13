const db = require('../db/config');
const ClimbingRoute = require('../models/Climbing_Route');

class UserRoutes {
    constructor(params) {
        this.id = params.id || null;
        this.user_id = params.user_id;
        this.route_id = params.route_id;
        this.name = params.name;
        this.rating = params.rating;
        this.image = params.image || null;
        this.longitude = params.longitude || null;
        this.latitude = params.latitude || null;
        this.status = params.status || 'not sent';
        this.notes = params.notes || null;

    }
    static getAll(id){
        return db.manyOrNone(`SELECT * FROM user_routes WHERE user_id = $1`, id)
    }
    static getAllByUserId(id) {
        return db.manyOrNone(
        `SELECT
            climbing_routes.id,
            climbing_routes.name,
            climbing_routes.type,
            climbing_routes.rating,
            climbing_routes.image,
            climbing_routes.longitude,
            climbing_routes.latitude,
            user_routes.status,
            user_routes.notes
        FROM user_routes
        LEFT JOIN climbing_routes
        ON climbing_routes.id = user_routes.route_id
        WHERE user_routes.user_id = $1`,id
        )
        .then((userRoutes) => {
            return userRoutes.map((userRoute) => {
                return new UserRoutes(userRoute);
            })
        })
    }

    save() {
        return db.one(
            `
            INSERT INTO user_routes
            (user_id, route_id, status, notes)
            VALUES
            ($/user_id/,$/route_id/, $/status/, $/notes/)
            returning *
            `, this
        )
        .then((userRoute) => {
            return Object.assign(this, userRoute);
        })
    }
}




module.exports = UserRoutes;