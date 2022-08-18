import express from 'express'

const router = express.Router();

function isAuthenticated (req, res, next) {
  if (req.user) {
    next()
    return;
  }

  res.status(401).send('Auth required')
}

router.get('/user', isAuthenticated, (req, res) => {
  res.json({ user: req.user })
})

router.get('/logout', isAuthenticated, (req, res) => {
  req.logout(() => {})
  res.redirect('/')
})

export {
  router
}
