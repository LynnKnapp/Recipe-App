const mongoose = require("mongoose")
const Schema = mongoose.Schema

const recipe = new Schema ({
     name: {
         type: String,
         
     },
     author: {
         type: String,
         
     },
     dietType: {
         type: String,
         enum: ["Healthy", "Indulgent"]

     },
     description: {
         type: String,
         
     },
     ingredients: [{
         type: String,
         default: "unknown",
     }],
     imgUrl:{
        type: String
     }, 
     user:{
         type: Schema.Types.ObjectId,
         ref: "User",
         required: true
     }
})
module.exports = mongoose.model('Recipe', recipe)