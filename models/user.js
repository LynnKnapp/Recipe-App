const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require("bcrypt")

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    memberSince: {
        type: Date,
        default: Date.now
    }
})

//presave Hook to encrypt the password
userSchema.pre("save", function(next){
    const user = this
    //makes sure its the firt time password is being saved
    if(!user.isModified("password")) return next()
    //encrypt password
    bcrypt.hash(user.password, 10, (err, hash) => {
        if(err) return next(err)
        //overwrite users plain text password with hashed password
        user.password = hash
        // then to to the .save() in the "signup" route
        next()
    })
}) 

userSchema.methods.checkPassword = function(passwordAttempt, callback){
    bcrypt.compare(passwordAttempt, this.password, (err, isMatch) => {
        if(err) return callback(err)
        callback(null, isMatch)
    })
}

userSchema.methods.withoutPassword = function(){
    const user = this.toObject()
    delete user.password
    return user
}

module.exports = mongoose.model("User", userSchema)