const router = require('express').Router() 
const customerController = require('../controllers/customer')
const {errorWrapper} = require('../../utils/error')
const auth = require('../../utils/auth')
const isAdmin = require('../miiddleware/isAdmin')

router.get('/',auth,isAdmin,errorWrapper(customerController.get))
router.get('/:id',auth,isAdmin,errorWrapper(customerController.getById))
router.post('/',errorWrapper(customerController.add))
router.put('/:id',auth,isAdmin,errorWrapper(customerController.update))
router.delete('/:id',auth,isAdmin,errorWrapper(customerController.delete))


module.exports = router