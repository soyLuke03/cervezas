const db = require('../models/db')
const { response, request } = require('express');
const Cerveza = require('../models/cerveza');
function getBeers(req, res) {
    res.json(db.cervezas.find())
}

function getBeer(req = request, res = response) {
    const id = req.params.id
    const beers = db.cervezas.find({ _id: id });
    if (beers.length) {
        res.json(beers);
    } else {
        res.json({ message: `La cerveza ${id} no existe` })
    }

}

async function addBeer(req = request, res = response) {
    // const beer = req.body
    // const inserted = db.cervezas.save(beer)
    // res.json(inserted)
    const { Nombre, Descripción, Graduación, Envase, Precio } = req.body;
    const cerveza = new Cerveza({ Nombre, Descripción, Graduación, Envase, Precio });


    // Guardar en BD
    await cerveza.save();

    res.json({
        cerveza
    });
}

function deleteBeer(req = request, res = response) {
    const beerId = req.params.id;
    const removed = db.cervezas.remove({ _id: beerId });
    res.json(removed);
}

function editBeer(req = request, res = response) {
    const beerId = req.params.id;
    const beer = req.body;
    const updatedBeer = db.cervezas.update({ _id: beerId }, beer);

    res.json(updatedBeer);
}

module.exports = { getBeers, getBeer, addBeer, deleteBeer, editBeer }