var Chat = require('../models/Chat.js');

/*get room chats "speciality and patient "*/
getchat = (req,res,next)=>{
    Chat.find({room: req.params.room , patientName: req.params.patientName}).populate('patientName','fNameP , lNameP' ).populate('room', 'speciality').populate('doctorName','fNameD , lNameD')
    .then(resultat=>{
        res.status(200).json(
            resultat
    )})
    .catch(err=>{
        res.status(404).json({
        massage :err 

    })})}
/* get room chats "speciality  */
getchatIDR = (req,res,next)=>{
    Chat.find({room: req.params.room }).populate('room', 'speciality').populate('patientName','fNameP , lNameP').populate('doctorName','fNameD , lNameD')
    .then(resultat=>{
        res.status(200).json(
            resultat
    )})
    .catch(err=>{
        res.status(404).json({
        massage :err 

    })})}

/* get id patient */
getchatID = (req,res,next)=>{
    Chat.find({ patientName: req.params.patientName}).populate('patientName','fNameP , lNameP').populate('doctorName','fNameD , lNameD')
    .then(resultat=>{
        res.status(200).json(
            resultat
    )})
    .catch(err=>{
        res.status(404).json({
        massage :err 

    })})}
/* chat  post doctor */
messageD = function(req, res, next) {
         const chat = new Chat({
            room : req.body.room,
            patientName : req.body.patientName,
            doctorName : req.body.doctorName,
            message: req.body.message ,
                })
        chat.save().
        then(resalt=>{
             console.log(chat)
             res.status(200).json(chat) })
        .catch(err=>{
             res.status(404).json({
             massage : err})})}
/* chat  post patient*/
messageP = function(req, res, next) {
    const chat = new Chat({
        room : req.body.room,
        patientName : req.body.patientName,
        doctorName : req.body.doctorName,
        message: req.body.message ,
            })
        console.log(chat)
    chat.save().
    then(resalt=>{
         console.log(chat)
         res.status(200).json(chat) })
    .catch(err=>{
        console.log(chat)
         res.status(404).json({
             
         massage : err})})}


/******** UPDATE CHAT *****/
chatupdate=function(req, res, next) {
    const chat= {
        status: req.body.status,
      }
      Chat.findOneAndUpdate({_id : req.params.id},{$set : chat}).
      then(resault=>{
        if(resault){
        console.log(resault)
        res.status(202).json({
          massage: 'msg vu '
  
        })}
      }).catch(err=>{
        res.status(404).json({
          massage :err 
        })
      })
    
};

/* DELETE CHAT 
Chatdelete =function(req, res, next) {
  Chat.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
};*/

module.exports = {
    /*
    chatupdate : chatupdate,
    Chatdelete : Chatdelete*/
    getchat : getchat,
    messageD : messageD,
    messageP : messageP,
    getchatID : getchatID,
    getchatIDR : getchatIDR
}; 