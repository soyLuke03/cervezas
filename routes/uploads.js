const { Router } = require('express');
const { check } = require('express-validator');
const {upload} = require('../controllers/uploads')



const router = Router();


router.post( '/', upload );




module.exports = router;