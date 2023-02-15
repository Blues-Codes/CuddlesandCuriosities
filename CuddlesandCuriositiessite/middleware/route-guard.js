// middleware/route-guard.js

// checks if the user is logged in when trying to access a specific page
const isLoggedIn = (req, res, next) => {
    console.log('this is the session', req.session)
    if (!req.session.user) {
      return res.redirect('/members/login');
    }
    next();
  };
  
  // if an already logged in user tries to access the login page it
  // redirects the user to the home page
  const isLoggedOut = (req, res, next) => {
    if (req.session.user) {
      return res.redirect('/');
    }
    next();
  };

  const isOwner = (req, res, next) => {

    Resource.findById(req.params.id)
    .populate('owner')
    .then((foundResource) => {
        if (!req.session.user || foundResource.creator._id.toString() !== req.session.user._id) {
            res.render('index.hbs', {errorMessage: "You are not authorized."})
        } else {
            next()
        }
    })
    .catch((err) => {
        console.log(err)
    })

}
const isNotOwner = (req, res, next) => {

    Resource.findById(req.params.id)
    .populate('owner')
    .then((foundResource) => {
        if (!req.session.user || foundResource.creator._id.toString() === req.session.user._id) {
            res.render('index.hbs')
        } else {
            next()
        }
    })
    .catch((err) => {
        console.log(err)
    })

}
  module.exports = {
    isLoggedIn,
    isLoggedOut,
    isOwner,
    isNotOwner
  };