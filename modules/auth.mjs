import express from 'express'
import passport from 'passport'
import { Strategy as YandexStrategy } from 'passport-yandex'
import { clientID, clientSecret } from '../config.mjs'

const tokens = {}

function passportInit() {
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });

  passport.use(new YandexStrategy({
      clientID,
      clientSecret,
      callbackURL: "/auth/yandex/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      // asynchronous verification, for effect...
      process.nextTick(function () {

        // To keep the example simple, the user's Yandex profile is returned
        // to represent the logged-in user.  In a typical application, you would
        // want to associate the Yandex account with a user record in your
        // database, and return that user instead.
        return done(null, profile);
      });
    }
  ))
}

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ user: req.user, session: req.session })
})
router.get('/yandex/callback',
  passport.authenticate('yandex', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/')
  }
)
router.get('/yandex',
  passport.authenticate('yandex'),
  function(req, res){
    // The request will be redirected to Yandex for authentication, so this
    // function will not be called.
  })

export {
  passportInit,
  router
}
