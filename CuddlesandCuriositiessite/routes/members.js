var express = require('express');
var router = express.Router();

const bcryptjs = require('bcryptjs');
const saltRounds = 10;

const members = require('../models/Members.model')
const { isLoggedIn, isLoggedOut, isOwner, isNotOwner} = require('../middleware/route-guard') // calling in middleware
const upload = require('./');
const fileUploader = require('../config-cloudinary/cloudinary.config');
const NewAmigurumi = require('../models/Pattern.model');
const NewClothing = require ('../models/Clothing.model');
const mongoose = require ('mongoose');
const CreatePost = require('../models/CreatePost.model');


// SIGN UP ROUTES 
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


// LOGIN IN ROUTES
router.get('/login', (req, res, next) => {
  res.render('auth/login.hbs')
});

//VERIFICATION OF USER CREDENTIALS
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
        res.render('/members/member-profile');
      } else {
        res.render('auth/login', { errorMessage: 'Incorrect password.' });
      }
    })
    .catch(error => next(error));
});


router.get('/profile', isLoggedIn, (req, res, next) => {
    const user = req.session.user
    console.log('SESSION =====> ', req.session);
    res.render('members/member-profile.hbs', {user})
    });
    

                
// MEMBER PROFILE ROUTES
router.get('/member-profile', isLoggedIn, (req, res, next) => {
const members = req.session.user
        CreatePost.find({owner: req.session.user._id})
.then((foundPost) => {
    console.log(foundPost, "found the post")
    // console.log(createduploadImg)
    res.render('members/member-profile.hbs', {foundPost})
})
// console.log("this is the user", user)
// res.render('members/member-profile.hbs', user)
});
// Member upload routes 
router.post('/member-profile', isLoggedIn, fileUploader.single('imageUrl'), (req, res, next) => {
    console.log({...req.body}, "praying")
   const { name, description, } = req.body
     
   return CreatePost.create({
    name,
    description,
    owner: req.session.user._id,
    imageUrl: req.file.path
})
    .then((createduploadImg) => {
        res.redirect('/members/member-profile')
        // return CreatePost.find({owner: req.session.user._id})
        // .then((FoundPost) => {
        //     console.log(FoundPost,"found post")
        //     console.log(createduploadImg)
        //     res.render('members/member-profile.hbs')
        // })
    })
    .catch((err) => {
    console.log(err)
    })    
})

//DELETE POST ON MEMBER PROFILE
router.get('/delete-resource/:id', isOwner, deleteResource);
function deleteResource(req, res, next){
    Resource.findByIdAndDelete(req.params.id)
    .then((confirmation) => {
        console.log(confirmation)
        res.redirect('/members/member-profile')
    })
    .catch((err) => {
        console.log(err)
    })
}

//LOG OUT ROUTES
router.get('/logout', isLoggedIn,(req, res, next) => {
req.session.destroy(err => {
if (err) next(err);
res.redirect('/');
});


});


//**To display a pdf file it will have to be modified
// {/* <object data="/pdf/file1.pdf" type="img" width="100%" height="100%">
//   <iframe src="/pdf/file1.pdf" width="100%" height="100%" style="border: none;">
//    It looks like the browser you are using does not support PDFs. However, you can still download my resume to view it: <a href="/pdf/file1.pdf">Download PDF</a>
//   </iframe>
// </object>  */}


module.exports = router;
