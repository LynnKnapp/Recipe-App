import React, {useState} from 'react'
import axios from 'axios'
import UserRecipeList from './UserRecipeList'
import {storage} from './firebase'

const recipeAxios = axios.create()

recipeAxios.interceptors.request.use((config)=>{
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})



function UserRecipe (props){

    const allInputs = {imgUrl: ''}
    const [imageAsUrl, setImageAsUrl] = useState(allInputs)
    const [imageAsFile, setImageAsFile] = useState('')
    const [showRecipes, setShowRecipes] = useState(false)
    const [name, setName] = useState(props.name)
    const [author, setAuthor] =useState(props.author)
    const [description, setDescription] =useState(props.description)    
    const [imgUrl, setImgUrl] = useState(props.imgUrl)        
    const [ingredients, setIngredients] = useState(props.ingredients)
    const[dietType, setDietType] = useState(props.dietType)
            
        

    const editToggler = () => {
        console.log('edit Toggler')
        return setShowRecipes(prevState =>({
            setShowRecipes: !prevState.showRecipes
        }))
    }

    const handleChange = (e) =>{
        setName(e.target.value)
    }

    const handleIngredientsChange = (e) => {
        const {value} = e.target
        const updatedIngredientsArr = value.split(",")
        setIngredients(updatedIngredientsArr)
        
    }
    
    const handleSubmit = e =>{
        e.preventDefault()

        const updateObj = {
            name: props.name,
            author: props.author,
            description: props.description,
            imgUrl: props.imgUrl,
            ingredients: props.ingredients,
            dietType: props.dietType,
        }
            props.handleSubmit(updateObj)
            props.handleEdit(props._id, updateObj)

    }    


        const mappedIngredients= ingredients.map(ingredient =>{
            return <li key={ingredient}>{ingredient}</li>
        })

        const handleImageAsFile = (e) => {
            const image = e.target.files[0]
            setImageAsFile(imageFile => (image))
        }

        const handleFireBaseUpload = e => {
            e.preventDefault()
            console.log('start of upload')
    
            if(imageAsFile === '') {
                console.error(`not an image, the image file is a ${typeof(imageAsFile)}`)
          }
          const uploadTask = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile)
          
          uploadTask.on('state_changed', 
          (snapShot) => {
            
            console.log(snapShot)
          }, (err) => {
            
            console.log(err)
          }, () => {
            
            storage.ref('images').child(imageAsFile.name).getDownloadURL()
             .then(fireBaseUrl => {
               setImageAsUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl}))
             })
          })
        }

        
        

        return (
            <div className='recipe-container'>
                   { !showRecipes ?
                <>   
                    <img src={imgUrl} alt='recipe'/>
                        <h4>Author: {author}</h4>
                    <div className='info'>
                        <h1>{name}</h1>
                        <h3>{description}</h3>
                    </div>
                    <div className='ingredient-container'>
                        <h4>Ingredients</h4>
                        <ul>{mappedIngredients}</ul>
                    </div>
                    <div className='buttons'>
                        <button onClick={editToggler} 
                           >
                           Add/ Edit Recipe</button>
                    
                        <button onClick={ ()=> this.props.handleDelete(this.props._id)}>Delete Recipe</button>
        
                    </div> 
                </>
                :
                <>
                <div className='recipeform-container'>
                    <form className= 'recipe-form' onSubmit={handleSubmit}>
                        Recipe Name<input
                            type='text'
                            value={name}
                            onChange={handleChange}
                            name='name'/> Author
                        <input
                            type='text'
                            value={author}
                            onChange={handleChange}
                            name='author'/> Description
                        <input
                            type='text'
                            value={description}
                            onChange={handleChange}
                            name='description'/>Ingredients
                        <input
                            type='url'
                            value={imgUrl}
                            onChange={handleChange}
                            name='imgUrl'/>Ingredients 
                        <input
                            type='text'
                            value={ingredients}
                            onChange={handleIngredientsChange}
                            name='ingredients'/>Diet Type 
                        <select name='dietType' value={dietType} onChange={handleChange}>
                            <option placeholder= 'Diet Type'>Diet Type</option>    
                            <option value="Healthy">Healthy</option>
                            <option value="Indulgent">Indulgent</option>
                        </select>
                    <button>Submit</button> 
                    </form>
                    <div className='firebase-images'>  
                     <form onSubmit={handleFireBaseUpload}>
                    <input  
                        type="file"
                        onChange={handleImageAsFile}
                     />
                    <button>Upload Recipe Image</button>
                    </form>
                    <img src={imageAsUrl.imgUrl} alt="image_tag" style={{width: 300, height: 300}}/>  
                  </div> 
                </div>
                </>
                }
             </div> 
        )
    }    


export default UserRecipe