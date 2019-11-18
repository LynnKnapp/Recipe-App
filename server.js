const express = require("express")
const app = express()
require("dotenv").config()
const morgan = require("morgan")
const mongoose = require("mongoose")
const expressJwt = require("express-jwt")
const path = require("path")
const PORT = process.env.PORT || 7001

app.use(express.json())
app.use(morgan('dev'))


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/recipedb',
    {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true
    }, () => console.log('connected to DB'))

app.use('/auth', require('./routes/authRouter.js'))
app.use('/api', expressJwt({secret: process.env.SECRET}))
app.use('/api/recipe', require('./routes/recipeRouter.js')) 


app.use((err, req, res, next) =>{
    console.log(err)
    if(err.name === 'UnauthorizedError')
        res.status(err.status)
    return res.send({errMsg: err.message})
})   

// app.get("*", (req, res) =>{
//     res.sendFile(path.join(__dirname, "client", "build", "index.html"))
// });



app.listen(7001, ()=>{
    console.log('server is running on PORT 7001')
})