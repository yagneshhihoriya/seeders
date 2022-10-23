exports.routeName = (routeName) => {
    return async (req, res, next) => {
        req.routeName = routeName
        next()
    }
}