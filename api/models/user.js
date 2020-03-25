const mongoose = require(`mongoose`),
    bcrypt = require(`bcrypt`);


const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
        type: String,
        trim: true,
        required: true
    }
}, {
    timestamps: true
});


UserSchema.methods.hashPassword = function(password){
    return bcrypt.hashSync(password, 10);
}

UserSchema.methods.verifyPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}


module.exports = mongoose.model(`User`, UserSchema);