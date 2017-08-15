'use strict'

// import express from 'express' //require babel

/*------------------------------------------------------------------------------------------
    IMPORTS
------------------------------------------------------------------------------------------*/
const config = require('./config')

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const producto = require('./routes/producto');

/*------------------------------------------------------------------------------------------
    INTANCES
------------------------------------------------------------------------------------------*/
const app = express();

/*------------------------------------------------------------------------------------------
    MIDDLEWARES
------------------------------------------------------------------------------------------*/
app.use(bodyParser.urlencoded({extended: false})).use(bodyParser.json());

app.set('view cache', true);
/*------------------------------------------------------------------------------------------
    DB
------------------------------------------------------------------------------------------*/
var db = mongoose.connect(config.DB, {useMongoClient: true});

db.on('error', console.log.bind(console, 'DB connection refused'));
db.once('open', console.log.bind(console, 'DB connection success'));

/*------------------------------------------------------------------------------------------
    SERVER
------------------------------------------------------------------------------------------*/
app.listen(config.PORT, () => {
    console.log(`Servidor en el puerto ${config.PORT}`);
});

/*------------------------------------------------------------------------------------------
    MODULOS
------------------------------------------------------------------------------------------*/

app.use('/api/productos', producto);
