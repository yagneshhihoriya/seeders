const { verifyToken } = require('./jwt')
module.exports = async (req, res, next) => {
    if (req?.headers?.authorization) {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = await verifyToken(token)
        if (decoded) {
            req.isAdmin = decoded.isAdmin
            req.decoded = decoded
            next()
        } else {
            return res.status(404).json({ success: false, message: "Token Verification Failed" })
        }
    }else{
        return res.status(404).json({ success: false, message: "Token Verification Failed" })
    }
}