const router = require('express').Router() 
const categoryController = require('../controllers/category')
const {errorWrapper} = require('../../utils/error')

router.get('/',errorWrapper(categoryController.get))
router.get('/:id',errorWrapper(categoryController.getById))
router.post('/',errorWrapper(categoryController.add))
router.put('/:id',errorWrapper(categoryController.update))
router.delete('/:id',errorWrapper(categoryController.delete))

module.exports = router