const router = require('express').Router();

const productRouterController = require('../Controller/ProductController');

router.post('/product/create', productRouterController.createProduct);
router.post('/product/delete', productRouterController.deleteProduct);
router.post('/product/update', productRouterController.updateProduct);
router.post('/product/view', productRouterController.viewProduct);
router.post('/product/view/id', productRouterController.viewProductById);
module.exports = router;