const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/Jashwaproemailsave",{}).then(()=>{
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