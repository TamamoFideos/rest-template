const express = require('express');
const cors = require('cors');
const {dbConnection} = require("../db/config");

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //DB Connection
        this.connectDB();

        //Middlewares
        this.middlewares();

        //Rutas del servidor
        this.routes();
    }

    middlewares(){
        //CORS
        this.app.use(cors());

        //Lectura y parse del body
        this.app.use(express.json())

        //Directorio publico
        this.app.use(express.static('public'));
    }

    routes(){

        this.app.use('/api/users', require('../routes/user-route'));

    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto: ' + this.port + ' ........')
        })
    }

    async connectDB() {
        await dbConnection();
    }
}


module.exports = Server;