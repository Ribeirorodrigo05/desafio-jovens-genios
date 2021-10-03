const { application, response } = require('express');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/',(request,response)=>{
    response.render('request/home')
})

router.get('/studentRegister',(request, response)=>{
    response.render('request/studentRegister')
})

router.get('/teacherRegister',(request, response)=>{
    response.render('request/teacherRegister')
})

router.post('/register',(request, response)=>{
    

})

module.exports = router;