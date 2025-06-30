const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/MissingMeowDB");

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