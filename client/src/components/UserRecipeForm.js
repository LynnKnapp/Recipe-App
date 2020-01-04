import React, {useState} from 'react'
import UserRecipe from './UserRecipe.js'
// import ImageUpload from './ImageUpload.js'


const UserRecipeForm = props =>{
     
    
    return (
            <div className='recipeform-container'>
                <form className= 'recipe-form' onSubmit={props.handleSubmit}>
                    Recipe Name<input
                        type='text'
                        value={props.name}
                        onChange={props.handleChange}
                        name='name'/> Author
                    <input
                        type='text'
                        value={props.author}
                        onChange={props.handleChange}
                        name='author'/> Description
                    <input
                        type='text'
                        value={props.description}
                        onChange={props.handleChange}
                        name='description'/>Ingredients
                    <input
                        type='text'
                        value={props.ingredients}
                        onChange={props.handleChange}
                        name='ingredients'/> 
                    <select name='dietType' value={props.dietType} onChange={props.handleChange}>
                        <option placeholder= 'Diet Type'>Diet Type</option>    
                        <option className = 'selection' value="Healthy">Healthy</option>
                        <option className = 'selection' value="Indulgent">Indulgent</option>
                    </select>
                    <button>Submit</button>  
                </form>
                
            </div>    
        
            
      
    )      
}
       

export default UserRecipeForm