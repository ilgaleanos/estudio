'use strict'

const Producto = require('../models/producto')

function GETALL(req, res) {
    Producto.find({}, (err, productos) => {
        if (err) {
            return res.status(471).send({msj: 'Ha ocurrido un error'});
        }

        return res.status(200).send({productos});
    });
}

function GETONE(req, res) {
    var id = req.params.id;
    Producto.findById(id, (err, producto) => {
        if (err) {
            return res.status(471).send({msj: 'El producto no existe'});
        }

        return res.status(200).send({producto});
    });
}

function POST(req, res) {
    const bag = req.body;

    var producto = new Producto();
    producto.nombre = bag.nombre;
    producto.precio = bag.precio;
    producto.categoria = bag.categoria;

    producto.save((err, producto) => {
        if (err) {
            return res.status(471).send({msj: 'Fallo al guardar'});
        }

        return res.status(200).send({producto});
    });
}

function PUT(req, res) {
    const id = req.params.id;
    const bag = req.body;

    Producto.update({
        _id: id
    }, bag, (err, producto) => {
        if (err)
            return res.status(472).send({msj: 'Ha ocurrido un error'});

        return res.status(200).send({producto});
    });
}

function DELETE(req, res) {
    const id = req.params.id;

    Producto.remove({
        _id: id
    }, (err, producto) => {
        if (err)
            return res.status(472).send({msj: 'Ha ocurrido un error'});

        return res.status(200).send({producto});
    });
}

module.exports = {
    GETALL,
    GETONE,
    POST,
    PUT,
    DELETE
};
