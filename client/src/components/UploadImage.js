import React ,{useState}from 'react'
import {storage} from './firebase/firebase'


function UploadImage (props){

    
    const allInputs = {imgUrl: ''}
    const [imageAsUrl, setImageAsUrl] = useState(allInputs)
    const [imageAsFile, setImageAsFile] = useState('')

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
     
    return(
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
    )
}
 export default UploadImage 
