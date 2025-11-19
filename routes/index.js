var express = require('express');
const passport = require('passport');
var router = express.Router();
const localStrategy = require("passport-local");
const userModel = require("./users")
const postModel = require("./post")
const upload = require('./multer');
passport.use(new localStrategy(userModel.authenticate()));


//redister route
//here we reach from action attribute of form
router.post('/register',function(req,res){
  let userdata = new userModel({
    username:req.body.username,
    email:req.body.email
  });
  userModel.register(userdata,req.body.password)
  .then(function(registereduser){
    passport.authenticate("local")(req,res,function(){
      res.redirect('/home')
    })
  })
});
//tailwindcss

router.post("/login",passport.authenticate("local",{
  successRedirect:"/home",
  failureRedirect:"/"
}),function(req,res){})

//midalware to check the user is loggedin or not
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}

router.get('/logout',function(req,res,next){
  req.logout(function(err){
    if(err){ return next(err);}
    res.redirect('/')
  })
})

router.post('/upload', isLoggedIn,upload.single('file'),async (req,res)=>{
  if(!req.file){
    return res.status(400).send('no file were uploaded');
  }
  const user =  await userModel.findOne({username: req.session.passport.user }); // Find the user by username
  const post = await postModel.create({
      city:req.body.city,
      discription:req.body.disc,
      image:req.file.filename, // Use the filename from the uploaded file
      user: user._id
  });

  user.posts.push(post._id); // Add the post ID to the user's posts array
 await user.save()
  res.send('file uploaded successfully');
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register');
});

router.get('/login',function(req,res){
  res.render("login")
})

//home route
router.get('/home',isLoggedIn,function(req,res){
  res.render("home");
});

//// router.get('/register',function(req,res){
//   res.render("register");
// });

// post route

router.get('/post',isLoggedIn, function(req,res){
  res.render('post');
});

router.get('/adopt',isLoggedIn,async function(req,res){
  const users = await userModel.find().populate('posts');
  res.render('adopt',{users: users});
});

// router.get('/about',function(req,res){
//   res.render('about');
// });

router.get('/about',function(req,res){
  res.render('map');
})

module.exports = router;
