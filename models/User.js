/**
 * Model para Users. Cria o modelo dos usuarios e a criptografia da senha usando bcrypt para
 * gerar o Hash
 */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//cria o Schema de Users
const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
})

/*antes de processar o salvamento do usuario, os dados entram nesta funcao. Se a senha nao 
tiver sido modificada, ele pula os outros passos e salva o usuario. Se a senha eh modificada,
ele gera um salt usando o bcrypt e criptografa a senha antes de salvas */
UserSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt((err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            user.password = hash
            next()
        })
    })
});

//verifica a senha do usuario
UserSchema.methods.checkPassword = function (password) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, this.password, (err, isMatch) => {
            if (err) {
                reject(err);
            } else {
                resolve(isMatch);
            }
        })
    })
}


const User = mongoose.model('User', UserSchema)
module.exports = User;