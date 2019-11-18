import React from 'react'

const HealthyRecipe = (props) =>{
    const mappedIngredients = props.ingredients.map(ingredient =>{
        return <li>{ingredient}</li>
    })
    return(
        <div className='recipe-container'>
            <img src={props.imgUrl} alt='recipe'/>
                <h4 className= 'text'>Author: {props.author}</h4>
            <div className='info'>
                <h1 className= 'text'>{props.name}</h1>
                <h3 className= 'text'>{props.description}</h3>
            </div>
            <div className='ingredients'>  
                <h5 className='ingredient-text'>Ingredients</h5>
                <ul className= 'text'>{mappedIngredients}</ul>
            </div>
        </div>
    )
}

export default HealthyRecipe