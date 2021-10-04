const express = require('express');
const router = express.Router();
const csurf = require('csurf');
const mongoose = require('mongoose');
const server = require('http').createServer(router);
const io = require('socket.io')(server);



const csrfProtection = csurf({cookie: {httpOnly: true}});
const Student = require('../../../model/Student')

const auth = require('../../../config/authTeacher');

router.get('/dash-student',csrfProtection, auth, (request, response)=>{
    const {userId} = request;

    Student.findOne({id: userId}).then(student => {
        response.render('request/dashStudent',{student : student});

    })

});







module.exports = router;