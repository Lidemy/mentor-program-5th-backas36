const express = require('express')
const flash = require('connect-flash')
const session = require('express-session')

const adminController = require('./controllers/admin')
const prizeController = require('./controllers/prize')
const prize = require('./models/prize')

const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }));
app.use(flash())
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.use((req, res, next) => {
  res.locals.username = req.session.username
  res.locals.isLogin = req.session.isLogin
  res.locals.errorMessage = req.flash('errorMessage')
  next()
})

const redirectBack = (req, res) => {
  res.redirect('back')
}

app.get('/api', prizeController.getAPI)
app.get('/', prizeController.getIndex)
app.get('/login', prizeController.getLogin)
app.post('/login' , prizeController.postLogin, redirectBack)

app.get('/logout', prizeController.getLogout)

app.get('/register', prizeController.getRegister)
app.post('/register', prizeController.postRegister, redirectBack)


app.get('/admin/add-prize', adminController.getAddPrize, redirectBack)

app.post('/admin/add-prize', adminController.postAddPrize, redirectBack)

app.get('/admin/update-prize', adminController.getUpdatePrize, redirectBack)
app.post('/admin/update-prize', adminController.postUpdatePrize, redirectBack)
app.get('/admin/delete-prize', adminController.getDeletePrize, redirectBack)

app.get('/admin', adminController.getAdmin, redirectBack)


app.listen(port, () => {
  console.log(`server running in ${port} now...`)
})