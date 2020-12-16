## Pairing App - Frontend

The frontend of our Pair Programming app.

Check out the backend: <a href="https://github.com/Duncan-7/pairing-app-backend">Pairing App Backend</a>

### Frontend Stack

- `webpack` to bundle the javascript
- `react` to make requests to the api and render the component views

### Card wall

<a href="https://trello.com/b/BRtHyVfB/super-team-education"> Team's Trello Board</a> 

### Database Schema

Here's the database schema:

[comment]: <> (<img src="images/db_schema_updated.png" width="700" height="500">)

### Features

- Signup/Login/Logout
- Password encryption
- Pair matching algorithm
- Messaging functionality once a pair is matched
- Match display

### Pairing Algorithm



### Try it!

Want to see & try our app? Here's how:
- Clone this repo using `git clone`
- Clone the backend using `git clone`
- Install Maven `brew install maven`
- Install `npm install`
- From the command line create a dev database `createdb pairing_app`<br>
  (if you're not using `postgresql` make sure you amend `application.properties` file to suit your database)
- Build the app and start the server, using the Maven command `mvn spring-boot:run`
- Build the frontend by running the command `npm start` in a different terminal window
- Visit `localhost:3000`
