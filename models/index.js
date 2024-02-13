const mongoose =require('mongoose');
const vaildator =require('validatorjs')

const contactSchema= new mongoose.Schema({
name:{
    type: String,
    minlenght:3,
    maxlenght:20,
    require:true,
    vaildator(value){
        if(!vaildator.isAlpha(value)){
            throw new Error("Invaild Name");
        }
    }
},
email:{
    type:String,
    minlenght:5,
    maxlenght:25,
    require:true,
    unique:true,
    vaildator(value){
        if(!vaildator.isEmail(value)){
            throw new Error('Invaild Email');
        }
    }
},
subject:{
 type:String,
 minlenght:3,
 maxlenght:30,
 require: true,

},
message:{
    type:String,
    minlenght:2,
    maxlenght:100,
    require:true,
}

});

const contact = new mongoose.model('portfolio',contactSchema ,'portfolio');
module.exports= contact;
