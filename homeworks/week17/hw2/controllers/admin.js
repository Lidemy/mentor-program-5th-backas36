const { compareSync } = require('bcrypt')
const db = require('../models')
const User = db.User
const Prize = db.Prize

const isPermitted = (username, isLogin) => {
  return username && isLogin
}
const adminController = {
  getAddPrize: (req, res, next) => {
    if(!isPermitted(req.session.username, req.session.isLogin)){
      req.flash('errorMessage', '帳號有誤')
      return next()
    }
    return res.render('add-prize')
  },
  postAddPrize: async(req, res, next) => {
    if(!isPermitted(req.session.username, req.session.isLogin)){
      req.flash('errorMessage', '帳號有誤')
      return next()
    }

    const {prizeName, prizeDescription, imageUrl, probability} = req.body
    if(!prizeName || !prizeDescription || !imageUrl || !probability) {
      req.flash('errorMessage', '請輸入完整內容')
      return next()
    }

     try{
       const prize = await Prize.create({
        name:prizeName,
        description:prizeDescription,
        imageUrl,
        probability,
      })
      return res.redirect('/admin')
    } catch(error) {
      req.flash('errorMessage', error)
      return next()
    }
  },
  getAdmin: async(req, res, next) => {
    if(!isPermitted(req.session.username, req.session.isLogin)){
      return res.redirect('/')
    }
    try {
      const prizes = await Prize.findAll()
      return res.render('admin', {prizes})
    } catch(error) {
      req.flash('errorMessage', error)
      return next()
    }

   
  },
  getUpdatePrize: async(req, res, next) => {
    if(!isPermitted(req.session.username, req.session.isLogin)){
      return res.redirect('/')
    }
    const id = req.query.prizeId
    try {
      const prize = await Prize.findOne({
        where: {
          id
        }
      })

      if(!prize){
        req.flash('errorMessage', '資料不存在')
        return next()
      }

      return res.render('update-prize', {prize})

    } catch (error) {
      req.flash('errorMessage', error)
      return next()
    }
  },
  postUpdatePrize: async(req, res, next) => {
   if(!isPermitted(req.session.username, req.session.isLogin)){
      return res.redirect('/')
    }
    const {prizeName, prizeDescription, imageUrl, probability, id} = req.body

    if(!prizeName || !prizeDescription || !imageUrl || !probability) {
      req.flash('errorMessage', '請輸入完整內容')
      return next()
    }
     try{
       const prize = await Prize.update({
          name:prizeName,
          description:prizeDescription,
          imageUrl,
          probability,
        },
        {
          where:{
            id
          }
        }
      )
      return res.redirect('/admin')
    } catch(error) {
      req.flash('errorMessage', error)
      return next()
    }
  },
  getDeletePrize: async(req, res, next) => {
   if(!isPermitted(req.session.username, req.session.isLogin)){
      return res.redirect('/')
    }
    const id = req.query.prizeId

     try{
       Prize.destroy({
          where:{
            id
          }
        }
      )
      return res.redirect('/admin')
    } catch(error) {
      req.flash('errorMessage', error)
      return next()
    }
  }
}

module.exports = adminController