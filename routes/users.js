const mongoose = require("mongoose");
require("dotenv").config();
const plm = require("passport-local-mongoose");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));




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