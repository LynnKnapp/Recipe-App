import React from 'react'
import UserRecipe from './UserRecipe.js'

const UserRecipeForm = props =>{
    
        return(
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
                            name='description'/>imgUrl
                        <input
                            type='url'
                            value={props.imgUrl}
                            onChange={props.handleChange}
                            name='imgUrl'/>Ingredients
                        <input
                            type='text'
                            value={props.ingredients}
                            onChange={props.handleChange}
                            name='ingredients'/> 
                        <select name='dietType' value={props.dietType} onChange={props.handleChange}>
                            <option placeholder= 'Diet Type'>Diet Type</option>    
                            <option value="Healthy">Healthy</option>
                            <option value="Indulgent">Indulgent</option>
                        </select>
                    <button onSubmit={props.handleSubmit}>Submit</button> 
                </form>
            </div>
        )
}
       

export default UserRecipeForm