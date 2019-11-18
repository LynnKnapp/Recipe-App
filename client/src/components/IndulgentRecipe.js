import React from 'react' 



const IndulgentRecipe = (props) =>{
    const mappedIngredients = props.ingredients.map(ingredient =>{
        return <li>{ingredient}</li>
    })
    return(
        <div className='recipe-container'>
            <img src={props.imgUrl} alt='recipe'/>
            <div className='info'>
                <h1 className= 'text'>{props.name}</h1>
                <h3 className= 'text'>{props.description}</h3>
                <h4 className= 'text'>{props.author}</h4>
            </div>
            <div className='ingredients'>
                <ul className= 'text'>{mappedIngredients}</ul>
            </div>
            
        </div>
    )
}

export default IndulgentRecipe