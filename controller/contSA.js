const bcrypt = require('bcrypt');
const SuperAdmin = require('../models/superAdmin')
var jwt = require ('jsonwebtoken')

signinSA = function  (req, res, next) {
    SuperAdmin.find({emailSA : req.body.emailSA}).
    then(superAdmin=>{
      if(superAdmin.length >=1){
      const token = jwt.sign({_id:superAdmin._id},'secret',
        { expiresIn: 60},)
      bcrypt.compare(req.body.passwordSA , superAdmin[0].passwordSA)
        .then(resault=>{
          if(resault){
            res.status(200).json({
              massage:"welcome",
              token})
            }
          else{
            res.status(404).send(["worng password"])

          }
      }).catch(err=>{
        res.status(404).json({ 
          massage :err 
  
      })})
  
        }else{
          res.status(404).send(["wrong super admin email"])
        }
      })
      .catch(err=>{
        res.status(404).json({
          massage :err 
        })
      
      })

    }
addSA= function(req, res, next) {
    bcrypt.hash(req.body.passwordSA, 10 ,(err,hash)=>{
      if(err){
        res.status(404).json({
          massage : err
        })
      }else{
        const superAdmin = new SuperAdmin ({
          nameSA :req.body.nameSA ,
          emailSA : req.body.emailSA ,
          passwordSA: hash
        
        })
        superAdmin.save().
        then(resalt=>{
          console.log(superAdmin)
          res.status(200).json({
            massage : 'superadmin already created'
          })
          
        }).
        catch(err=>{
          res.status(404).json({
            massage : err
          })
        })
      }
  })} ;
updateSA = (req,res,next)=>{
    bcrypt.hash(req.body.passwordSA,10).
    then(hash=>{
      const superAdmin= {
        nameSA: req.body.nameSA,
        emailSA: req.body.emailSA,
        passwordSA : hash
      }
      SuperAdmin.findOneAndUpdate({_id : req.params.id},{$set : superAdmin}).
      then(resault=>{
        if(resault){
        console.log(resault)
        res.status(202).json({
          massage: 'super admin  already apdated'
  
        })}else{
          res.status(404).json({
            massage: 'user not found'
  
        })}
      }).catch(err=>{
        res.status(404).json({
          massage :err 
        })
      })
    }).catch(err=>{
      res.status(404).json({
        massage :err 
      })
    
   
  })}
  deleteSA=(req , res,next)=>{
    SuperAdmin.deleteOne({_id : req.params.id}).
    then(resualt =>{
      if (resualt) {
        res.status(200).json({
          massage : 'super admin deleted'
        })
        
      } else {
        res.status(404).json({
          massage : 'super admin not found'
        })
        
      }
      
    }).
    catch(err => {
      res.status(404).json({
        massage: err
      })
    }) }

  getSA=(req,res,next)=>{
      SuperAdmin.find()
      .then(resultat=>{
          res.status(200).json(
              resultat
      )})
      .catch(err=>{
          res.status(404).json({
          massage :err 
  
      })})}


  async function verifyToken(req, res, next) {
    try {
      if (!req.headers.authorization) {
        return res.status(401).send('Unauhtorized Request');
      }
      let token = req.headers.authorization.split(' ')[1];
      if (token === 'null') {
        return res.status(401).send('Unauhtorized Request');
      }
  
      const payload = await jwt.verify(token, 'secretkey');
      if (!payload) {
        return res.status(401).send('Unauhtorized Request');
      }
      req.userId = payload._id;
      next();
    } catch(e) {
      //console.log(e)
      return res.status(401).send('Unauhtorized Request');
    }
  }
    
module.exports={
    signinSA : signinSA,
    addSA : addSA,
    updateSA : updateSA,
    deleteSA : deleteSA,
    getSA : getSA
}