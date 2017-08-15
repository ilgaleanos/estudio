'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductoSchema = Schema({
    nombre: String,
    precio: {
        type: Number,
        default: 0
    },
    categoria: {
        type: String,
        enum: ['a', 'b', 'c']
    }
})

module.exports = mongoose.model('Producto', ProductoSchema);
