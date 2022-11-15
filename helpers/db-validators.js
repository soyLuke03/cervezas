const Rol = require('../models/rol')
const User = require('../models/usuario')

const isValidRol = async (rol = '')=> {
	const existeRol = await Rol.findOne({ rol })
		  if (!existeRol) {
			  throw new Error(`Rol ${rol} not exists in database`)
		  }
}

const existsEmail = async (email) => {
	const emailDB = await User.findOne({ email});
    if (emailDB) {
        throw new Error(`Email ${email} already exists`);
    }
}
module.exports = { isValidRol, existsEmail}