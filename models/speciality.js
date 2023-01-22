const mongoose = require('mongoose')
const speciality = mongoose.Schema({
    image : {
        type:String,
       
    },
    speciality:{
        type : String,
        required:true
    }
    
})
module.exports = mongoose.model('speciality', speciality)