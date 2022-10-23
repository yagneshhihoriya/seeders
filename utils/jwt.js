const jwt = require('jsonwebtoken')
const secretKey = process.env.secretKey || '12345gdhjhbasjkhfklsjflkjsdalkfjsldkfj'

exports.genToken = (value) => {
    const token = jwt.sign(value, secretKey, {
        expiresIn: 1000 * 60 * 60
    })
    return token
}

exports.verifyToken = async (token) => {
    try {
        const decoded = jwt.verify(token, secretKey)
        return decoded
    } catch (ex) {
        return false
    }
}