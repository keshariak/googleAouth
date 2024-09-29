var express = require('express');
var router = express.Router();
require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oidc');
var userModel = require('../routes/users')

passport.use(new GoogleStrategy({
  clientID: process.env['GOOGLE_CLIENT_ID'],
  clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
  callbackURL: '/oauth2/redirect/google',
  scope: [ 'profile' ,'email']
}, async function verify(issuer, profile, cb) {
  let user = await userModel.findOne({email:profile.emails[0].value})
  if(user){
    return cb(null , user);
  }
  var newUser = await userModel.create({
    username:profile.displayName, email:profile.emails[0].value
  })
  

}));
/* GET home page. */
router.get('/',isloggedIn, function(req, res, next) {
  
  res.render('index', { title: 'Express' });
});


router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/login/federated/google', passport.authenticate('google'));

router.get('/oauth2/redirect/google', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/login'
}));
function isloggedIn(req, res, next) {
if (req.isAuthenticated()) return next();
else res.redirect('/login');
}
module.exports = router;
