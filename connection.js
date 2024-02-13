const mongoose=require('mongoose');
//const db ="mongodb+srv://abhishakk998:abhishak132@cluster0.x8megk6.mongodb.net/?retryWrites=true&w=majority";

 const db="mongodb://localhost:27017/student";
async function connectdb(){
return mongoose.connect(db).then(()=>{
    console.log('DB connect.')
   
}) .catch((e)=>{
    console.log(e);
})}

module.exports ={
    connectdb,
}