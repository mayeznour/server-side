const bcrypt = require('bcrypt');
const Doctor = require('../models/doctor')
var jwt = require('jsonwebtoken');
const doctor = require('../models/doctor');
var multer  = require('multer');
const Avis = require('../models/avis');
var { totalAvis } = require('./contAvis');



addD = function (req, res, next) {
    Doctor.find({ cinD: req.body.cinD }).
        then(Result => {
            if (Result.length < 1) {
                Doctor.find({ emailD: req.body.emailD }).
                    then(ress => {
                        if (ress.length < 1) {
                            bcrypt.hash(req.body.passwordD, 10, (err, hash) => {
                                if (err) {
                                    res.status(404).json({
                                        massage: err
                                    })
                                } else {
                                    if(req.body.sexeD=="femme"){
                                        img= 'http://localhost:9100/images/womenD.png'
                                    }else {
                                        img='http://localhost:9100/images/manD.png'

                                    }
                                    const newDoctor = new Doctor({
                                        cinD: req.body.cinD,
                                        fNameD: req.body.fNameD,
                                        lNameD: req.body.lNameD,
                                        emailD: req.body.emailD,
                                        passwordD: hash,
                                        specialityD: req.body.specialityD,
                                        cityD: req.body.cityD,
                                        phoneD: req.body.phoneD,
                                        prix: req.body.prix,
                                        sexeD: req.body.sexeD,
                                        status: req.body.status,
                                        picture : img
                                    })
                                    newDoctor.save().
                                        then(resalt => {
                                            res.status(200).json({
                                                massage: 'Doctor already created'
                                            })
                                        })
                                        .catch(err => {
                                            res.status(404).json({
                                                massage: err
                                            })
                                        })
                                }
                            })
                        }
                        else {
                            res.status(404).send(['Email deja existe.']);
                            console.log('Duplicate email adrress found')
                        }
                    })
                    .catch(err => {
                        res.status(404).json({
                            massage: err,
                        })
                    })
            }
            else {
                res.status(404).send(['CIN deja existe.']);
                console.log('Duplicate CIN  found')
            }
        })
        .catch(err => {
            res.status(404).json({
                massage: err
            })
        })
}
getD = (req, res, next) => {
    Doctor.find({}).populate('specialityD', 'speciality').populate('cityD', 'city')
        .then(resultat => {
            res.status(200).json(
                resultat
            )
        })
        .catch(err => {
            res.status(404).json({
                massage: err

            })
        })
}
getDV = (req, res, next) => {
    Doctor.find({status: true }).populate('specialityD', 'speciality').populate('cityD', 'city')
        .then(resultat => {
            res.status(200).json(
                resultat
            )
        })
        .catch(err => {
            res.status(404).json({
                massage: err

            })
        })
}
getDID = (req, res, next) => {
    Doctor.find({_id : req.params.id}).populate('specialityD', 'speciality').populate('cityD', 'city')
        .then(resultat => {
            res.status(200).json(
                resultat
            )
        })
        .catch(err => {
            res.status(404).json({
                massage: err

            })
        })
}

getDoctorAvis = (req, res, next) => {
    Doctor.find({status: true }).populate('specialityD', 'speciality').populate('cityD', 'city')
        .then(async resultat => {
            for (let x of resultat) {
                await Avis.find({ doctorID: x._id })
                    .then(resultat => {
                        console.log(resultat)
                        nbP = 0
                        totalAvis = 0
                        for (i = 0; i < resultat.length; i++) {
                            totalAvis = totalAvis + resultat[i].nbAvis   
                            nbP = nbP + 1
            
                        }
                        console.log(totalAvis , "nour")
                        if(totalAvis==0) {
                            x.avis=0;
                        }
                        else if(0<totalAvis && totalAvis <= 15){
                            x.avis=1;
                        }
                        else if (16<=totalAvis && totalAvis<=25){
                            x.avis=2;
                        }
                        else if (25<=totalAvis && totalAvis<=35){
                            x.avis=3;
                        }
                        else if (35<=totalAvis && totalAvis<=45){
                            x.avis=4;
                        }
                        else {
                            x.avis=5;
                        }
                    })
                    .catch(err => {
                        res.status(500).json({
                            massage: err

                        })
                    })
            }
            res.status(200).json(
                resultat
            )
        })
        .catch(err => {
            res.status(404).json({
                massage: err

            })
        })
}
deleteD = (req, res, next) => {
    Doctor.deleteOne({ _id: req.params.id }).
        then(resualt => {
            if (resualt) {
                res.status(200).json({
                    massage: 'Doctor deleted'
                })

            } else {
                res.status(404).json({
                    massage: 'Doctor not found'
                })

            }

        }).
        catch(err => {
            res.status(404).json({
                massage: err
            })
        })
}
image =(req, res, next) => {
    console.log(req.file.filename);
    const file = req.file;
    if (!file) {
      const error = new Error('No File')
      error.httpStatusCode = 400
      return next(error)
    }
    console.log("hhhhh")
    const photo = {
    picture:"http://localhost:9100/images/"+ req.file.filename}
    console.log("hhhhhxxxx" )
    Doctor.findOneAndUpdate({ _id: req.params.id }, { $set: photo }).
          then(resault => {
              if (resault) {
                 
                  res.status(202).send(['image apdated']);
  
              } else {
                  res.status(404).json({
                      massage: 'doctor not found'
  
                  })
              }
          }).catch(err => {
              res.status(404).json({
                  massage: err
              })
          })}
          
