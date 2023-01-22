const bcrypt = require('bcrypt');
const Patient = require('../models/patient')
var jwt = require ('jsonwebtoken');
const { signinA } = require('./contA');
    addP= function(req, res, next) {
         Patient.find({emailP: req.body.emailP}).
                then(ress=>{
                    if(ress.length < 1){
                        bcrypt.hash(req.body.passwordP, 10 ,(err,hash)=>{
                        if(err){
                            res.status(404).json({
                            massage : err })
                        }else{
                            const newPatient= new Patient({ 
                            fNameP:req.body.fNameP,
                            lNameP:req.body.lNameP,
                            emailP: req.body.emailP,
                            passwordP: hash,
                            cityP: req.body.cityP,
                            phoneP: req.body.phoneP,
                            sexeP: req.body.sexeP,})
                            console.log(newPatient)
                            newPatient.save().
                            then(resalt=>{
                                    res.status(200).json({
                                    massage : 'Patient already created'}) })
                            .catch(err=>{
                                    res.status(404).json({
                                    massage : err})})
                            }
                    })}
                    else{
                        res.status(404).send(['Email déja existe.']);
                        console.log('Duplicate email adrress found')
                    }})
                .catch(err=>{
                    res.status(404).json({
                    massage :err  })})}
            
    getP =(req,res,next)=>{
        Patient.find().populate('cityP','city')
        .then(resultat=>{
            res.status(200).json(
            resultat)})
        .catch(err=>{
             res.status(404).json({
            massage :err 
        
            })})}
    getPID =(req,res,next)=>{
            Patient.find({_id : req.params.id}).populate('cityP','city')
            .then(resultat=>{
                res.status(200).json(
                resultat)})
            .catch(err=>{
                res.status(404).json({
                massage :err 
            
                })})}
    deleteP=(req , res,next)=>{
        Patient.deleteOne({_id : req.params.id}).
        then(resualt =>{
        if (resualt) {
            res.status(200).json({
            massage : 'Patient deleted'
            })
            
        } else {
            res.status(404).json({
            massage : 'Patient not found'
            })
            
        }
        
        }).
        catch(err => {
        res.status(404).json({
            massage: err
        })
        }) }   
    updateP = (req,res,next)=>{
        
        if(req.body.passwordP===undefined){ 
             patient= {
                fNameP:req.body.fNameP,
                lNameP:req.body.lNameP,
                emailP: req.body.emailP,
                cityP: req.body.cityP,
                phoneP: req.body.phoneP,
                age:req.body.age,
                taille:req.body.taille,
                poids:req.body.poids,
                information : req.body.information,
               }
               console.log(patient)
        }else{
             bcrypt.hash(req.body.passwordP, 10 ,(err,hash)=>{
                    if(err){
                        res.status(404).json({
                        massage : err })
                    }else{
                    console.log(req.body.information)
                  patient ={
                        fNameP:req.body.fNameP,
                        lNameP:req.body.lNameP,
                        emailP: req.body.emailP,
                        cityP: req.body.cityP,
                        phoneP: req.body.phoneP,
                        passwordP : hash,
                        age:req.body.age,
                        taille:req.body.taille,
                        poids:req.body.poids,
                        information : req.body.information,
                        }}
                        console.log(patient)
                      
                })}
                Patient.findOneAndUpdate({_id : req.params.id},{$set : patient}).
                then(resault=>{
                    if(resault){
                    console.log(resault)
                    res.status(202).json({
                    massage: 'Patient already apdated'
            
                    })}else{
                    res.status(404).json({
                        massage: 'Patient not found'
            
                    })}
                }).catch(err=>{
                    res.status(404).json({
                    massage :err 
                    })
                })}
    signinP = function  (req, res, next) {
        Patient.find({emailP : req.body.emailP}).
        then(patient=>{
            
            if(patient.length >=1){
                const patientID = patient[0]._id
           
                const token = jwt.sign({_id:patient._id},'secret')
                bcrypt.compare(req.body.passwordP , patient[0].passwordP)
                .then(resault=>{
                    if(resault){
                        res.status(200).send([
                         "welcome",
                         token,
                         patientID
                         
                        ])
                        res.status(404).send([
                            patientID])
                        }
                    else{
                       res.status(404).send([
                            "Mot de passe incorrect"])
                        }
                }).catch(err=>{
                    res.status(404).json({ 
                    massage :err  })})
                  
            }else{
                res.status(404).json([
                "Email incorrect" ])}})
        .catch(err=>{
            res.status(404).json({
            massage :err  })
                      
        })}
    
    module.exports={
        addP : addP,
        getP : getP,
        deleteP :deleteP,
        updateP : updateP,
        signinP : signinP,
        getPID: getPID}