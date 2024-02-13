const contact= require('../models/index.js');

async function handlerpostdata(req,res){
   req.body.save().then(()=>{
        console.log("save")
    }).catch((e)=>console.log(e));
    
}