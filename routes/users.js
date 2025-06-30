const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/MissingMeowDB");

const userschema = mongoose.Schema({
  username:{
    type: String
  },
  //not needed cos of plm
  // password:{
  //   type:String
  // },
  email:{
    type:String
  },
  posts:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Post"
  }]
});

userschema.plugin(plm);

module.exports = mongoose.model("User",userschema);