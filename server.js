// our flappy bird game will be hosted here!
const express = require('express');
const http = require('http');

let app = express();
const server = http.createServer(app);
// express middleware
app.use(express.static('./client'));

// bind app to port
server.listen(3000,()=>{
	console.log("Successfully connected to port 3000!");
});