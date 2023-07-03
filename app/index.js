const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const { mongoose } = require('./database');
const  http = require('http').createServer(app);
const socket = require('./providers/socketConfig').listen(http);
const  digiController  = require('../app/controller/digimon.controller');
require('dotenv').config();

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}));

//Routes
app.use('/digimon', require('../app/routes/digimon.routes'));

//Starting server
http.listen(process.env.SERVER_PORT, () => {
    console.log('Server on port', process.env.SERVER_PORT);
})

socket.on("connection", function(cliente){
    console.log("cliente conectado");
    
    cliente.on("digimon", async function(){
        console.log("evento digimon recibido");

    });
    //Se ejecuta funcion random de imagenes en Socket 
    setInterval(async() => {

    const respRandom = await digiController.getRandomImage();
    console.log("resp enviada socket",respRandom);
    cliente.emit("digimonRandom", respRandom);
     //intervalo de tiempo para ejecutar el emit del Socket
    }, 600 * 1000);
        
        cliente.on("disconnect", function(){
            console.log("cliente desconectado");
        })
})