CREATE TABLE IF NOT EXISTS user_routes
(id SERIAL PRIMARY KEY, user_id INTEGER REFERENCES users(id), route_id INTEGER REFERENCES climbing_routes(id), status VARCHAR(255), notes VARCHAR(500))
;