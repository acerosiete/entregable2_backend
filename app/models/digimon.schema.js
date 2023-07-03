const mongoose = require('mongoose');
const { Schema } = mongoose;

const DigimonSchema = new Schema({
    name: {type: String, required: true},
    img: {type: String, required: false},
    level:{type: String, required: true} 
    }
);

module.exports = mongoose.model("Digimon", DigimonSchema);