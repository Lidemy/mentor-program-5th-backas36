const express = require('express')
const session = require('express-session')
const flash = require('connect-flash')
const path = require('path')

const app = express()
const port = process.env.PORT || 3000

const adminRoutes = require('./routes/admin')
const blogRoutes = require('./routes/blog')

app.set('view engine', 'ejs')
app.use(flash())


app.use(express.urlencoded({ extended:false}))
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res, next) => {
  res.locals.username = req.session.username
  res.locals.role = req.session.role
  res.locals.nickname = req.session.nickname
  res.locals.errorMessage = req.flash('errorMessage')
  next()
})


const redirectBack = (req, res) => {
  res.redirect('back')
}

app.use('/admin', adminRoutes, redirectBack)
app.use(blogRoutes,redirectBack)


app.listen(port, () => {
  console.log(`server running in ${port} now ...`)
})