const express = require('express');
const server = express();
require('dotenv').config();

const port = process.env.PORT;

server.set('view engine', 'ejs');
server.use(express.static('public'))

server.get('/', (require, response) => response.render('index'));

server.get('/login', (require, response) => response.render('login'));

server.get('/register', (require, response) => response.render('register'));

server.listen(port, () => console.log(`Project Fidonet2020 server is listening on port ${port}`));
