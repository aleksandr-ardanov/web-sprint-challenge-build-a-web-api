require('dotenv').config();         //import dotenv to define it
const server = require('./api/server');
const port = process.env.PORT || 9000;    //uses .env to set port 

server.listen(port,() => {
    console.log(`server is up and running on port ${port}`)        //this lets us know that server is running and which port it uses
})


//https://lambda-sprint-alex.herokuapp.com/  - deployed the app to Heroku