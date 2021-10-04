const mongoose= require('mongoose');
const Schema = mongoose.Schema;
const studentSchema = new Schema({
    name:{
        type:String,
        uppercase:true,
        require:true
    },
    registration:{
        type:String,
        require:true
    },
    grade:{
        type:String,
        required:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    created_at:{
        type:Date,
        default:Date.now
    }
});

module.exports = Student = mongoose.model('students', studentSchema)