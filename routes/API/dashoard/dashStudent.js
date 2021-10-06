const express = require('express');
const router = express.Router();
const csurf = require('csurf');




const csrfProtection = csurf({cookie: {httpOnly: true}});
const Student = require('../../../model/Student')

const auth = require('../../../config/auth');

router.get('/dash-student',csrfProtection, auth, (request, response)=>{
    const {userId} = request;

    Student.findOne({_id: userId}).then(student => {
        response.render('request/dashStudent',{student : student});
    })

});

router.get("/logout", (request, response) => {
    response.clearCookie("cookieToken")
    response.redirect("/")
  })






module.exports = router;