const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/NewsLogin",{
}).then(()=>{
    console.log("connection successful");
}).catch((e)=>{
console.log(`not connected ${e}`);
});
