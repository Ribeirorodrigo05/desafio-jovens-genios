const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const validateRegisterInput = require('../../../validation/registerStudent');
const validateLoginInput = require('../../../validation/login');
const Student = require('../../../model/Student');
const keys = require('../../../config/keys')

router.get('/student',(request, response)=>{
    response.render('request/student')
})

router.post('/register-student',(request, response)=>{

    const {name, registration, grade, email, password, passwordConfirm} = request.body

    const {errors, isValid} = validateRegisterInput(request.body);

    if(!isValid){
        return response.status(400).json(errors)
    }

Student.findOne({email:email})
    .then((user)=>{
        if(user){
            errors.email = 'Email already exists'
            response.status(400).json(errors)
        }else{
           

            const newUser = new Student({
                name: name,
                registration: registration,
                grade:grade,
                email: email,
                password: password,
            })

            bcrypt.genSalt(10, (err, salt)=>{
                bcrypt.hash(newUser.password, salt, (err, hash)=>{
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                    .then((user)=>{
                        response.status(200).json(user)
                    })
                    .catch(err => console.log(err))
                })
            })
        }
    })
});

router.post('/login-student',(request,response)=>{

    const {email, password} = request.body

    const {errors, isValid} = validateLoginInput(request.body)

    if(!isValid){
        return response.render('request/student',{errors : errors})
    }


Student.findOne({email}).then(user =>{
    const errorsLogin ={}
    if(!user){
        errorsLogin.email = 'Email não encontrado'
        response.render('request/student',{errorsLogin : errorsLogin})
    }else{
        bcrypt.compare(password, user.password).then(isMatch =>{
            if(isMatch){
                const payload = {
                    id: user.id,
                    name: user.name,
                    grade:user.grade
                }
                response.cookie('cookieToken',
                jwt.sign(payload,
                     keys.secretOrKeys,
                     {expiresIn:7200},
                     {httpOnly: true})
                )
                
                response.redirect('/dash-student')
            
            }else{
                errorsLogin.invalid = 'Email/Password is invalid'
               response.render('request/student',{errorsLogin: errorsLogin})     
            }
        })
    } 
    //end else
})
})


module.exports = router;