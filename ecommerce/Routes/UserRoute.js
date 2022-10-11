const router = require('express').Router();

const userRouterController = require('../Controller/UserController');

router.post('/user/create', userRouterController.createUser);
router.post('/user/login', userRouterController.userLogin);
module.exports = router;