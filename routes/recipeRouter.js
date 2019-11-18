const express = require("express")
const recipeRouter = express.Router()
const Recipe = require("../models/recipe")



recipeRouter.get('/', (req, res, next) =>{
    Recipe.find((err, recipes) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        res.status(200).send(recipes)
    })
})
recipeRouter.get('/userRecipe', (req, res, next) =>{
    Recipe.find((err, recipes) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        res.status(200).send(recipes)
    })
})

// recipeRouter.get('/user', (req, res, next) =>{
//     Recipe.find({user: req.user._id}, (err, recipes) => {
//         if(err) {
//             res.status(500)
//             return next(err)
//         }
//         res.status(200).send(recipes)
//     })
// })

// recipeRouter.get('/myRecipe', (req, res, next) =>{
//     Recipe.find((err, recipes) =>{
//         if(err) {
//             res.status(500)
//             return next(err) 
//         }
//         res.status(200).send(recipes)
//     })
// })

recipeRouter.get('/healthy', (req, res, next) =>{
    const query = { dietType: "Healthy" }
    const send = (err, resultsOfFind) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        res.status(200).send(resultsOfFind)
    }
    
   Recipe.find(query, send)
})

recipeRouter.get('/indulgent', (req, res, next) =>{
    // user: req.user._id 
    const query = {dietType: "Indulgent"}
    const send = (err, resultsOfFind) => {
        if(err) {
            res.status(500)
            return next (err)
        }
        res.status(200).send(resultsOfFind)
    }
    Recipe.find(query, send)
})



recipeRouter.post("/userRecipe", (req, res, next) =>{
    // req.user = req.user._id
    console.log('fired')
    const newRecipe = new Recipe(req.body)
    newRecipe.user = req.user._id
    newRecipe.save((err, newRecipe) =>{
        if(err) {
            res.status(500)
            return next(err) 
        }
        return res.status(201).send(newRecipe)
    })
})

recipeRouter.put("/userRecipe/:_id", (req,res, next)=>{
    Recipe.findOneAndUpdate(
        {_id: req.params._id}, 
        req.body, 
        {new: true}, 
        (err, recipe)=>{
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(recipe)
    })

})

recipeRouter.delete("/userRecipe/:_id", (req, res, next)=>{
    Recipe.findOneAndRemove({_id: req.params._id},  (err, recipe)=>{
        if(err){
            res.status(500)
        }
        return res.status(200).send("sucessfully deleted")
    })
})

// recipeRouter.get("/userRecipe")


module.exports = recipeRouter