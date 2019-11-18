import React, {Component} from 'react'
import HealthyRecipe from './HealthyRecipe.js'
import axios from 'axios'


const recipeAxios = axios.create()

recipeAxios.interceptors.request.use((config)=>{
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

class HealthyRecipeList extends Component{
    constructor(){
        super()
        this.state={
            healthyRecipes: []
        }
    }

    componentDidMount(){
        this.getHealthyRecipes()
    }

    getHealthyRecipes = () =>{
        recipeAxios.get('/api/recipe/healthy')
        .then(res => {
            this.setState({
                healthyRecipes: res.data
            })
        })
        .catch(err => console.log(err))
    }

    render(){
        const mappedHealthyRecipes = this.state.healthyRecipes.map(recipe =>{
            return <HealthyRecipe healthyArr={this.state.recipe} {...recipe} key={recipe._id}/>
        })
            return(
                <div className='ind-recipe'>
                    {mappedHealthyRecipes}
                </div>

            )
    }
}

export default HealthyRecipeList