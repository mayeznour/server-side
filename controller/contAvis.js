const Avis = require('../models/avis')

addAvis= function(req, res, next) {
    console.log(req.body.nbAvis , req.body.doctorID , req.body.patientID)
    if(0<=req.body.nbAvis  && req.body.nbAvis <=5){
        Avis.find({patientID: req.body.patientID , doctorID: req.body.doctorID}).
        then(avis=>{
            if(avis.length < 1){
                    const avis = new Avis({
                    doctorID :req.body.doctorID,
                    patientID : req.body.patientID ,
                    nbAvis: req.body.nbAvis })
                    avis.save().
                    then(resalt=>{
                            res.status(200).json({
                            massage : 'Avis ajoute avec un nv patient'}) })
                    .catch(err=>{
                            res.status(404).json({
                            massage : err})})}                     
            else{
                id=avis[0]._id
                const upAvis={
                    nbAvis: req.body.nbAvis}
                    Avis.findOneAndUpdate({_id : id},{$set : upAvis}).
                    then(resault=>{
                        if(resault){
                        res.status(202).send(['avis update']); 
                    } })
                    .catch(err=>{
                        res.status(404).json({
                        massage :err 
                })})}})          
        .catch(err=>{
                res.status(404).json({
                massage :err 
                })
            })}
    else{
        res.status(404).json({
            massage: 'nbAvis doit etre entre 0 et 5'
        })}
}
totalAvis = function(req, res, next) {
    Avis.find({doctorID:req.params.id})
    .then(resultat=>{
        nbP=0
        totalAvis=0
        for(i=0;i<resultat.length;i++){
            totalAvis=totalAvis+resultat[i].nbAvis
            nbP=nbP+1

        }
        console.log(totalAvis)
        res.status(200).json(
            "nb d'avis total "+ totalAvis
    )})
    .catch(err=>{
        res.status(500).json({
        massage :err 

    })})

}
  
    



module.exports={
    addAvis : addAvis,
    totalAvis :totalAvis,
   }
