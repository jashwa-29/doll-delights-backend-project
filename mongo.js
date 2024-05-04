const mongoose = require('mongoose');
const mongodburl = "mongodb+srv://jashwa-29:fXxQeI3RwO487uU5@cluster0.0tbvc4t.mongodb.net/doll-delights-account-details" ;
mongoose.connect(mongodburl,{}).then(()=>{
    console.log("database connected");
})

let mongoosefields = new mongoose.Schema({
    email:{
        type:String ,
        required:true
    },
    password:{
        type:String ,
        required:true
    }
})

let mongodbfieldexports = mongoose.model("Jashwaemailcollection",mongoosefields)
module.exports = mongodbfieldexports
