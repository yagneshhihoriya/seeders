const router = require('express').Router() 
const customerController = require('../controllers/customer')
const {errorWrapper} = require('../../utils/error')
const auth = require('../../utils/auth')

router.get('/',auth,errorWrapper(customerController.get))
router.get('/:id',auth,errorWrapper(customerController.getById))
router.post('/',errorWrapper(customerController.add))
router.put('/:id',auth,errorWrapper(customerController.update))
router.delete('/:id',auth,errorWrapper(customerController.delete))


module.exports = router