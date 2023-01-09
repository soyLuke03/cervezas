const path = require('path');
const fs   = require('fs');
const { uploadFile } = require('../helpers/uploadFile');
const User = require('../models/usuario')
const Beer = require('../models/cerveza')

const { request } = require('http');


const upload = async(req, res = response) => {
    
    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).send('No files were uploaded.');
        return;
    }

    try {
        
        // txt, md
        // const nombre = await uploadFile( req.files, ['txt','md'], 'textos' );
        
        //                               archivo, ext. permitidas, carpeta destino
        const nombre = await uploadFile( req.files, undefined, 'imgs' );
        res.json({ nombre });

    } catch (msg) {
        res.status(400).json({ msg });
    }

}
const updateImage = async(req = request, res = response) => {
    const {colection , id} = req.params;
    let instancia, collectionName;


    switch (colection) {
        case "users": 
            instancia = User.findById(id)
            collectionName = "users"


            res.json("usuarios")

            break;
        
        case "beers":
            instancia = Beer.findById(id)
            collectionName = "cervezas"
            
            
            res.json("cervezas")

            break;
    
        default:
            break;
    }

    if(instancia){
        if (!req.files || Object.keys(req.files).length === 0) {
            res.status(400).send('No files were uploaded.');
            return;
        }
        try {                        
            const nombre = await uploadFile( req.files, undefined, `imgs/${collectionName}` );
            res.json({ nombre });
    
        } catch (msg) {
            res.status(400).json({ msg });
        }
    }


}



module.exports = {
    upload,
    updateImage
}