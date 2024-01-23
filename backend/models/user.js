import mongoose from "mongoose";
// import passportLocalMongoose from 'passport-local-mongoose';
import bcrypt from 'bcryptjs';

const userSchema=new mongoose.Schema({
    name:{
        type: String
    },
    password:{
        type: String
    },
    email:{
        type: String,
        // required: true,
    },
    role:{
        type: String,
        // required: true,
        enum: ['user','admin']
    }
});

// userSchema.plugin(passportLocalMongoose);

userSchema.methods.matchPassword=async function(enteredPass){
    // console.log(enteredPass,this.password);
    return await bcrypt.compare(enteredPass,this.password);
}

const User=mongoose.model('User',userSchema);

export default User;