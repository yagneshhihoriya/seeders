const router = require('express').Router() 
const productController = require('../controllers/product')
const {errorWrapper} = require('../../utils/error')
router.get('/',errorWrapper(productController.get))
router.get('/:id',errorWrapper(productController.getById))
router.post('/',errorWrapper(productController.add))
router.put('/:id',errorWrapper(productController.update))
router.put('/add-quantity/:id',errorWrapper(productController.addQuantity))
router.delete('/:id',errorWrapper(productController.delete))

module.exports = router