const mongoose = require('mongoose');
const { Schema } = mongoose;

const NombresSchema = new Schema({
    name: {type: String, required: true},
    img: {type: String, required: false},
    }
);

module.exports = mongoose.model("Nombres", NombresSchema);