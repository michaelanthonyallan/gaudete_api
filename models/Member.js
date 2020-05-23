const mongoose = require('mongoose');

const MemberSchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    age:{
        type: Number,
        required:true
    },
    flavorText:[String],
    image:{
        type:String
    }
})

module.exports = mongoose.model('Members', MemberSchema); 