const router = require('express').Router() 
const orderController = require('../controllers/order')

router.get('/',orderController.get)
router.get('/:id',orderController.getById)
router.post('/',orderController.add)
router.put('/:id',orderController.update)
router.delete('/:id',orderController.delete)

module.exports = router