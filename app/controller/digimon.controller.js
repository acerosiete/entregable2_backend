const DigimonModel = require('../models/digimon.schema');
const NivelesModel = require('../models/niveles.schema');
const NombresModel = require('../models/nombres.schema');
const axios = require('axios');
require('dotenv').config();

const digiController = {

    constructor(){
        this.nombreDigimon = "Agumon";
        this.nivelDigimon = "Champion";
    },

    setNombre(nombre){
        this.nombre = nombre;
        return this;
    },

    setNivel(nivel){
        this.nivel = nivel;
        return this;
    },

    build(){
        return {
            nombre: this.nombre,
            nivel:  this.nivel
        }
    }
}


digiController.getAllDigimons = async (req, res) => {
   try{
    let allDigimons = [];

    const digimonsDatabase = await DigimonModel.find({},{_id:0, name:1, img:1, level:1});

    let dataAllDigi =  await axios.get(process.env.URL_DIGI);

    let digimons = dataAllDigi.data;
    
   allDigimons = digimonsDatabase.concat(digimons);
   console.log(allDigimons);

        res.json(allDigimons);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

digiController.saveDigimon = async (req, res) => {
    try {
        const existingDigimon = await DigimonModel.findOne({ name: req.body.name });
        if (existingDigimon) {
            return res.status(400).json({ error: "Digimon already exists" });
        }

        const digimon = new DigimonModel(req.body);
        await digimon.save();
        console.log(digimon);
        res.json(digimon);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while saving the digimon" });
    }
}

digiController.getDigimonById = async (req, res) => {

    console.log(req.params);
    const digimon = await DigimonModel.findById(req.params.id);
    res.json(digimon);


}


digiController.getDigimonByLevel = async (req, res) => {
    try {
        let digimons = [];
        //uso de Builder
        let nivelDigi = digiController.setNivel(req.params.id).build();
        console.log(nivelDigi.nivel);

        const existeNivel = await NivelesModel.find({"nombre":nivelDigi.nivel}).count();
        if(existeNivel > 0){

            const response = await axios.get(process.env.URL_DIGI+"/level/"+nivelDigi.nivel);   
            digimons = response.data;
        }

        res.json(digimons);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

digiController.getDigimonByName = async (req, res) => {

    try {
    
    let digimons = [];
    //uso de Builder
    let nombreDigi = digiController.setNombre(req.params.id).build();

    let existeDigiCreado = await DigimonModel.find({"name":nombreDigi.nombre}).count();
        console.log("existe digimon creado:",existeDigiCreado);

    if(existeDigiCreado == 0){
        let existeDigiReal = await NombresModel.find({"name":nombreDigi.nombre}).count();
        console.log("existe digimon real:",existeDigiReal);
        if(existeDigiReal == 0){
            res.json(digimons);
        }else{
            let dataAllDigi =  await axios.get(process.env.URL_DIGI+"/name/"+nombreDigi.nombre);
            digimons = dataAllDigi.data;
            console.log("respuesta::",digimons);
            res.json(digimons);
        }
    }else{
        const digimonDatabase = await DigimonModel.find({"name":nombreDigi.nombre},{_id:0, name:1, img:1, level:1});
        digimons = digimonDatabase;
        console.log("respuesta::",digimons);
        res.json(digimons);
    }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

digiController.getRandomImage = async (req, res) => {
    try{

     let dataAllDigi =  await axios.get(process.env.URL_DIGI);
 
     let digimons = dataAllDigi.data;
     let imagenesDigimon = digimons.map(({ img }) => img);
     let randomImage = getRandomItem(imagenesDigimon);
     console.log("imagen aleatoria:", randomImage);

         return randomImage;
 
     } catch (error) {
         console.error(error);
         res.status(500).json({ error: 'Internal Server Error' });
     }
 }

 function getRandomItem(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const item = arr[randomIndex];
    return item;
}

module.exports = digiController;
