import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const recipeAxios = axios.create()

recipeAxios.interceptors.request.use((config)=>{
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

class UserRecipe extends Component{ 
    constructor(props){
        super(props)
        this.state={
            name: props.name,
            author: props.author,
            description: props.description,
            imageAsUrl: props.imgUrl,
            ingredients: props.ingredients,
            dietType: props.dietType,
        }
    }

    handleChange = (e) =>{
        const {name, value} = e.target
        this.setState({
            [name]: value
        }) 
    }

    handleIngredientsChange = (e) => {
        const {value} = e.target
        const updatedIngredientsArr = value.split(",")
        this.setState({
            ingredients: updatedIngredientsArr
        })
    }
    
    handleSubmit = e =>{
        e.preventDefault()
        const { name, author, description, imgUrl, ingredients, dietType } = this.state
        const updateObj = {
            name: name,
            author:author,
            description: description,
            imgUrl: imgUrl,
            ingredients: ingredients,
            dietType: dietType,
        }
            this.props.handle.handleSubmit()
            this.props.handleEdit(this.props._id, updateObj)
    }    

    render(){
        const mappedIngredients = this.state.ingredients.map(ingredient =>{
            return <li key={ingredient}>{ingredient}</li>
        })
        return (
            <div className='recipe-container'>
                <img src={this.props.imgUrl} alt='recipe'/>
                    <h4>Author: {this.props.author}</h4>
                <div className='info'>
                    <h1>{this.props.name}</h1>
                    <h3>{this.props.description}</h3>
                </div>
                <div className='ingredient-container'>
                    <h4>Ingredients</h4>
                    <ul>{mappedIngredients}</ul>
                </div>
                <div className='buttons'>
                    <Link to={{pathname: '/userRecipeForm'}}><button>Add/Delete Recipes</button></Link>
                    {/* separate add button for different state */}
                    <button onClick={ ()=> this.props.handleDelete(this.props._id)}>Delete Recipe</button>
    
                    </div> 
            </div>
        )
    }    
}

export default UserRecipe
