import React, {Component} from 'react'
import FavoriteRecipe from './HealthyRecipe.js'
import axios from 'axios'


const recipeAxios = axios.create()

recipeAxios.interceptors.request.use((config)=>{
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

class FavoriteRecipeList extends Component{
    constructor(){
        super()
        this.state={
            favoriteRecipes: []
        }
    }

    componentDidMount(){
        this.getFavorites()
        
    }

    getFavorites = () =>{
        recipeAxios.get('/api/recipe/favorite')
        .then(res => {
        this.setState(prevState =>{
            return {recipes: [...prevState.recipes, ...res.data]}

        })
            
    
    })
    .catch(err => console.log(err))
    }

    render(){
        const mappedFavoriteRecipes = this.state.favoriteRecipes.map(recipe =>{
            return <FavoriteRecipe favoriteArr={this.state.recipe} {...recipe} key={recipe._id}/>
        })
            return(
                <div className='ind-recipe'>
                    {mappedFavoriteRecipes}
                </div>

            )
    }
}

export default FavoriteRecipeList