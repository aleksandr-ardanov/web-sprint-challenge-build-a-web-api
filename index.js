require('dotenv').config();         //import dotenv to define it
const server = require('./api/server');
const port = process.env.PORT || 9000;    //uses .env to set port 

server.listen(port,() => {
    console.log(`server is up and running on port ${port}`)
})


