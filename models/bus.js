const mongoose=require("mongoose")
const schema=mongoose.Schema(
   {
    "busname":{type:String,required:true},
    "route":{type:String,required:true},
    "busno":{type:String,required:true},
    "drivername":{type:String,required:true},
    "email":{type:String,required:true},
    "password":{type:String,required:true}
   }
)
let busmodel=mongoose.model("bus",schema)
module.exports={busmodel}