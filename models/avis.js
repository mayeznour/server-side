const mongoose = require('mongoose')
const avis = mongoose.Schema({
   
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
    nbAvis:{
        type : Number,
        required:true
    },
    
})
module.exports = mongoose.model('avis', avis)