const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const http = require('http');
const socketio = require('socket.io')

const server = http.createServer(app);
const io = socketio(server);

const teachers = require('./routes/API/user/teachers');
const students = require('./routes/API/user/student');
const dashTeacher = require('./routes/API/dashoard/dashTeacher')
const dashStudent = require('./routes/API/dashoard/dashStudent')

const PORT = process.env.PORT || 3005;

app.engine('handlebars', handlebars({
    defaultLayout: 'main',
    helpers:{
        formatDate: (date) =>{
            return moment(date).format('DD/MM/YYYY')
        }
    },
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
}));

app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, './public')))

mongoose.connect('mongodb+srv://ribeirorodrigo05:rodrigo220391@info2021.6psl5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
.then(()=> console.log('database is connected'))
.catch(err => console.log(err))

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(cookieParser());
app.use('/', teachers);
app.use('/', students);
app.use('/', dashTeacher);
app.use('/', dashStudent);

io.on('connection', socket =>{
    console.log(`${socket.id}`)

    socket.on('answerQuiz', (msg)=> {
        io.emit('message', msg)
    })
})

server.listen(PORT, ()=> console.log(`Server is online ${PORT}`));