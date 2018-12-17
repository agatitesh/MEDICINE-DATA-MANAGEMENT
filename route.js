const express=require('express');

const router=express.Router();

const control = require('../control/control');

router.get('/register',control.register);
router.get('/login',control.login);
router.post('/addmedicine',control.addmedicine);
router.post('/deletemedicine',control.deletemedicine);
router.get('/viewallmed',control.viewallmed);
router.get('/searchmed',control.searchmed);
router.get('/searchuser',control.searchuser);
router.get('./orderdetail',control.orderdetail);
router.post('/updatemedicine',control.updatemedicine);
router.get('/getalluser',control.getalluser);
router.get('/getallorder',control.getallorder);
router.get('/searchuser',control.searchuser);  //not checked yet ....
router.get('/admin',control.admin);
router.get('/logout',control.logout);


module.exports=router;



