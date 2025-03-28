const express = require('express');
const authController = require('../controller/authController');
const newsController = require('../controller/newsController');

const router = express.Router();

router.get('/', authController.authenticate, newsController.getNews);
router.post('/:id/read', authController.authenticate, newsController.saveRead);
router.post('/:id/favourite', authController.authenticate, newsController.saveFavourite);
router.get('/read', authController.authenticate, newsController.getReadNews);
router.get('/favourite', authController.authenticate, newsController.getFavouriteNews);

module.exports = router;