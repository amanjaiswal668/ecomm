const router = require('express').Router();

const adminRouterController = require('../Controller/AdminController');

router.post('/admin/create', adminRouterController.createAdmin);
router.post('/admin/login', adminRouterController.adminLogin);
module.exports = router;