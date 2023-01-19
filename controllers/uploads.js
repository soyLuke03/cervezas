const path = require('path');
const fs   = require('fs');
const { uploadFile } = require('../helpers/uploadFile');
const User = require('../models/usuario')
const Beer = require('../models/cerveza')

const { request } = require('http');
const { response } = require('express');


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

const getImage = async (req = request, res = response)=>{
    const {colection , id} = req.params;
    let instancia, collectionName;
    try {
	switch (colection) {
	        case "users": 
	            instancia = await User.findById(id)
	            collectionName = "users"
	            break;
	        case "beers":
	            instancia = await Beer.findById(id)
	            collectionName = "cervezas"
	            break;
	        default:
	            break;
	    }
} catch (error) {
	return res.status(400).json({error})
}

const imgNotFound = path.join(__dirname,'../assets/404NotFound.png')
if(instancia.img){
    const imagePath = path.join(__dirname,'../uploads',`imgs/${collectionName}`,instancia.img)
    if(fs.existsSync(imagePath)){
        return res.sendFile(imagePath)
    }
    
}
return res.status(200).json("imgNotFound")

}

const updateImage = async(req = request, res = response) => {
    const {colection , id} = req.params;
    let instancia, collectionName;
    try {
	switch (colection) {
	        case "users": 
	            instancia = await User.findById(id)
	            collectionName = "users"
	            break;
	        case "beers":
	            instancia = await Beer.findById(id)
	            collectionName = "cervezas"
	            break;
	        default:
	            break;
	    }
} catch (error) {
	return res.status(400).json({error})
}

    if(instancia.img){
        if (!req.files || Object.keys(req.files).length === 0) {
            res.status(400).send('No files were uploaded.');
            return;
        }
        
        const dirPath = path.join(__dirname, '../uploads', `imgs/${collectionName}`, instancia.img)

        if(!fs.existsSync(dirPath)){
            res.status(400).send('The path dont exists');
            return
        }
        if(fs.existsSync(dirPath)){
            fs.unlinkSync(dirPath)
        }
        
        
        
        
        
        try {                        
            const nombre = await uploadFile( req.files, undefined, `imgs/${collectionName}` );
            instancia.img = nombre;
            await instancia.save();
            res.json({ nombre });
    
        } catch (msg) {
            res.status(400).json({ msg });
        }
    }else{
        res.json({
            msg: "No existe el atributo IMG"
        })
    }


}



module.exports = {
    upload,
    updateImage,
    getImage
}