const express = require('express')
const path = require('path')

const blogController = require('../controllers/blog')
const router = express.Router()

router.get('/', blogController.getIndex)
router.get('/login', blogController.getLogin)
router.post('/login', blogController.postLogin)

router.get('/logout', blogController.getLogout)
router.get('/article-list', blogController.getAllArticles)
router.get('/articles', blogController.getArticles)

router.get('/article/:articleId', blogController.getArticle)
router.get('/register', blogController.getRegister)
router.post('/register', blogController.postRegister)
router.get('/:page', blogController.getIndex)




module.exports = router
