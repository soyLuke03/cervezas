const path = require('path');
const fs   = require('fs');


const { response } = require('express');
const { uploadFile } = require('../helpers/uploadFile');

const { User } = require('../models/usuario');


const upload = async(req, res = response) => {
    
    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).send('No files were uploaded.');
        return;
    }

    try {
        
        // txt, md
        // const nombre = await uploadFile( req.files, ['txt','md'], 'textos' );
        const nombre = await uploadFile( req.files, undefined, 'imgs' );
        res.json({ nombre });

    } catch (msg) {
        res.status(400).json({ msg });
    }

}




module.exports = {
    upload
}