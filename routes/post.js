const mongoose = require("mongoose");



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