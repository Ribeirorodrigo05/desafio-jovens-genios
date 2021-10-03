const mongoose= require('mongoose');
const Schema = mongoose.Schema;
const teacherSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    registration:{
        type:String,
        require:true
    },
    discipline:{
        type:String,
        require:true
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

module.exports = Teacher = mongoose.model('teachers', teacherSchema)