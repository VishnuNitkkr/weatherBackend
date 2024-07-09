import mongoose from "mongoose";
import bcryptjs from 'bcryptjs'
import validator from 'validator'
const userSchema=mongoose.Schema({
   name:{
    type:String,
    required:true,
    minLength:[3,'Name should have at least 3 characters']
   },
   email:{
    type:String,
    required:true,
    validate:[validator.isEmail,'plz provide valid email']
    
   },
   password:{
    type:String,
    required:true,
    minLength:[6,'Password should have at least 3 characters']
   },
   city:{
    type:String,
    required:true,
    
   }

})


userSchema.methods.comparePassword=async function(enteredPassword){
   return await bcryptjs.compare(enteredPassword,this.password)
 }


const User=mongoose.model('user',userSchema)

export default User