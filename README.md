# betaBoulders
Find, save, edit, delete climbing routes

## User Stories
- User can browse (scroll) through existing climbing routes without logging in
- User can click on a route to view more information about it without logging in
- User can create an account
- User can log in to account
- User can save any existing routes to their profile
- User can view their routes on their profile
- User can remove routes from their profile
- User can log out

## Phases of Completion
1. No-auth features first
    1. All routes
    2. Seed db with 3rd party API
    3. View route for more details
2. Auth features second
    1. Edit, add, delete routes
    2. Create account
    3. Login, log out
3. User Profile
    1. Add route(s) to profile
    2. view route(s) on profile
    3. Remove routes from profile
- The logic is that if auth goes horribly wrong (I think I'll be fine), I will fulfill reqs with just phase 1 and adding edit, delete, add with no auth required.

## Trello Board
- Access user stories and technical implementation details [here](https://trello.com/invite/b/vKJm1pRX/8fdab09e74006de0cfe26ef66d741338/betaboulders) 

## Front end Wireframes
- Table sketch source [template](https://www.sketchappsources.com/free-source/3142-responsive-table-template-sketch-freebie-resource.html)
- Full-res wireframes [here](./assets/full_res_wireframes)

![home](./assets/home_index.ejs.png)
![routes_home](./assets/routes_index.ejs.png)
![routes_show](./assets/routes_show.ejs.png)
![routes_edit](./assets/routes_edit.ejs.png)

## Table Schemas

![DBSchema](./assets/schema.png)

## CRUD Routes
|User Story|Route|
|-|-|
|See all routes|`GET /routes`|
|See route details|`GET /routes/:id`|
|Edit a route|`PUT /routes/:id`|
|Add a route|`POST /routes`|
|Delete a route|`DELETE /routes/:id`|
|Access create account page|`GET /users/new`|
|Create an account|`POST /users`|
|Access log in page|`GET /auth/login`|
|Log in|`POST /auth/login`|
|Save route to profile|`POST /users/:id/user_routes`|
|Log out|`GET /auth/logout`|

## Notes on Deployment
- Application will be deployed on Heroku
- `db/migrations` files must be run in Heroku bash to set up tables.
- `seed.js` must be run in Heroku bash to seed the `climbing_routes` table from Mountain Project's API.
- The `SECRET_KEY` in `seed.js` is supressed in an `.env`. You will need to request your own credentials from Mountain Project and add the key in your own `.env` file.

## Links and Resources
- Mountain Project API [here](https://www.mountainproject.com/data)