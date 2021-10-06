const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



const validateRegisterInput = require('../../../validation/register');
const validateLoginInput = require('../../../validation/login');
const Teacher = require('../../../model/Teacher');
const keys = require('../../../config/keys')

router.get('/',(request,response)=>{
    response.render('request/home')
})


router.get('/teacher',(request, response)=>{
    response.render('request/teacher')
})

router.post('/register',(request, response)=>{

    const {name, registration, discipline, email, password, passwordConfirm} = request.body

    const {errors, isValid} = validateRegisterInput(request.body);

    if(!isValid){
        return response.status(400).json(errors)
    }

Teacher.findOne({email: request.body.email})
    .then((user)=>{
        if(user){
            errors.email = 'Email already exists'
            response.status(400).json(errors)
        }else{
           

            const newUser = new Teacher({
                name: name,
                registration: registration,
                discipline: discipline,
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

router.post('/login-teacher',(request,response)=>{

    const {email, password} = request.body

    const {errors, isValid} = validateLoginInput(request.body)

    if(!isValid){
        return response.render('request/teacher',{errors : errors})
    }


Teacher.findOne({email}).then(user =>{
    const errorsLogin ={}
    if(!user){
        errorsLogin.email = 'Email não encontrado'
        response.render('request/teacher',{errorsLogin : errorsLogin})
    }else{
        bcrypt.compare(password, user.password).then(isMatch =>{
            if(isMatch){
                const payload = {
                    id: user.id,
                    name: user.name,
                    discipline:user.discipline
                }
                response.cookie('cookieToken',
                jwt.sign(payload,
                     keys.secretOrKeys,
                     {expiresIn:7200},
                     {httpOnly: true})
                )
                
                response.redirect('/dash-teacher')
            
            }else{
                errorsLogin.invalid = 'Email/Password is invalid'
               response.render('request/teacher',{errorsLogin: errorsLogin})     
            }
        })
    } 
    //end else
})
})

module.exports = router;