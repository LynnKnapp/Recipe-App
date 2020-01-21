import React from 'react' 



const FavoriteRecipe =(props) => {

    

    
    const mappedIngredients = this.props.ingredients.map(ingredient =>{
        return <li>{ingredient}</li>
    })
        return(
            <div className='recipe-container'>
                <div className='favorite-btn'>
                    <button>Add to My Recipes</button>
                </div>
                <img src={this.props.imgUrl} alt='recipe'/>
                <div className='info'>
                    <h1 className= 'text'>{this.props.name}</h1>
                    <h3 className= 'text'>{this.props.description}</h3>
                    <h4 className= 'text'>{this.props.author}</h4>
                </div>
                <div className='ingredients'>
                    <h3>Ingredients</h3>
                    <ul className= 'text'>{mappedIngredients}</ul>
                </div>
                
            </div>
        )
    }


export default IndulgentRecipe