const db = require('../models')

const bcrypt = require('bcrypt');
const saltRounds = 10;

const User = db.User
const Article = db.Article
const Comment = db.Comment
const Category = db.Category

const blogController = {
  getCategory: async() => {
    try{
      const categories = await Category.findAll({
          where: {
            is_deleted: false
          }
        })
      return categories
    } catch(error) {
      console.log(error)
    }
  },
  getNewArticles: async() =>{
    try{
      const articles = Article.findAll({
            where: {
                is_deleted: false
            },
            attributes:['title', 'id'],
            order:[['id', 'DESC']],
            limit:5,
            include:[
              {
                model: Category,
                where: {
                  is_deleted:false
                }
              },
            ]
      })
      return articles
    }catch(error) {
      console.log(error)
    }
  },
  getNewComments: async() => {
    try{
      const comments = Comment.findAll({
            where: {
                is_deleted: false
            },
            order:[['id', 'DESC']],
            limit:5,
            include:[
                {
                  model: Article,
                  where: {
                    is_deleted:false
                  },
                  include:[
                        {
                          model: Category,
                          where: {
                            is_deleted:false
                          }
                        },
                    ]
                },
                User,
            ]
      })
      return comments
    }catch(error) {
      console.log(error)
    }
  },
  getIndex: async(req,res, next) =>{
    let articles = []
    let page = 1

    if(!isNaN(req.query.page)){
      page = +req.query.page
    }
  
    const itemPerPage = 3 
    const offset = (page - 1) * itemPerPage
    
    try {
      articles = await Article.findAndCountAll({
        where: {
          is_deleted:false
        },
        limit:itemPerPage,
        offset,
        distinct: true,
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

      const totalPage = Math.ceil(articles.count / itemPerPage)
      return res.render('blog/index', {
        articles:articles.rows,
        categories,
        newArticles,
        newComments,
        totalPage,
        page
      })
    } catch (error) {
      req.flash('errorMessage', error)
      return next()
    }
  },
  getLogin: async(req, res) => {
  
    const newArticles = await blogController.getNewArticles()
    const categories = await blogController.getCategory()
    const newComments = await blogController.getNewComments()
    res.render('blog/login', {
      categories,
      newArticles,
      newComments
    })
  },
  postLogin:  async(req, res, next) => {
     const {username, password} = req.body
    if( !username || !password){
      req.flash('errorMessage', '該填的沒填唷！')
      return next()
    }
    try{
       const user = await User.findOne({
        where:{
          username
        }
      })

      if(!user){
        req.flash('errorMessage', '帳號不存在')
        return next()
      }
      bcrypt.compare(password, user.password, function(error, result) {
        if(error || !result) {        
          req.flash('errorMessage', '密碼錯誤')
          return next()
        }
        req.session.username = username
        req.session.userId = user.id
        req.session.nickname = user.nickname
        req.session.role = user.role
        return res.redirect('/')
      })
    } catch(error) {
      req.flash('errorMessage', error.toString())
      return next()
    }
  },
  getLogout:(req,res) => {
    req.session.username = false
    req.session.userId = false
    req.session.nickname = false
    req.session.role = false
    return res.redirect('/')
  },
  getAllArticles: async(req, res, next) => {
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
          User
          ]
      })
      
      const newArticles = await blogController.getNewArticles()
      const categories = await blogController.getCategory()
      const newComments = await blogController.getNewComments()

     return res.render('blog/article-list', {
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
  getArticles: async(req, res, next) => {
    const categoryId = req.query.categoryId
    let articles = []
    try {
      articles = await Article.findAll({
        where: {
          is_deleted:false,
          CategoryId:categoryId
        },
        order:[['id', 'DESC']],
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
      
      const newArticles = await blogController.getNewArticles()
      const categories = await blogController.getCategory()
      const newComments = await blogController.getNewComments()

      return res.render('blog/article-list', {
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
  getArticle: async(req, res, next) => {
    const articleId = req.params.articleId
    let article = []
    try {
      article = await Article.findOne({
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
      const comments = await Comment.findAll({
        where: {
          ArticleId : article.id,
          is_deleted:false
        },
        include:[
          User
        ]
      })
       if(!comments){
        req.flash('errorMessage', '這篇留言文章不存在')
        return next()
      }
      
      const newArticles = await blogController.getNewArticles()
      const categories = await blogController.getCategory()
      const newComments = await blogController.getNewComments()

      return res.render('blog/article', {
        article,
        comments,
        categories,
        newArticles,
        newComments
      })


    } catch (error) {
      req.flash('errorMessage', error)
      return next()
    }
  },
  getRegister: async(req,res) => {
      const newArticles = await blogController.getNewArticles()
      const categories = await blogController.getCategory()
      const newComments = await blogController.getNewComments()
      return res.render('blog/register', {
        categories,
        newArticles,
        newComments
      })
  },
  postRegister: async(req, res, next) => {
    const {username, password, nickname} = req.body
    if(!username || !password || !nickname) {
       req.flash('errorMessage', '請填好完整資料')
      return next()
    }
    bcrypt.hash(password, saltRounds, async (error, hash) => {
      if(error){
        req.flash('errorMessage',error.toString() )
        return next()
      }
      try {
        const user = await User.create({
          username,
          nickname,
          password: hash,
          role:'vistor'
        })
        req.session.username = username
        req.session.userId = user.id
        req.session.nickname = user.nickname
        req.session.role = user.role
        return res.redirect('/')
      } catch(error) {
        req.flash('errorMessage',error.toString() )
        return next()
      }
    })
  }
}

module.exports = blogController