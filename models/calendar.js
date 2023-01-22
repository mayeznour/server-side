const mongoose = require('mongoose')
const calendar = mongoose.Schema({
   
    doctorID:{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'doctor',
        required:true
    },
    patientID:{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'patient',
        
    },
    date:{
        type : Date,
        required:true
    },
    status:{
        type : Boolean,
        default: false
    },
    paye:{
        type : String
      
    },
    information :  
        {        
            souci: {
            type: String
            },
            medicaments : {
            type: String

            },
            maladies : {
                type: String

            }
        }
    
        

    
    
})
module.exports = mongoose.model('calendar', calendar)