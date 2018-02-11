var express = require('express');
var router = express.Router();
//including Passport
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//initialising 'User' Model
var User = require('../models/user');
//register
router.get('/register', function(req, res){
  res.render('register');
});

//login
router.get('/login', function(req, res){
  res.render('login');
});

//register a new User
router.post('/register', function(req, res){
  var name = req.body.name;
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  var password2 = req.body.password2;

  //validation
  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  var errors = req.validationErrors();

  if(errors){
    res.render('register',{
      errors:errors
    });
  }else{
    var newUser = new User({
      name: name,
      email: email,
      username:username,
      password: password
    });

    User.createUser(newUser, function(err, user){
      if(err) throw err;
      console.log(user);
    });

    req.flash('success_msg', 'You are Registered to Shop.com and enjoy your stay!!');

    res.redirect('/users/login');
  }
});
//authentiating using passport
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.getUserByUsername(username, function(err, user){
      if(err) throw err;

      if(!user){
        return done(null, false, {message:'Unknown User!!'});
        console.log('aaaaaa');
      }

        User.comparePassword(password, user.password, function(err, isMatch){
          if(err) throw err;

          if(isMatch){
            return done(null, user);
          }else{
            return done(null, false, {message: 'Invalid Password!!'});
          }
        });
    });
  }));


  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
      done(err, user);
    });
  });


//login
router.post('/login',
  passport.authenticate('local', {successRedirect:'/', faliureRedirect:'/users/login', faliureFlash: true }),
  function(req, res) {
        res.redirect('/');
      });

  router.get('/logout', function(req, res){
    req.logout();

    req.flash('success_msg', 'You are logged out');

    res.redirect('/users/login');
  });

module.exports = router;
