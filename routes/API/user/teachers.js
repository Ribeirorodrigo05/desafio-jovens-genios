const { application, response } = require('express');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const csurf = require('csurf');


const validateRegisterInput = require('../../../validation/register');
const validateLoginInput = require('../../../validation/register');
const Teacher = require('../../../model/Teacher');
const keys = require('../../../config/keys')

router.get('/',(request,response)=>{
    response.render('request/home')
})

router.get('/student',(request, response)=>{
    response.render('request/student')
})

router.get('/teacher',(request, response)=>{
    response.render('request/teacher')
})

router.post('/register',(request, response)=>{

    const {name, registration, discipline, email, password} = request.body

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

router.post('/login',(req,res)=>{

    const {errors, isValid} = validateLoginInput(req.body)

    if(!isValid){
        return res.render('request/teacher',{errors : errors})
    }

const email = req.body.email;
const password = req.body.password;
Teacher.findOne({email}).then(user =>{
    const errors ={}
    if(!user){
        errorsLogin.email = 'Usuário não encontrado'
        res.render('request/teacher',{errors : errors})
    }else{
        bcrypt.compare(password, user.password).then(isMatch =>{
            if(isMatch){
                const payload = {
                    id: user.id,
                    name: user.name
                }
                res.cookie('cookieToken',
                jwt.sign(payload,
                     keys.secretOrKeys,
                     {expiresIn:7200},
                     {httpOnly: true})
                )
                
                res.send("dashboard")
            
            }else{
                errors.invalid = 'Email/Password inválido'
               res.render('request/teacher',{errors: errors})     
            }
        })
    } 
    //end else
})
})

module.exports = router;