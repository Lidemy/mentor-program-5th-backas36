const db = require('../models')
const User = db.User
const Prize = db.Prize

const bcrypt = require('bcrypt');
const saltRounds = 10;

const getRandomId = (itemsId, weights) => {
   const range = weights.reduce((acc, num) => acc + num,0)
   const randomArr = []
      for(let i = 0 ; i<itemsId.length; i++){
        for(let j = 0; j < weights[i]; j++){
          randomArr.push(i)
        }
      }
      let randomNumber = Math.floor(Math.random()*100)
      console.log(randomNumber)
      return itemsId[randomArr[randomNumber]]
}

const prizeController = {
  getAPI: async(req, res) => {
    try{
      const prizes = await Prize.findAll()
      const itemsId = []
      const probabilityArr = []
      prizes.forEach(prize => {
        itemsId.push(prize.id)
        probabilityArr.push(prize.probability)
      })
     
      const id = getRandomId(itemsId, probabilityArr)
      const prize = await Prize.findOne(
        {
          where:{
            id
          }
        }
      )
      res.json(prize)
    } catch(error) {
      res.status(404).json({error:'sorry,沒有寵物適合你'})
    }
  },
  getIndex: (req, res) => {
    res.render('index')
  },
  getLogin: (req, res) => {
    res.render('login')
  },
  postLogin: async(req, res, next) => {
    const {username, password} = req.body
    if(!username || !password){
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
        req.session.isLogin = true
        req.session.username = username
        return res.redirect('/admin')
      })
    } catch(error) {
      req.flash('errorMessage', error.toString())
      return next()
    }
  },
  getLogout:  (req, res) => {
    req.session.isLogin = false
    req.session.username = false
    res.redirect('/')
  },
  getRegister: (req, res) => {
    res.render('register')
  },
  postRegister: async(req, res, next) => {
    const {username, password} = req.body
    if(!username || !password) {
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
          password: hash,
        })
        req.session.username = username
        req.session.isLogin = true
        return res.redirect('/')
      } catch(error) {
        req.flash('errorMessage',error.toString() )
        return next()
      }
    })
  }
}

module.exports = prizeController