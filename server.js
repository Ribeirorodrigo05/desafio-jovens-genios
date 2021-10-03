//dependencies
const express = require('express');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 3003

const app = express();

//module required

const teachers = require('./routes/API/user/teachers')
//static files
app.use(express.static(path.join(__dirname, './public')))

app.use(express.urlencoded({extended:true}));
app.use(express.json());

mongoose.connect('mongodb://localhost/educando_quiz')
.then(()=> console.log('database is connected'))
.catch(err => console.log(err))

app.engine('handlebars', handlebars({
    defaultLayout:'main',
    runtimeOptions:{
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault:true,
    }
}));

app.set('view engine', 'handlebars');
app.use(cookieParser());
app.use('/', teachers);


app.listen(PORT, ()=> console.log(`Server is online ${PORT}`));

