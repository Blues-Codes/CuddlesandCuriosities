var express = require('express');
var router = express.Router();

const bcryptjs = require('bcryptjs');
const saltRounds = 10;

const members = require('../models/Members.model')
const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard.js'); // calling in middleware


router.get('/signup', (req, res, next) => {
    res.render('auth/signup.hbs')
})

router.post('/signup', isLoggedOut,(req,res, next ) => { 
  console.log('The form data: ', req.body);

  const { username, email, password } = req.body;
  
  if (!username || !password || !email) {
    res.render('auth/signup', { errorMessage: 'All fields are mandatory. Please provide your username, email and password.' });
    return;
  } 
 
  bcryptjs
    .genSalt(saltRounds)
    .then(salt => {
      return bcryptjs.hash(password, salt)
    })
    .then((hashedPassword) => {
      return members.create({
      
            username: req.body.username,
            password: hashedPassword
          });
        })
        .then(userFromDB => {
          console.log('Newly created user is: ', userFromDB);
          req.session.user = userFromDB;
          res.redirect('/members/member-profile')
        })
    
        .catch((error) => {
          if (error instanceof mongoose.Error.ValidationError) {
          res.status(500).render('auth/signup', { errorMessage: error.message });
        } else if (error.code === 11000) {
          res.status(500).render('auth/signup', {
              errorMessage: 'Username and email need to be unique. Either username or email is already used.'
          });
        } else {
          next(error);
        }
          });
    });
// Login 
router.get('/login', (req, res, next) => {
  res.render('auth/login.hbs')
});

//verification of user credentials
router.post('/login', (req, res, next) => {
  const { username, password } = req.body;
 
  if (!username || !password) {
    res.render('auth/login.hbs', {
      errorMessage: 'Please enter both, username and password to login.'
    });
    return;
  }
 
  members.findOne({ username })
    .then(user => {
      if (!user) {
        res.render('auth/login', { errorMessage: 'Username is not registered. Try with other email.' });
        return;
      } else if (bcryptjs.compareSync(password, user.password)) {
        req.session.user = user
        res.redirect('/members/member-profile');
      } else {
        res.render('auth/login', { errorMessage: 'Incorrect password.' });
      }
    })
    .catch(error => next(error));
});

router.get('/member-profile', isLoggedIn, (req, res, next) => {
const user = req.session.user
console.log("this is the user", user)
res.render('members/member-profile.hbs', user)
});

router.get('/logout', isLoggedIn,(req, res, next) => {
req.session.destroy(err => {
if (err) next(err);
res.redirect('/');
});

// //main
// router.get('/main', isLoggedIn, (req, res, next) => {
//   console.log('trying to get back to main',req.body)
//   res.render ('users/main.hbs')
// });

// //private
// router.get('/private',isLoggedIn,(req, res, next) => {
//   res.render('users/private.hbs')
// });

});

// when using redirect that's when you add the / in front. When sending to a page no / 


module.exports = router;
