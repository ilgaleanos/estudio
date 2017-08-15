'use strict'

const express = require('express')
const ctlProducto = require('../controllers/producto')
const api = express.Router()

api.get('/', ctlProducto.GETALL);
api.get('/:id/', ctlProducto.GETONE);
api.post('/', ctlProducto.POST);
api.put('/:id/', ctlProducto.PUT);
api.delete('/:id/', ctlProducto.DELETE);

module.exports = api;
