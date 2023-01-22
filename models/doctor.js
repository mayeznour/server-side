const mongoose = require('mongoose')
const calendar = require('./calendar')
const doctor = mongoose.Schema({
    cinD :{
        type: Number,
        required: true
    }, 
    card :{
        type: Number

    },
    picture:{
        type: String
        
    },
    cinP:{
        type: String,
        
    },
    piece:{
        type: String,
        
    },
    fNameD:{
        type : String,
        required:true
    },
    lNameD:{
        type : String,
        required:true
    },
    emailD :{
        type : String,
        required:true
    },
    passwordD :{
        type : String,
        required:true
    },
    specialityD :{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'speciality',
        required:true
    },
    cityD :{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'city',
        required:true
    },
    phoneD :{
        type: Number,
        required:true
    },
    prix :{
        type: Number
    },
    sexeD :{
        type: String,
        required: true
    },
    status:{
        type: Boolean,
        default: false
    },
    languages : {
        type: String

    },
    diplome :{
        type: String

    },
    training:{
        type: String

    },
    Cabinet:{
        type: String

    },
    avis:{
        type: Number,
        default: 0

    },
    calendar:{
        type: Array,
        
    }

    
})
module.exports = mongoose.model('doctor', doctor)