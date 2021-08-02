const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

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

        this.app.use('/api/users', require('../routes/user'));

    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto: ' + this.port + ' ........')
        })
    }

}


module.exports = Server;