import express from 'express'

const router = express.Router();

function isAuthenticated (req, res, next) {
  if (req.user) {
    next()
    return;
  }
  next('route')
}

router.get('/user', isAuthenticated, (req, res) => {
  res.json({ user: req.user })
})

export {
  router
}
