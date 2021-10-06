const express = require('express');
const router = express.Router();
const csurf = require('csurf');
const mongoose = require('mongoose');
const server = require('http').createServer(router);
const io = require('socket.io')(server);



const csrfProtection = csurf({cookie: {httpOnly: true}});
const Teacher = require('../../../model/Teacher')

const authTeacher = require('../../../config/auth');

router.get('/dash-Teacher',csrfProtection, authTeacher, (request, response)=>{
    const {userId} = request;

    Teacher.findOne({_id: userId}).then(teacher => {
        response.render('request/dashTeacher',{teacher : teacher});
    })

});







module.exports = router;