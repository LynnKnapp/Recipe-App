import React, {Component} from 'react'
import UserRecipeList from './UserRecipeList.js'
import UserRecipeForm from './UserRecipeForm.js'
import axios from 'axios'


const recipeAxios = axios.create()

recipeAxios.interceptors.request.use((config)=>{
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})


class MyRecipes extends Component{
        constructor(){
            super()
            this.state={
                name: "",
                author: "",
                description: "",
                imgUrl: '',
                ingredients: [],
                dietType: '',
                showForm: false,
                showRecipes: false,
                recipes: []
            }
        }

        componentDidMount(){
            this.getRecipes()
        }

        toggleForm = () => {
           console.log("editbutton hit")
            return this.setState(prevState =>({
                showForm: !prevState.showForm
            }))
        }

        // toggleMyRecipes = () => {
        //     console.log('hello jerry')
        //     return this.setState(prevState =>({
        //         showRecipes: !prevState.showRecipes
        //     }))
        // }
        
        getRecipes = () =>{
            recipeAxios.get("/api/recipe/userRecipe")
            .then(res => {
                this.setState({
                    recipes: res.data
                })
            })
            .catch(err =>console.log(err))
        }

        handleChange = (e) =>{
           
            
            const {name, value} = e.target
            this.setState({
                [name]: value
            }) 
        }

        handleSubmit = e =>{
            e.preventDefault()
            const { name, author, description, imgUrl, ingredients, dietType } = this.state
            const newRecipe = { name, author, description, imgUrl, ingredients, dietType }
            recipeAxios.post('/api/recipe/userRecipe', newRecipe)
            .then(res =>{
                this.setState(prevState =>({
                    name: "",
                    author: "",
                    description: "",
                    imgUrl: "",
                    ingredients: "",
                    dietType: "",
                    recipes: [...prevState.recipes, res.data ]
                }))
            })
            .catch(err => console.log(err))
        }
        handleDelete = (id) =>{
        
            recipeAxios.delete(`api/recipe/userRecipe/${id}`)
                .then((res)=>{
                    this.setState(prevState =>{
                        const filteredArr = prevState.recipes.filter(recipe =>{
                            return id = recipe._id
                        })
                        return{recipes: filteredArr}
                    })
                })
        }

        handleEdit = (id, updates) => {
            
            recipeAxios.put(`api/recipe/userRecipe/${id}`, updates)
                .then(res => {
                    this.setState(prevState => ({
                        recipes: prevState.recipes.map(recipe => recipe._id === id ? res.data : recipe)
                    }))
                })
                .catch(err => console.log(err))
        }

    render(){  
        // console.log('da form', this.state.showForm)
        return(
            <div className = 'myRecipe-container'>
                { !this.state.showForm ?
                <>    
                    <div className = 'myRecipes'> 
                            <h1>My Recipes</h1> 
                            <UserRecipeList 
                                recipes={this.state.recipes}
                                handleDelete={this.handleDelete}
                                handleEdit={this.handleEdit}
                                

                            /> 
                           
                    </div>
                </>
                :
                <>    
                    <div className = 'add-edit'>  
                        <h2>Add a Favorite Recipe</h2>
                        <h3>Or Edit an Existing One</h3>
                        <button onClick={this.toggleForm}>Back to My Recipes</button>
                        <UserRecipeForm
                                name ={this.state.name}
                                author={this.state.author}
                                description={this.state.description}
                                imgUrl={this.state.imgUrl}
                                ingredients={this.state.ingredients}
                                dietType={this.state.dietType}
                                handleChange={this.handleChange}
                                handleSubmit={this.handleSubmit}
                                handleEdit={this.handleEdit}/>
                    </div>
                </>
                }    
            </div>
        )
    }
}

export default MyRecipes