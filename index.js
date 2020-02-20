const express = require('express');
const Sequelize = require('sequelize')
const server = express();
require('dotenv').config();

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS
const dbHost = process.env.DB_HOST
const dbPort = process.env.DB_PORT
const dbDialect = process.env.DB_DIALECT
const dbReconnectTimeout = process.env.DB_RECONNECT_TIMEOUT

const sequelize = new Sequelize('dbName', 'dbUser', 'dbPass', {
    'host': dbHost,
    'port': dbPort,
    'dialect': dbDialect
});

const User = sequelize.define('User', {
    login: {
      type: Sequelize.STRING(64),
      allowNull: false,
      unique: true
    }
});

const password = sequelize.define('password', {
    password: {
      type: Sequelize.STRING(256),
      allowNull: false
    }
});

const administrator = sequelize.define('administrator', {
    login: {
      type: Sequelize.BOOLEAN(256),
      allowNull: false,
      defaultValue: false

    }
});


const Message = sequelize.define('Message', {
    content: {
      type: Sequelize.STRING(140),
      allowNull: false
    }
});

User.hasMany(Message);
Message.belongsTo(User);


const port = process.env.PORT;

server.set('view engine', 'ejs');
server.use(express.static('public'))

server.get('/', (require, response) => response.render('index'));

server.get('/login', (require, response) => response.render('login'));

server.get('/register', (require, response) => response.render('register'));

(function loop(){
    setTimeout(async () => {
        try {
            await sequelize.sync();
            const hashedPass = bcrypt.hashSync(
                process.env.ADMIN_PASS,
                bcrypt.genSaltSync(B)
            );
            await User.upsert( {
                'login': 'admin',
                'password': hashedPass,
                'administrator': true
            })
            server.listen(port, () => console.log(`Guestbook is listening on port ${port}!`));
        } catch (error) {
            console.error(error);
            console.error("Failed to connect. Trying again...");

            loop();
        }
    }, process.env.DB_RECONNECT_TIMEOUT || 2000);
})();