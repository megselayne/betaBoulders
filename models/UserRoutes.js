const db = require('../db/config');
const ClimbingRoute = require('../models/Climbing_Route');

class UserRoutes {
    constructor(params) {
        this.id = params.id || null;
        this.user_id = params.user_id;
        this.route_id = params.route_id;
        this.name = params.name;
        this.type = params.type;
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
    static getByRouteId(id){
            return db.oneOrNone(`
            SELECT
                user_routes.id,
                user_routes.user_id,
                user_routes.route_id,
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
            WHERE user_routes.id = $1`,id)
        .then((userRoute) => {
            if(userRoute) return new this(userRoute);
            throw new Error('User route not found');
        });
    }
    static getAllByUserId(id) {
        return db.manyOrNone(
        `SELECT
            user_routes.id,
            user_routes.user_id,
            user_routes.route_id,
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

    update(changes) {
        Object.assign(this, changes);
        return db.oneOrNone(`
        UPDATE user_routes
            status = $/status/,
            notes = $/notes/
        WHERE id = $/id/
        RETURNING *
        `, this
        )
        .then((userRoute) => {
            return Object.assign(this, userRoute);
        });
    }

    delete() {
        return db.oneOrNone(`DELETE FROM user_routes WHERE id = $1`, this.id);
    }
}



module.exports = UserRoutes;