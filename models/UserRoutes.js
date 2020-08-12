const db = require('../db/config');
const ClimbingRoute = require('../models/Climbing_Route');

class UserRoutes {
    constructor(params) {
        this.id = params.id || null;
        this.user_id = params.user_id;
        this.route_id = params.route_id;

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
            climbing_routes.latitude
        FROM user_routes
        LEFT JOIN climbing_routes
        ON climbing_routes.id = user_routes.route_id
        WHERE user_routes.user_id = $1`,id
        )
        .then((userRoutes) => {
            return userRoutes.map((userRoute) => {
                return new ClimbingRoute(userRoute);
            })
        })
    }

    save() {
        return db.one(
            `
            INSERT INTO user_routes
            (user_id, route_id)
            VALUES
            ($/user_id/,$/route_id/)
            returning *
            `, this
        )
        .then((userRoute) => {
            return Object.assign(this, userRoute);
        })
    }
}




module.exports = UserRoutes;