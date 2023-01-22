const Ordonnance = require('../models/ordonnance')

addO = function (req, res, next) {
    console.log(req.body.doctorID , req.body.patientID ,req.body.information)
    const ordonnance = new Ordonnance({
        doctorID : req.body.doctorID,
        patientID : req.body.patientID,
        information : req.body.information})
        ordonnance.save().
        then(resault=>{
                console.log(resault)
                res.status(200).json({
                massage : 'ordonnance Ajoutee'}) })
        .catch(err=>{
                res.status(404).json({
                massage : err})})
}
getO =(req,res,next)=>{
    Ordonnance.find({patientID : req.params.id }).populate('doctorID','fNameD , lNameD , speciality')
   .then(resultat=>{ 
     res.status(200).json(
        resultat)})
     
   .catch(err=>{
       res.status(404).json({
       massage :err 
})})}



module.exports = {
    addO : addO ,
    getO : getO
 }