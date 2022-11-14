const User = require('../models/usuario')
const bcryptjs = require('bcryptjs')

const addUser = async(req, res) => {

    const { name, email, password, rol} = req.body;
    const existsEmail = await User.findOne({ email});
    if (existsEmail) {
        return res.status(400).json({
            "msg": "Email already exists"
        })
    }

    // Encriptar la contraseña
    const user = new User({name, email, password, rol})
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );


    
    await user.save();

    res.json(
        user
    )

}

module.exports = {addUser}