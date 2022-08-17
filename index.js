import express from 'express'
import session from 'express-session'
import passport from 'passport'

import { router as authRouter, passportInit } from './modules/auth.mjs'
import { router as restRouter } from './modules/rest.mjs'

const port = 3000
const app = express()
passportInit();

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));
app.use(express.static('public'))
app.use(passport.initialize());
app.use(passport.session());

//app.get('/test', (req, res) => {
//  console.log('req.session', req.session)
//  req.session.number = req.session.number ? //req.session.number + 1 : 1
//  res.json({ session: req.session })
//})

app.use('/auth', authRouter)
app.use('/rest', restRouter)
//app.get('/', (req, res) => {
//  res.send('Hello World!')
//})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
