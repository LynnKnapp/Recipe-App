import React, {Component} from 'react'
import IndulgentRecipe from './IndulgentRecipe.js'
import axios from 'axios'


const recipeAxios = axios.create()

recipeAxios.interceptors.request.use((config)=>{
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})


class IndulgentRecipeList extends Component{
      constructor(){
          super()
          this.state ={
              indulgentRecipes: []
          }
      } 
      
      componentDidMount() {
          this.getIndulgentRecipes()
      }

      getIndulgentRecipes = () =>{
            recipeAxios.get("/api/recipe/indulgent")
            .then(res =>{
                this.setState({
                    indulgentRecipes: res.data
                })
            })
            .catch(err =>console.log(err))
      }
      
      render(){
          const mappedIndulgentRecipes = this.state.indulgentRecipes.map(recipe =>{
              return <IndulgentRecipe 
                    indulgentArr={this.state.recipe} 
                    {...recipe} 
                    key={recipe._id} />
          })
          return(
             <div className='ind-recipe'>
                   {mappedIndulgentRecipes} 
             </div>
          )
      }
}

export default IndulgentRecipeList