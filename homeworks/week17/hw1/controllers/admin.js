const blogController = require('./blog')
const db = require('../models')
const User = db.User
const Article = db.Article
const Comment = db.Comment
const Category = db.Category



const isAdmin = (role) => {
  return role === 'admin'
}


const adminController = {
  getAllArticles: async(req, res, next) => {
    if(!isAdmin(req.session.role)){
      return res.redirect('/')
    }
    let articles = []
    try {
      articles = await Article.findAll({
        where: {
          is_deleted:false
        },
        order:[['id', 'DESC']],
        include: [
           {
            model: Category,
            where: {
              is_deleted:false
            }
          },
        ]
      })
      const newArticles = await blogController.getNewArticles()
      const categories = await blogController.getCategory()
      const newComments = await blogController.getNewComments()

      return res.render('admin/article-list', {
        articles,
        categories,
        newArticles,
        newComments
      })
    } catch (error) {
      req.flash('errorMessage', error)
      return next()
    }
  },
  getNewArticle: async(req, res, next) => {
    if(!isAdmin(req.session.role)){
      return res.redirect('/')
    }
    const newArticles = await blogController.getNewArticles()
    const categories = await blogController.getCategory()
    const newComments = await blogController.getNewComments()
    return res.render('admin/add-article', {
        categories,
        newArticles,
        newComments
    })
  },
  postNewArticle: async(req, res, next) => {
    const {article_content, category_id, article_title} = req.body

    if(!isAdmin(req.session.role)|| !article_content) {
      req.flash('errorMessage', '帳號有誤或內容空白')
      return next()
    }

    
    try{
       Article.create({
        title:article_title,
        content:article_content,
        is_deleted:false,
        UserId:req.session.userId,
        CategoryId:category_id
      })
      return res.redirect('/admin/article-list')
    } catch(error) {
      req.flash('errorMessage', error)
      return next()
    }
  },
  getUpdateArticle: async(req, res, next) => {
    const articleId = req.query.articleId

    if(!isAdmin(req.session.role) || !articleId){
      return res.redirect('/')
    }
     try {
      const article = await Article.findOne({
        where: {
          is_deleted:false,
          id:articleId
        },
        include: [
          {
            model: Category,
            where: {
              is_deleted:false
            }
          },
          User
        ]
      })

      if(!article){
        req.flash('errorMessage', '文章不存在')
        return next()
      }
      
      const newArticles = await blogController.getNewArticles()
      const categories = await blogController.getCategory()
      const newComments = await blogController.getNewComments()

      return res.render('admin/update-article', {
        article,
        categories,
        newArticles,
        newComments
      })


    } catch (error) {
      req.flash('errorMessage', error)
      return next()
    }
  },
  postUpdateArticle: async(req,res, next) => {
    const {articleTitle, categoryId, articleContent, articleId} = req.body
     if(!isAdmin(req.session.role)){
        return res.redirect('/')
    }

    if(!articleTitle || !categoryId || !articleId){
      req.flash('errorMessage', '請輸入完整內容')
      return next()
    }

    try{
       const article = Article.update({
          title:articleTitle,
          content:articleContent,
          is_deleted:false,
          UserId:req.session.userId,
          CategoryId:categoryId
        },
        {
          where:{
            id:articleId
          }
        }
      )
      return res.redirect('/admin/article-list')
    } catch(error) {
      req.flash('errorMessage', error)
      return next()
    }
  },
  getDeleteArtice: async(req, res) =>{
    const articleId = req.query.articleId

    if(!isAdmin(req.session.role) || !articleId){
      return res.redirect('/')
    }
    try{
      const result = await Article.update({
        is_deleted:true
      },
      {
        where:{
          id:articleId
        }
      })
      return res.redirect('admin/article-list')

    } catch(error) {
      return res.redirect('admin/article-list')
    }
  },
  getCategoryList: async (req, res, next) => {
    if(!isAdmin(req.session.role)){
      return res.redirect('/')
    }
    try {
      const categories = await Category.findAll({
        where: {
          is_deleted:false
        },
        order:[['id', 'DESC']]
      })
      const newArticles = await blogController.getNewArticles()
      const newComments = await blogController.getNewComments()

      return res.render('admin/category-list', {
        categories,
        newArticles,
        newComments
      })
    } catch (error) {
      req.flash('errorMessage', error)
      return next()
    }
  },
  postAddCategory: async(req, res, next) => {
    const {category_name} = req.body

    if(!isAdmin(req.session.role)|| !category_name) {
      req.flash('errorMessage', '帳號有誤或內容空白')
      return next()
    }
    
    try{
       Category.create({
        category_name,
        is_deleted:false,
      })
      return res.redirect('/admin/category-list')
    } catch(error) {
      req.flash('errorMessage', error)
      return next()
    }
  },
  getDeleteCategory: async(req, res, next) => {
    const categoryId = req.query.categoryId
    if(!isAdmin(req.session.role) || !categoryId){
      return res.redirect('/')
    }
    try{
      const result = await Category.update({
        is_deleted:true
      },
      {
        where:{
          id:categoryId
        }
      })
      return res.redirect('admin/category-list')

    } catch(error) {
      return res.redirect('admin/category-list')
    }
  },
  getUpdateCategory: async(req, res, next) => {
    const categoryId = req.query.categoryId
     if(!isAdmin(req.session.role) || !categoryId){
      return res.redirect('/')
    }
     try {
      const category = await Category.findOne({
        where: {
          is_deleted:false,
          id:categoryId
        }
      })

      if(!category){
        req.flash('errorMessage', '分類不存在')
        return next()
      }
      
      const newArticles = await blogController.getNewArticles()
      const categories = await blogController.getCategory()
      const newComments = await blogController.getNewComments()
      return res.render('admin/update-category', {
        categories,
        newArticles,
        newComments,
        category
      })
    } catch (error) {
      req.flash('errorMessage', error)
      return next()
    }
  },
  postUpdateCategory:async(req, res, next) =>{
    const {categoryId, categoryName} = req.body 
    if(!isAdmin(req.session.role)){
          return res.redirect('/')
      }

      if(!categoryId || !categoryName){
        req.flash('errorMessage', '資料不完整')
        return next()
      }

      try{
          const category = Category.update({
            is_deleted:false,
            category_name:categoryName
          },
          {
            where:{
              id:categoryId
            }
          }
        )
        return res.redirect('/admin/category-list')
      } catch(error) {
        req.flash('errorMessage', error)
        return next()
      }
  }
}

module.exports = adminController