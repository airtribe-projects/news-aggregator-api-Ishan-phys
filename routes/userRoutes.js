const express = require('express');
const userController = require('../controller/userController');
const authController = require('../controller/authController');

const router = express.Router();

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/preferences', authController.authenticate, userController.getPreferences);
router.put('/preferences', authController.authenticate, userController.updatePreferences);

module.exports = router;


