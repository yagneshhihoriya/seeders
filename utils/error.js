exports.errorHandler = (err, req, res, next) => {
    if (err) {
        return res.json({
            success: false,
            message: 'Internal Server Error',
            error: err
        })
    }
}

exports.errorWrapper = (fun) => {
    return async (req, res, next) => {
        try {
         fun(req, res, next)
        } catch (ex) {
            next(ex)
        }
    }
}