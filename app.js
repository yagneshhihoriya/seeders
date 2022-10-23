const express = require('express')
const router = express.Router()
const mainRoute = require('./api/routes')

router.use('/api',mainRoute)

module.exports = router