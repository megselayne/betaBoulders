# betaBoulders
Beta Boulders is a rock climbing API and app that allows you to discover outdoor rock climbing projects, save them to your profile and track your progress towards sending them. Full CRUD functionality is supported to add, edit and delete public climbs and climbs saved to your profile. Track it, send it!
[Deployed Project](https://quiet-taiga-45663.herokuapp.com/)

## User Stories
- User can browse (scroll) through existing climbing routes without logging in
- User can click on a route to view more information about it without logging in
- User can add a route that other users can see without logging in
- User can create an account
- User can log in to account
- User can edit routes if logged in
- User can delete routes if logged in
- User can save any existing routes to their profile
- User can view their routes on their profile
- User can see high level stats about their climbs
- User can edit status and notes on their routes
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
4. Extras
    1. Dynamic login/logout nav based on user creds
    2. User filtering of public climbs by type
    ...

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
|See all climbs|`GET /routes`|
|See route details|`GET /routes/:id`|
|Access edit a climb form|`GET /routes/edit/:id`|
|Edit a climb|`PUT /routes/:id`|
|Add a climb|`POST /routes`|
|Delete a route|`DELETE /routes/:id`|
|Access create account page|`GET /user/new`|
|Create an account|`POST /user`|
|Access log in page|`GET /auth/login`|
|Log in|`POST /auth/login`|
|Save route to profile|`POST /userRoutes`|
|See details on your climb|`GET /userRoutes/:id`|
|Access edit your climb form|`GET /userRoutes/edit/:id`|
|Delete a climb from profile|`DELETE /userRoutes/:id`|
|Log out|`GET /auth/logout`|

## Instructor Rubric Notes
- This app makes use of a Third Party API and User Auth.
- This project utilized a pretty legit ;) Trello board.
- I hope the user stats are considered creative.
- I dedicated a lot of time to the user profile layout, and I hope that's a WOW factor.
## Notes on Deployment
- Application will be deployed on Heroku
- `db/migrations` files must be run in Heroku bash to set up tables.
- `seed.js` must be run in Heroku bash to seed the `climbing_routes` table from Mountain Project's API.
- The `MOUNTAIN_PROJECT_API_KEY` in `seed.js` is supressed in an `.env`. You will need to request your own credentials from Mountain Project and add the key in your own `.env` file.

## Links and Resources
- Mountain Project API [here](https://www.mountainproject.com/data)

## Future improvements
- I attempted to allow users to upload images for new climbing routes, but didn't fix all crinkles in the implementation. I preserved the middleware, but not the routes, in services/cloudinary-helpers.js. I would really like to get this working as an improvement.
- With further time, I'd love to implement user filtering by location. This would've required several additional components to fully support:
    - Address parser (or similar) to allow users to input location of a new climb.
    - Google Maps API middleware to create standardized location column in db as initial Mountain Project API seed only includes lat/long.
    - Front end filter drop downs and subsequent routing.
- More complex user tracking and stats. By allowing an input for the number of attempts on a given climb, more interesting user stats could be created ie: median attemps per climb grade. Super cool stats would be tracking this over time to allow users to understand how they're improving over time. This could lead to building our a more robust profile section with a stats page and climbing routes page.
- Also, I did a more of a sample programatic seed of the database by pulling in 200 climbs centered around Joshua Tree where there are many popular climbs. It would logically be better to have proper geographical representation of climbs.
- I have many, many more ideas :) Watch this space.