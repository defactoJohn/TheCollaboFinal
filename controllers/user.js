/**
 * Created by opaluwa john on 12/8/2017.
 */

var User = require('../models/User');
const passport = require('passport');
const jwt = require('jsonwebtoken')

exports.postSignup = (req, res,next) => {
    if(req.body.email &&
     req.body.username &&
      req.body.password )
  {
    var newUser = new User({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    });
  }

  // use model to create insert data into the db
  User.addUser(newUser, (err, user) =>{
    if(err){
      res.json({sucess: false, message: 'failed to register User'});
    }else{
      res.json({sucess: true, message: 'User Registered'});
    }
  })
 /* User.create(userData, (err, user) =>{
    if(err){
     // console.log('alert error')
      return next(err)
    }else{
      res.send({signup: true})
    }
  })*/
};

exports.postUpdateInfo = (req, res, next) => {
  var updatedUserData = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    language: req.body.language,
    courseofstudies: req.body.courseofstudies,
    degree: req.body.degree
  }

  //use model to update user in the db
  User.findOne({username:'ddn'},(err, doc)=>{
    if(err){
      console.log(err)
    }
    doc.firstname = updatedUserData.firstname;
    doc.lastname = updatedUserData.lastname;
    doc.language =updatedUserData.language;
    doc.courseofstudies =updatedUserData.courseofstudies;
    doc.degree = updatedUserData.degree;
    doc.save((err, doc, numAffected)=>{
      if(err){
        console.log(err)
      }
      res.json({sucess: false, message: 'failed to register User'});
    });
  });
}

exports.postAuthenticate = (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  User.getUserByUsername(username, (err, user) => {
    if(err){
      throw error;
    }
    if(!user){
      return res.json({success: false, message: 'user not found'});
    }
      User.comparePassword(password, user.password, (err, isMatch) => {
        if(err) throw err;
        if(isMatch){
          var token = jwt.sign({user}, process.env.JWT_SECRET, {
            expiresIn: 604800 //a week
          });

          res.json({
            success: true,
            token: 'bearer ' + token,
            user: {
              id: user.id,
              username: user.username,
              email: user.email
            }
          })
        }else {
          return res.json({success: false, msg: 'Wrong'});
        }
      })
  })

  /*User.findOne({email: req.body.email, password: req.body.password}, (err, user) => {
    if(err){
      res.json({
        type: false,
        data: "Error occured: " + err
      })
    }else if(user) {
      res.json({
        type: true,
        data: user,
        token: user.token
      })
    } else{
      res.json({
        type: false,
        data: "Incorrect email/password"
      })
    }
  })*/
}

exports.postSignIn = (req, res) => {
  User.findOne({email: req.body.email, password: req.body.password}, (err, user) => {
    if(err){
      res.json({
        type: false,
        data: "Error occured: " + err
      })
    } else if(user){
      res.json({
        type: false,
        data: "User already exists!"
      })
    } else {
      var userModel = new User;
      userModel.email = req.body.email,
      userModel.password = req.body.password
      userModel.save((err, user) => {
        user.token = jwt.sign(user, process.env.JWT_SECRET);
        user.save((err, user1) => {
          res.json({
            type: true,
            data: user1,
            token: user1.token
          })
        })
      })
    }
  })
}

exports.getMe = (req, res) => {
  //User.findOne({token: req.token}, (err, user) => {
    console.log('I am aI am here')
    /*if(err){
      res.json({
        type: false,
        data: "Error occured: " + err
      })
    } else {*/
      res.json({
        user: req.user
      })
   // }
  // }   )
}
