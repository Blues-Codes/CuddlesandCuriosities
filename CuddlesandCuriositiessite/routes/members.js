var express = require('express');
var router = express.Router();

const bcryptjs = require('bcryptjs');
const saltRounds = 10;

const members = require('../models/Members.model')
const {isLoggedIn, isLoggedOut, isOwner} = require('../middleware/route-guard') // calling in middleware
const upload = require('./');
const fileUploader = require('../config-cloudinary/cloudinary.config');
const Pattern = require('../models/Pattern.model');
const mongoose = require ('mongoose');
const CreatePost = require('../models/CreatePost.model');


// SIGN UP ROUTES 
router.get('/signup', (req, res, next) => {
    res.render('auth/signup.hbs')
})

router.post('/signup',(req,res, next ) => { 
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
        console.log("we're here")
        req.session.user = user
        res.render('members/member-profile.hbs', {user});
      } else {
        res.render('auth/login', { errorMessage: 'Incorrect password.' });
      }
    })
    .catch(error => next(error));
});

//CREATE PATTERN ROUTES
router.get('/createpattern',(req, res, next) => {
    res.render('members/createpattern.hbs');
  });
  
  router.post('/createpattern',(req, res, next) => {
  
      const { name, type, imageUrl, yarnType, creator, itemsNeeded, } = req.body
  
      Pattern.create({
          name,
          type,
          creator: req.session.user._id,
          yarnType,
          stitches,
          itemsNeeded,
          imageUrl: req.file.path
      })
      .then((createdPattern) => {
          console.log(createdPattern)
          res.redirect('/members/allpatterns')
      })
      .catch((err) => {
          console.log(err)
      })
  
  });


  router.get('/findpatterns/:id', (req, res, next) => {

    Pattern.findById(req.params.id)
     .then((foundPattern) => {
        res.render('members/patterndetails.hbs', foundPattern)
    })
    .catch((err) => {
        console.log(err)
    })

})
    

                
// MEMBER PROFILE ROUTES
router.get('/member-profile', isLoggedIn, (req, res, next) => {
const user = req.session.user
        CreatePost.find({owner: req.session.user._id})
.then((foundPost) => {
    console.log(foundPost, "found the post")
    res.render('members/member-profile.hbs', {foundPost, user})
})
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
router.post('/deletepost/:id', isOwner,(req,res, next) => {
    return CreatePost.deleteOne({_id:req.params.id}) .then(()=>{
        res.redirect('/members/member-profile')
    })
    .catch((err) => {
    console.log(err)
    })
})

//LOG OUT ROUTES
router.get('/logout', isLoggedIn,(req, res, next) => {
req.session.destroy(err => {
if (err) next(err);
res.redirect('/');
});
});

//FINDING PATTERNS ROUTES

router.get('/findpatterns', (req, res, next) => {
    res.render('members/findpatterns.hbs')
});

router.post("/findpatterns", (req, res, next) => {
      
    const { level, type, yarnType } = req.body;
    if (level && type && yarnType) {
      Pattern.find({
        level,
        type,
        yarnType,
      })
        .then((foundPattern) => {
          res.render("members/foundPattern.hbs", { foundPattern });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      let body = req.body
      Object.keys(body).filter(key => !body[key]).forEach(key => delete body[key]);
        
      Pattern.find(body)
        .then((foundPattern) => {
          res.render("members/foundPattern.hbs", { foundPattern });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
router.get('/allpatterns', (req, res, next) =>{
    console.log('here i am')
    Pattern.find()
    .then((patterns) =>{
        res.render('members/allpatterns.hbs', {patterns})

    })
    .catch((err) =>{
        console.log(err)
    })
});


   


//**To display a pdf file it will have to be modified
// {/* <object data="/pdf/file1.pdf" type="img" width="100%" height="100%">
//   <iframe src="/pdf/file1.pdf" width="100%" height="100%" style="border: none;">
//    It looks like the browser you are using does not support PDFs. However, you can still download my resume to view it: <a href="/pdf/file1.pdf">Download PDF</a>
//   </iframe>
// </object>  */}


module.exports = router;
