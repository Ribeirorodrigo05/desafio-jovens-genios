const express = require('express');
const router = express.Router();
const csurf = require('csurf');

const csrfProtection = csurf({cookie: {httpOnly: true}});
const Teacher = require('../../../model/Teacher')

const auth = require('../../../config/auth');

router.get('/dash-Teacher',csrfProtection, auth, (request, response)=>{
    const {userId} = request;

    Teacher.findOne({_id: userId}).then(teacher => {
        response.render('request/dashTeacher',{teacher : teacher});
    })

});







module.exports = router;