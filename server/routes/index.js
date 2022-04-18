let express = require('express');
//const surveys = require('../models/surveys');
let router = express.Router();

let mongoose = require('mongoose');
let passport = require('passport');

//uploading files
let multer = require('multer');


let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './server/routes/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

let upload = multer({ storage: storage }).single('myFile');

//------for accessing files----------------------------------------------------------

let path = require('path');
let fs = require("fs");
let DirPath = path.join(__dirname, "uploads");

const files = fs.readdirSync(DirPath).map(name => {
    return {
      name: path.basename(name, ""),
      url: `/uploads/${name}`
    };
  });
//-----------------------------------------------------------------

// enable jwt
let jwt = require('jsonwebtoken');
let DB = require('../config/db');

// create the User Model instance
let userModel = require('../models/user');
let User = userModel.User; // alias

// create the customer model instance
let custProf = require('../models/customer');

// create the DataSheet Model 
let dataSheetModel = require('../models/material');
let DataSheet = dataSheetModel.DataSheet; // alias

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Home', page: 'home', username: req.user ? req.user.username : '' });
});

/*GET FEE page*/
router.get('/fee', function(req, res, next) {
    res.render('index', { title: 'Home', page: 'fee', username: req.user ? req.user.username : '' });
});

/*GET FEE whiteboard page */
router.get('/feeWhiteBoard', function(req, res, next) {
    res.render('index', { title: 'FEE WhiteBoard', page: 'feeWhiteBoard', username: req.user ? req.user.username : '' });
});
/*GET FEE Material DataSheets page */

router.get('/feeDataSheet', function(req, res, next){
    DataSheet.find((err, datasheets) =>{
        if(err){
            return console.error(err);
        }
        else {
            console.log(datasheets);
            res.render('index', { files,
            title: 'FEE Material Datasheets', 
            page: 'feeDataSheet', 
            datasheets: datasheets,
            id: null,
            username: req.user ? req.user.username : '' });
        }
    })
})

router.get('/feeDataSheet/:id', (req, res, next) =>{
    let id = req.params.id;
    DataSheet.findById(id, (err, datasheetToShow) =>{
        if(err){
            console.log(err);
            res.end(err);
        }
        else{
            console.log(datasheetToShow)
            res.render("index", { files,
                title:"Datasheet information",
                page: 'dataInfo',
                datasheets: datasheetToShow,
                id:id,
                username: req.user ? req.user.username : ''
            })
        }
    });
});

/* POST the Route for processing the Add DataSheet page.*/
router.post('/feeDataSheet', upload, (req, res, next) => {
    //let file = req.file;
    let body = req.body;
    let newDataSheet = DataSheet({
        "name": body.name,
        "description": body.description,
        "myFile": req.file.filename
    });

    DataSheet.create(newDataSheet, (err, DataSheet) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.redirect('/feeDataSheet');

//---------------------------------------------------- will add spaces to file then save, to restart nodemon and reload the app
           fs.appendFile('donDelete.js', ' ', function (err) {
            if (err) throw err;
            console.log('Updated!')
            })
//---------------------------------------------------------------------------------------------------------------------------
        }
    });

});
//-----------------------------------------------------------

/*GET FEE Job library page */
router.get('/feeJobLibrary', function(req, res, next) {
    res.render('index', { title: 'FEE Job Library', page: 'feeJobLibrary', username: req.user ? req.user.username : '' });
});
/*GET FEE Engineering Procedures page */
router.get('/feeEngineeringPro', function(req, res, next) {
    res.render('index', { title: 'FEE Engineering Procedures', page: 'feeEngineeringPro', username: req.user ? req.user.username : '' });
});
  /*GET FEE Presentation&Articles page */
router.get('/feePresentation', function(req, res, next) {
    res.render('index', { files, title: 'FEE Presentation&Articles', page: 'feePresentation', username: req.user ? req.user.username : '' });
});

/*GET FEE Job search page */
router.get('/feeJobSearch', function(req, res, next) {
    res.render('index', { title: 'FEE Job Search', page: 'feeJobSearch', username: req.user ? req.user.username : '' });
});
 // *GET FEE profile page
 router.get('/feeProfile', function(req, res, next){
    custProf.find((err, customers) =>{
        if(err){
            return console.error(err);
        }
        else {
            console.log(customers);
            res.render('index', { files,
            title: 'FEE Customer Profile', 
            page: 'feeProfile', 
            customers: customers,
            id: null,
            username: req.user ? req.user.username : '' });
        }
    })
})

router.get('/feeProfile/:id', (req, res, next) =>{

    let id = req.params.id;
    custProf.findById(id, (err, customerToShow) =>{
        if(err){
            console.log(err);
            res.end(err);
        }
        else{
            console.log(customerToShow)
            res.render("index", { files,
                title:"Customer information",
                page: 'customerInfo',
                customers: customerToShow,
                id:id,
                username: req.user ? req.user.username : ''
            })
        }
    })
})

// POST Add Customer Profile to FEE profile page
router.post('/feeProfile', upload, (req,res, next) => {
    let body = req.body;
  //let file = req.file;
  let cust = new custProf({
      customerName: body.customerName,
      genDesc: body.genDesc,
      salesDesc: body.salesDesc,
      camDesc: body.camDesc,
      drillDesc: body.drillDesc,
      processDesc: body.processDesc,
      solderDesc: body.solderDesc,
      processEngDesc: body.processEngDesc,
      assemblyDesc: body.assemblyDesc,
      qualityDesc: body.qualityDesc,
      packDesc: body.packDesc,
      myFile: req.file.filename
  });
  cust.save((err) => {
    if(err){
      res.json({ message: err});
    } else {
      req.session.message = {
        type: 'success',
        message: 'Profile successfully created'
      };
      res.redirect('/feeProfile');
//---------------------------------------------------- add spaces to file then save, to restart nodemon and reload the app
        fs.appendFile('donDelete.js', ' ', function (err) {
        if (err) throw err;
            console.log('Updated!')
        })
//---------------------------------------------------------------------------------------------------------------------------
    }
  })
});
//----------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------
//*GET Customer Information page */
router.get('/customerInfo', function(req, res, next) {
    res.render('index', { title: 'Customer Information', page: 'customerInfo', username: req.user ? req.user.username : '' });
});

/* GET Route for displaying the login page.*/
router.get('/login', function(req, res, next) {
    // check if the user is already logged in
    if (!req.user) {
        res.render('index', {
            title: "Login",
            page: "auth/login",
            messages: req.flash('loginMessage'),
            username: req.user ? req.user.username : ''
        })
    } else {
        return res.redirect('/');
    }
});

/* GET Route for processing the login page.*/
router.post('/login', function(req, res, next) {
    passport.authenticate('local',
        (err, user, info) => {
            // server err?
            if (err) {
                return next(err);
            }
            // is there a user login error?
            if (!user) {
                req.flash('loginMessage', 'Authentication Error');
                return res.redirect('/login');
            }
            req.login(user, (err) => {
                // server error?
                if (err) {
                    return next(err);
                }

                return res.redirect('/');
            });
        })(req, res, next);
});

/* GET Route to perform User Logout.*/
router.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/');
});

module.exports = router;