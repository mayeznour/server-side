const mongoose = require('mongoose')
const patient = mongoose.Schema({
   
    fNameP:{
        type : String,
        required:true
    },
    lNameP:{
        type : String,
        required:true
    },
    emailP :{
        type : String,
        required:true
    },
    passwordP:{
        type : String,
        required:true
    },
    cityP :{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'city',
        required:true
    },
    phoneP :{
        type: Number,
        required:true
    },
    sexeP:{
        type: String,
        required:true
    },
    age :{
        type: Number
    },
    taille :{
        type: Number
    },
    poids:{
        type: Number
    },
    information : {
        type: String 
    },
    
    
})
module.exports = mongoose.model('patient', patient)