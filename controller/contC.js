const Calendar = require('../models/calendar')
const today = new Date()
addCl = function(req, res, next) {
  console.log(req.body.date)
    const x=today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDay()+7)
    console.log(new Date(req.body.date))
    console.log(new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000))
    if( new Date(req.body.date) > today ){
     if(new Date(req.body.date) < new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)) {
        console.log(req.body.date)
        Calendar.find({dcotorID : req.body.dcotorID , date : req.body.date}).
        then(date=>{
            if(date.length < 1){
                    const calendar = new Calendar({
                    doctorID : req.body.doctorID,
                    date :new Date(req.body.date),})
                    calendar.save().
                    then(resalt=>{
                            console.log(calendar)
                            res.status(200).json({
                            massage : 'Date Ajoutee'}) })
                    .catch(err=>{
                            res.status(404).json({
                            massage : err})})}
                            
            else{
                res.status(404).send(['date deja choisie']);

            }}).catch(err=>{
                res.status(404).json({
                massage :err 
                })
            })
        }else{
            res.status(404).send(['date plus loin']);

        }}
    else{
        res.status(404).send(['date deja ecoulée']);

    }}
    
 getCID =(req,res,next)=>{
         Calendar.find({doctorID : req.params.id , patientID : undefined})
        .then(resultat=>{   
          var y =[]
          for(let x=0;x<resultat.length;x++){
            if(resultat[x].date > today){
              y.push(resultat[x])
                      
            }
  
          }
          res.status(200).json(
          y)})
          
        .catch(err=>{
            res.status(404).json({
            massage :err 
  })})}
  getCV =(req,res,next)=>{
    Calendar.find({patientID : undefined})
   .then(resultat=>{ 
        var y =[]
        console.log(new Date(today.getTime()+1* 60 * 60 *1000 ))
        for(let x=0;x<resultat.length;x++){
          console.log(new Date(today.getTime()+1* 60 * 60 *1000 ))
           if(resultat[x].date > new Date(today.getTime()+1* 60 * 60 *1000 )){
             z=resultat[x].date.toString()
             console.log(z)
             y.push(resultat[x])
             
          }

        } 
        res.status(200).json(
        y)})
     
   .catch(err=>{
       res.status(404).json({
       massage :err 
})})}
getRendez=(req,res,next)=>{
  Calendar.find({doctorID : req.params.id }).populate('patientID','fNameP , lNameP , age , emailP , sexeP , phoneP')
 .then(resultat=>{ 
     var y =[]
     for(let x=0;x<resultat.length;x++){ 
         if(resultat[x].patientID==undefined){
        }else{
          if(resultat[x].status==true && resultat[x].date > new Date(today.getTime()+1* 60 * 60 *1000 )){
            y.push(resultat[x])
        } }}
        res.status(202).json(
            y
        ) })
             
  .catch(err=>{
      res.status(404).json({
      massage :err })})
   
 .catch(err=>{
     res.status(404).json({
     massage :err 
 })})}
  getRendezValide=(req,res,next)=>{
    Calendar.find({doctorID : req.params.id }).populate('patientID','fNameP , lNameP , age , emailP , sexeP , phoneP')
   .then(resultat=>{ 
     
       var y =[]
       for(let x=0;x<resultat.length;x++){
       
           
           if(resultat[x].patientID==undefined){
               
               
           }else{
            if(resultat[x].status==false ){
                y.push(resultat[x])
            }
            
          }}
          res.status(202).json(
              y
          )
        })
               
    .catch(err=>{
        res.status(404).json({
        massage :err 
       
      })})
     
   .catch(err=>{
       res.status(404).json({
       massage :err 
   })})}

 rendez_vous= (req,res,next)=>{
    console.log(req.body.patientID)
      const date= {
        patientID : req.body.patientID,
        information :{medicaments:req.body.medicaments ,
                      souci :req.body.souci,
                      maladies : req.body.maladies}         
     }
     console.log(date)
   
      Calendar.findOneAndUpdate({_id: req.params.id},{$set : date}).
      then(resault=>{
        if(resault){
        console.log(resault)
        res.status(202).json({
          massage: ' votre demandee de  rendez-vous est  passer '
  
        })}
      }).catch(err=>{
        res.status(404).json({
          massage :err 
        })
      })
}
valide_RendezVous = (req,res,next)=>{
   
    const date= {
      status : req.body.status,
   }
    Calendar.findOneAndUpdate({_id: req.params.id},{$set : date}).
    then(resault=>{
      if(resault){
      console.log(resault)
      res.status(202).json({
        massage: ' votre demandee est validee '

      })}
    }).catch(err=>{
      res.status(404).json({
        massage :err 
      })
    })
}
deleteDate=(req , res,next)=>{
    Calendar.deleteOne({_id : req.params.id}).
    then(resualt =>{
      if (resualt) {
        res.status(200).json({
          massage : ' date deleted'
        })
        
      } else {
        res.status(404).json({
          massage : ' date not found'
        })
        
      }
      
    }).
    catch(err => {
      res.status(404).json({
        massage: err
      })
    }) }


getRendezPatient=(req,res,next)=>{
      Calendar.find({patientID : req.params.id }).populate('patientID','fNameP , lNameP ').populate('doctorID','fNameD , lNameD , phoneD , card')
     .then(resultat=>{ 
            var y =[]
            for(let x=0;x<resultat.length;x++){ 
              
             if(resultat[x].status==true && resultat[x].paye==undefined && resultat[x].date > today){
                  y.push(resultat[x])
              } }
              res.status(202).json(
                  y ) })    
      .catch(err=>{
          res.status(404).json({
          massage :err })})}
  getRendezPatientTD=(req,res,next)=>{
            Calendar.find({patientID : req.params.id }).populate('patientID','fNameP , lNameP ').populate('doctorID','fNameD , lNameD , phoneD , card ')
           .then(resultat=>{ 
                  var y =[]
                  for(let x=0;x<resultat.length;x++){ 
                  
                    date= new Date(new Date().getTime() +  0*24 +1 * 60  * 60 * 1000)
                    rv=resultat[x].date
                    rv5=new Date(resultat[x].date.getTime() +  0*24 +1 * 60 - 20 * 60 * 1000)
                  
                   if(resultat[x].status==true && rv5<date && date<=rv){
                        y.push(resultat[x])
                    } }
                    res.status(202).json(
                        y )  })   
            .catch(err=>{
                res.status(404).json({
                massage :err })})}



paye =(req, res, next) => {
    console.log(req.file.filename);
    const file = req.file;
    console.log("nour")
    if (!file) {
      const error = new Error('No File')
      error.httpStatusCode = 400
      return next(error)}
      console.log("mayez")
    const payer = {
            paye: "http://localhost:9100/images/"+req.file.filename,
            }
    console.log(payer)
    
   Calendar.findOneAndUpdate({ _id: req.params.id }, { $set: payer }).
                  then(resault => {
                      if (resault) {
                         
                          res.status(202).send(['image apdated']);
          
                      } else {
                          res.status(404).json({
                              massage: 'calender  not found'
          
                          })
                      }
                  }).catch(err => {
                      res.status(404).json({
                          massage: err
                      })
                  })}

module.exports={
    addCl : addCl,
    getCID : getCID,
    rendez_vous : rendez_vous,
    deleteDate :deleteDate,
    getRendezValide : getRendezValide,
    getRendez :getRendez,
    getCV:getCV,
    valide_RendezVous : valide_RendezVous,
    getRendezPatient : getRendezPatient,
    getRendezPatientTD : getRendezPatientTD,
    paye : paye 
}