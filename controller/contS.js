const speciality = require('../models/speciality')
const Speciality = require('../models/speciality')

addS= function(req, res, next) {
  console.log(req.body.speciality )
  console.log(req.body.image )
        const newSpeciality= new Speciality ({
            speciality :req.body.speciality ,
            image : req.body.image
            
        
        })
        newSpeciality.save().
        then(resalt=>{
          res.status(200).json({
            massage : 'Speciality already created'
          })
          
        }).
        catch(err=>{
          res.status(404).json({
            massage : err
          })
        })
      }
getS =(req,res,next)=>{
  Speciality .find()
  .then(resultat=>{
      res.status(200).json(
          resultat
  )})
  .catch(err=>{
      res.status(404).json({
      massage :err 

  })})}
updateS=(req,res,next)=>{
    const speciality= {
      image: req.body.image 
    }   
    Speciality.findOneAndUpdate({_id : req.params.id},{$set : speciality}).
    then(resault=>{
      if(resault){
      console.log(resault)
      res.status(202).json({
        massage: 'speciality  already apdated'

      })}else{
        res.status(404).json({
          massage: 'speciality not found'

      })}
    }).catch(err=>{
      res.status(404).json({
        massage :err 
      })
    })
  
 
}
deleteS = (req, res, next) => {
  Speciality.deleteOne({ _id: req.params.id }).
      then(resualt => {
          if (resualt) {
              res.status(200).json({
                  massage: 'Speciality deleted'
              })

          } else {
              res.status(404).json({
                  massage: 'Speciality not found'
              })

          }

      }).
      catch(err => {
          res.status(404).json({
              massage: err
          })
      })
}
module.exports={
    addS : addS,
    getS : getS,
    updateS : updateS ,
    deleteS : deleteS }
