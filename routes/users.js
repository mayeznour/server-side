var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const Doctor = require('../models/doctor')
const SuperAdmin = require('../models/superAdmin');
const multer = require('multer');
const contrSA = require('../controller/contSA');
const Admin = require('../models/admin')
const contrA = require('../controller/contA');
const contrC = require('../controller/contV');
const contrS = require('../controller/contS');
const contrD = require('../controller/contD');
const contrP= require('../controller/contP');
const contrO= require('../controller/contO');
const contrchat= require('../controller/contChat');
const { signinA } = require('../controller/contA');
const { addAvis } = require('../controller/contAvis');
const { getCID, rendez_vous, getCV } = require('../controller/contC');
const { messageP, messageD } = require('../controller/contChat');
require('../controller/contC')
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);


var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images');
  },
  filename: (req, file, cb) => {
    console.log(file);
    var filetype = '';
    if(file.mimetype === 'image/gif') {
      filetype = 'gif';
    }
    if(file.mimetype === 'image/png') {
      filetype = 'png';
    }
    if(file.mimetype === 'image/jpeg') {
      filetype = 'jpg';
    }
    cb(null, 'image-' + Date.now() + '.' + filetype);
  }
});

var upload = multer({storage: storage});


/* GET users listing. */
/* CRUD SuperAdmin */
router.post('/signinSA', signinSA);
router.post('/addSA', addSA);
router.patch("/updateSA/:id" ,updateSA);
router.delete('/deleteSA/:id' ,deleteSA )
router.get('/getSA',getSA)
/* CRUD Admin */
router.post('/addA', addA);
router.post('/signinA', signinA);
router.patch("/updateA/:id" ,updateA);
router.delete('/deleteA/:id' ,deleteA);
router.get('/getA',getA)
/* CRUD CITY*/
router.post('/city', addC);
router.get('/getC', getC);
/* CRUD speciality*/
router.post('/speciality', addS);
router.get('/getS', getS);
router.patch('/updateS/:id', updateS);
router.delete('/deleteS/:id', deleteS);
/* CRUD Doctor*/
router.post('/addD', addD);
router.get('/getD2', getDoctorAvis);
router.get('/getD', getD);
router.get('/getDV', getDV);
router.get('/getDID/:id', getDID);
router.post('/signinD', signinD);
router.patch("/statusD/:id" ,statusD)
router.patch("/updateD/:id" ,upload.single('file'),updateD)
router.post('/file/:id', upload.single('file'), image)
router.patch("/avis/:id" ,avisD)
router.delete('/deleteD/:id' ,deleteD);
router.post('/cin/:id', upload.single('file') ,cinP)
router.post('/diplome/:id', upload.single('file') ,piece)

/* CRUD Patient*/
router.post('/addP', addP);
router.get('/getP', getP);
router.get('/getPID/:id', getPID);
router.post('/signinP', signinP);
router.patch("/updateP/:id" ,updateP)
router.delete('/deleteP/:id' ,deleteP);
/* CRUD Avis*/
router.get('/getAvis/:id', totalAvis);
router.post('/avis', addAvis);
/* CRUD Calendar*/
router.get('/getDateVide/:id',getCID);
router.get('/getCVide',getCV);
router.get('/getDateNV/:id',getRendezValide);//NONVALIDE
router.get('/getDate/:id',getRendez); //VALIDE
router.get("/getRV/:id",getRendezPatient) //RendezVousPatient
router.get("/getRVTD/:id",getRendezPatientTD) //RendezVousPatientToDay
router.post('/date',addCl);
router.patch("/rendez_vous/:id",rendez_vous)
router.patch("/ValiderRV/:id",valide_RendezVous)
router.delete('/deleteDate/:id',deleteDate);
router.post('/payer/:id', upload.single('file'), paye)

/* CRUD Chat*/
router.get('/chat/:room/:patientName',getchat);
router.get('/chatR/:room',getchatIDR);
router.get('/chatP/:patientName',getchatID);
router.post('/chatp',messageP);
router.post('/chatD',messageD);
/* CRUD Ordonnance*/
router.post('/ordonnance',addO);
router.get('/ordonnance/:id',getO);



//setup of dependencies
server.listen(4000);

/*socket io*/
io.on('connection', function (socket) {
  console.log('User connected');
  socket.on('disconnect', function() {
    console.log('User disconnected');
  });
  socket.on('save-message', function (data) {
    console.log(data);
    io.emit('new-message', { message: data });
  });
});

module.exports = router;
