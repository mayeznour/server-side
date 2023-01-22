const mongoose = require('mongoose')
const superAdmin = mongoose.Schema({
    nameSA:{
        type : String,
        required:true
    },
    emailSA :{
        type : String,
        required:true
    },
    passwordSA :{
        type : String,
        required:true
    },
    
})
module.exports = mongoose.model('superAdmin',superAdmin)