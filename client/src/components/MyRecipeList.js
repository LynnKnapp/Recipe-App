import React from 'react'
import Recipe from './MyRecipe.js'
import MyRecipeForm from './MyRecipeForm.js'
import MyRecipes from './MyRecipes.js'


const UserRecipeList = (props) => {
    const mappedRecipes = props.recipes.map(recipe => {
         return      <Recipe
                    key={recipe._id}
                    {...recipe}
                    _id={recipe._id}
                    user={recipe.user}
                    handleEdit={props.handleEdit}
                    handleDelete={props.handleDelete}
                     />
    })  
        return(
            <div className ='mapped-recipes'>
                {mappedRecipes} 
            </div>
        )
}         

export default UserRecipeList

