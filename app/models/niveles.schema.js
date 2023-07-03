const mongoose = require('mongoose');
const { Schema } = mongoose;

const NivelDigimonSchema = new Schema({
    id: {type: Number, required: true},
    nombre: {type: String, required: true}
    }
);

module.exports = mongoose.model("Niveles", NivelDigimonSchema);