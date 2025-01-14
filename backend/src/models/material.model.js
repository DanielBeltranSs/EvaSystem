"use strict";

const mongoose = require('mongoose');

const MaterialSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    tipo: { type: String, required: true },
    unidad: { type: String, required: true },
    codigoBarra: { type: String, required: false, unique: true },
    imageUrl: { type: String, required: false }, // Campo opcional para la URL de la imagen
    valorDeVenta: { type: Number, required: false }, // Nuevo campo opcional para el valor de venta
});

module.exports = mongoose.model('Material', MaterialSchema);
