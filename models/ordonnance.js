const mongoose = require('mongoose')
const ordonnance = mongoose.Schema({
   
    doctorID:{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'doctor',
        required:true
    },
    patientID:{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'patient',
        required:true
        
    },
    information:{
        type : String,
        required:true


    },
    date:{
        type : Date,
        default: Date.now 
    },  
})
module.exports = mongoose.model('ordonnance', ordonnance)