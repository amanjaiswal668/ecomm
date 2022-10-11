const router = require('express').Router();

const orderRouterController = require('../Controller/OrderController');

router.post('/order/create', orderRouterController.createOrder);
router.post('/order/view', orderRouterController.viewAllOrder);
module.exports = router;