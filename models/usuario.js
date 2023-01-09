const { Schema, model} = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is mandatory']
    },
    email: {
        type: String,
        required: [true, 'Mail is mandatory'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is require'],
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    state: {
        type: Boolean,
        default: true
    },
    img: {
        type: String
    }

    
    
})

UserSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user} = this.toObject();
    user.uid = _id;
    return user;
}

module.exports = model( 'User', UserSchema )

