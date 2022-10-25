const db = require('../models/db')

function getBeers(req, res){
    res.json(db.cervezas.find())
}

function getBeer(req, res){

}

function addBeer(req, res){

}

function deleteBeer(req, res){

}

function editBeer(req, res){

}

module.exports = { getBeers, getBeer, addBeer, deleteBeer, editBeer}