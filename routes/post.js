const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));




const postschema = mongoose.Schema({
    city:{
        type:String
    },
    discription:{
        type:String
    },
    image:{
        type:String
    },
    PostedAt:{
        type:Date,
        default:Date.now
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
});

module.exports = mongoose.model("Post",postschema);