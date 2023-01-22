const mongoose = require('mongoose')

var ChatSchema = new mongoose.Schema({
  room: {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'speciality'
  },
  doctorName: {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'doctor',
    default : null
  },
  patientName: {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'patient',
    require : true
  },
  message: {
     type : String
    },
  updated_at:
   { type: Date, 
    default: Date.now },
   status : {
    type : Boolean ,
    default : false
  }
});

module.exports = mongoose.model('Chat', ChatSchema);
