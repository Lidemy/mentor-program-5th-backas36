const express = require('express')
const path = require('path')

const adminController = require('../controllers/admin')
const router = express.Router()

router.get('/update-article', adminController.getUpdateArticle)
router.post('/update-article', adminController.postUpdateArticle)


router.get('/category-list', adminController.getCategoryList)
router.post('/add-category', adminController.postAddCategory)
router.get('/delete-category', adminController.getDeleteCategory)
router.get('/update-category', adminController.getUpdateCategory)
router.post('/update-category', adminController.postUpdateCategory)



router.get('/delete-article', adminController.getDeleteArtice)
router.get('/article-list', adminController.getAllArticles)
router.get('/add-article', adminController.getNewArticle)
router.post('/add-article', adminController.postNewArticle)





module.exports = router