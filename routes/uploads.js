const { Router } = require('express');
const { check } = require('express-validator');
const {upload, updateImage} = require('../controllers/uploads');
const { existsUser } = require('../helpers/db-validators');
const { validateFields } = require('../helpers/validate-fields')


const collection = ['users','beers']
const router = Router();


router.post( '/', upload );

router.put('/:colection/:id',[
    check('id','No es MongoId').isMongoId(),
    check('id','No existe un usuario con ese id').custom(existsUser),
    check('colection','No existe la coleccion :c').isIn(collection),
    validateFields
], updateImage)



module.exports = router;