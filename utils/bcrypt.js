const bcrypt = require('bcrypt')

exports.genHash = async (plaintext) =>{
    return await bcrypt.hash(plaintext.toString(),10);
}

exports.compareHash = async (plaintext,hash) =>{
    return await bcrypt.compare(plaintext.toString(),hash);
}