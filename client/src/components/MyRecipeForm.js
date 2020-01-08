import React ,{ useState }from 'react'
import Recipe from './MyRecipe.js'
import {storage} from './firebase'
import {Link} from 'react-router-dom'


function UserRecipeForm (props) {
    const allInputs = {imgUrl: ''}
    const [imageAsUrl, setImageAsUrl] = useState(allInputs)
    const [imageAsFile, setImageAsFile] = useState('')
    const [showForm, setShowForm] = useState(false)
    
    console.log(imageAsFile)

    const toggleForm = () =>{
        setShowForm(prevState =>({
            showForm: !prevState.showForm
        }))
    }
    
    const handleImageAsFile = (e) => {
        const image = e.target.files[0]
        setImageAsFile(imageFile => (image))
    }

    const handleFireBaseUpload = e => {
        e.preventDefault()
        console.log('start of upload')
        // async magic goes here...
        if(imageAsFile === '') {
            console.error(`not an image, the image file is a ${typeof(imageAsFile)}`)
      }
      const uploadTask = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile)
      //initiates the firebase side uploading 
      uploadTask.on('state_changed', 
      (snapShot) => {
        //takes a snap shot of the process as it is happening
        console.log(snapShot)
      }, (err) => {
        //catches the errors
        console.log(err)
      }, () => {
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
        storage.ref('images').child(imageAsFile.name).getDownloadURL()
         .then(fireBaseUrl => {
           setImageAsUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl}))
         })
      })
    }
  
    return (
            <div className='recipeform-container'>
                <form className= 'form' onSubmit={props.handleSubmit}>
                    <input
                        type='text'
                        value={props.name}
                        onChange={props.handleChange}
                        name='name'
                        placeholder='Recipe Name'/>
                    <input
                        type='text'
                        value={props.author}
                        onChange={props.handleChange}
                        name='author'
                        placeholder='Author'/> 
                    <input
                        type='text'
                        value={props.description}
                        onChange={props.handleChange}
                        name='description'
                        placeholder='Description'/>
                    <input
                        type='text'
                        value={props.ingredients}
                        onChange={props.handleChange}
                        name='ingredients'
                        placeholder='Ingredients'/> 
                    <select name='dietType' value={props.dietType} onChange={props.handleChange}>
                        <option placeholder= 'Diet Type'>Diet Type</option>    
                        <option className = 'selection' value="Healthy">Healthy</option>
                        <option className = 'selection' value="Indulgent">Indulgent</option>
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
                    <Link to={{pathname: '/myRecipes', }}><button>Post to My Recipes</button></Link>
                </div>      
            </div>      
    )      
}
       

export default UserRecipeForm
