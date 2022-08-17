import express from 'express'
import passport from 'passport'
import { Strategy as YandexStrategy } from 'passport-yandex'

const { YANDEX_CLIENT_ID, YANDEX_CLIENT_SECRET } = process.env
const tokens = {}

function passportInit() {
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });

  passport.use(new YandexStrategy({
      clientID: YANDEX_CLIENT_ID,
      clientSecret: YANDEX_CLIENT_SECRET,
      callbackURL: "/auth/yandex/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      console.log('YandexStrategy:', { accessToken, refreshToken, profile });
      setInterval(function () {
        return done(null, profile);
      })
    }
  ))
}

const router = express.Router();

router.get('/', (req, res) => {
  console.log('req.user', req.user)
  console.log('req.session', req.session)
  res.json({ user: req.user, session: req.session })
})
router.get('/yandex/callback',
  passport.authenticate('yandex', { failureRedirect: '/login' }),
  function(req, res) {
    console.log('req.user', req.user)
    console.log('req.session', req.session)
    res.redirect('/')
  }
);

export {
  passportInit,
  router
}