updateD = (req, res, next) => {
    if(req.body.passwordD==undefined){   
        medecin = {
            fNameD: req.body.fNameD,
            lNameD: req.body.lNameD,
            emailD: req.body.emailD,
            cityD: req.body.cityD,
            phoneD: req.body.phoneD,
            prix: req.body.prix,
            status: req.body.status,
            languages : req.body.languages,
            diplome : req.body.diplome,
            training : req.body.training,
            Cabinet : req.body.Cabinet,
            card : req.body.card,
        } }  
    else {
        bcrypt.hash(req.body.passwordD, 10 ,(err,hash)=>{
            if(err){
                res.status(404).json({
                massage : err })
            }else
            {
                medecin = { 
                    fNameD: req.body.fNameD,
                    lNameD: req.body.lNameD,
                    emailD: req.body.emailD,
                    passwordD: hash,
                    cityD: req.body.cityD,
                    phoneD: req.body.phoneD,
                    prix: req.body.prix,
                    status: req.body.status,
                    languages: req.body.languages,
                    diplome: req.body.diplome,
                    training: req.body.training,
                    Cabinet: req.body.Cabinet,
                    card: req.body.card}}})
    }
    Doctor.findOneAndUpdate({ _id: req.params.id },{$set : medecin}).
        then(resault => {
            if (resault) {
                console.log(medecin)
                res.status(202).send(['doctor already apdated']);

            } else {
                res.status(404).json({
                    massage: 'doctor not found'

                })
            }
        }).catch(err => {
            res.status(404).json({
                massage: err
            })
        })
}
signinD = function (req, res, next) {
    Doctor.find({ cinD: req.body.cinD }).
        then(doctor => {
            if (doctor.length >= 1) {
                Doctor.find({ emailD: req.body.emailD }).
                    then(resultat => {
                        if (resultat.length >= 1) {
                            const doctorID = resultat[0]._id
                            if (resultat[0].status == true) {
                                const doctorID = resultat[0]._id
                                const token = jwt.sign({ _id: resultat._id }, 'secret')
                                bcrypt.compare(req.body.passwordD, resultat[0].passwordD)
                                    .then(resault => {
                                        if (resault) {
                                            res.status(200).send([
                                                "welcome",
                                                token,
                                                doctorID
                                                
                                            ])
                                        }
                                        else {
                                            res.status(404).send([
                                                "Mote de passe incorrecte"])
                                        }
                                    })
                                    .catch(err => {
                                        res.status(404).json({
                                            massage: err
                                        })
                                    })
                            } else {
                                if(resultat[0].cinP == undefined && resultat[0].piece == undefined){
                                 res.status(500).send(
                                    doctorID
                                    )}
                                else{
                                    res.status(404).json([
                                   "votre demande encore n'est pas accepte"])
                                
                            }}
                        } else {
                            res.status(404).json([
                                "Email incorrecte"])
                        }
                    })
                    .catch(err => {
                        res.status(404).json({
                            massage: err
                        })
                    })
            } else {
                res.status(404).json([
                    "Médecin CIN incorrecte"])
            }
        })
        .catch(err => {
            res.status(404).json({
                massage: err
            })
        })

}
avisD = (req, res, next) => {
    if (0 <= req.body.avis && req.body.avis <= 5) {
        let x = req.body.avis
        Doctor.find({})
            .then(resultat => {
                avisB = resultat[0].avis
                avisN = (req.body.avis / 25)
                avisT = avisB + avisN
                const doctor = {
                    avis: avisT,
                }
                Doctor.findOneAndUpdate({ _id: req.params.id }, { $set: doctor }).
                    then(resault => {
                        if (resault) {
                            res.status(202).send(['avis Ajoutee']);
                            console.log(doctor)

                        } else {
                            res.status(404).json({
                                massage: 'doctor not found'

                            })
                        }
                    }).catch(err => {
                        res.status(404).json({
                            massage: err
                        })
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }
    else {
        res.status(404).json({
            massage: 'error'
        })
    }
}
cinP=(req, res, next) => {
    console.log("xx")
    console.log("CINp", req.file.filename);
    const file = req.file;
    const doctor = {
    cinP: "http://localhost:9100/images/"+req.file.filename, }
    console.log(doctor)
    Doctor.findOneAndUpdate({ _id: req.params.id }, { $set: doctor }).
          then(resault => {
              if (resault) {
                 
                  res.status(202).send(['image CIN apdated']);
  
              } else {
                  res.status(404).json({
                      massage: 'doctor not found'
  
                  })
              }
          }).catch(err => {
              res.status(404).json({
                  massage: err
              })
          })}
piece=(req, res, next) => {
    console.log("PIECE", req.file.filename);
    const file = req.file;
    const doctor = {
    piece: "http://localhost:9100/images/"+req.file.filename, }
    console.log(doctor)
    Doctor.findOneAndUpdate({ _id: req.params.id }, { $set: doctor }).
    then(resault => {
        if (resault) {
            res.status(202).send(['image diplome apdated']);
          } else {
            res.status(404).json({
        massage: 'doctor not found'
          
                          })
                      }
                  }).catch(err => {
                      res.status(404).json({
                          massage: err
                      })
                  })}
statusD = (req, res, next) => {
    const doctor = {
         status: req.body.status,
                       }
        Doctor.findOneAndUpdate({ _id: req.params.id }, { $set: doctor }).
         then(resault => {
        if (resault) {
                console.log(doctor)
                console.log(resault)
                res.status(202).send(['doctor already apdated']);
                
        } else {
                res.status(404).json({
                massage: 'doctor not found'
                })}
        }).catch(err => {
        res.status(404).json({
        massage: err
        })
})}

        
module.exports = {
    addD: addD,
    getD: getD,
    deleteD: deleteD,
    updateD: updateD,
    signinD: signinD,
    avisD: avisD,
    getDID :getDID,
    image :image,
    piece: piece, 
    cinP:cinP,
    statusD:statusD,
    getDV : getDV

}