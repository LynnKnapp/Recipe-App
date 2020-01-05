import React from 'react'
import UserRecipe from './UserRecipe.js'
import UserRecipeForm from './UserRecipeForm.js'
import MyRecipes from './MyRecipes.js'


const UserRecipeList = (props) => {
    const mappedRecipes = props.recipes.map(recipe => {
         return      <UserRecipe
                    key={recipe._id}
                    {...recipe}
                    _id={recipe._id}
                    user={recipe.user}
                    handleEdit={props.handleEdit}
                    handleDelete={props.handleDelete}
                    handleFireBaseUpload={props.handleFireBaseUpload}
                    handleImageAsFile={props.handleImageAsFile}
                     />
    })  
        return(
            <div className ='mapped-recipes'>
                {mappedRecipes} 
            </div>
        )
}         

export default UserRecipeList