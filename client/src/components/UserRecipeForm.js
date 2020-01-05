import React ,{ useState }from 'react'
import UserRecipe from './UserRecipe.js'
import {storage} from './firebase'
import {Link} from 'react-router-dom'


function UserRecipeForm (props) {
    const allInputs = {imgUrl: ''}
    const [imageAsUrl, setImageAsUrl] = useState(allInputs)
    const [imageAsFile, setImageAsFile] = useState('')
    
    console.log(imageAsFile)
    
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
                     <Link to={{pathname: '/myRecipes'} }><button>Post to My Recipes</button></Link>
                    <img src={imageAsUrl.imgUrl} alt="image_tag" style={{width: 300, height: 300}}/>  
                  </div>        
         </div>       
    )
} 
       

export default UserRecipeForm