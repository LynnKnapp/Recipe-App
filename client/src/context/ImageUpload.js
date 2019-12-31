import React, {Component} from 'react'
import firebase from '../components/firebase'
import {storage} from '../components/firebase'

const ImageContext = React.createContext()

class ImageUpload extends Component{
    constructor(props){
        super(props)
        this.state ={
            image: null,
            url: '',
            progress: 0
        }
        
    }
    handleChange = e =>{
        const {name, value} = e.target
        this.setState({
            [name]: value
        })
    }
    handleUpload = () =>{
        const {image} = this.state;
        const upLoadTask = storage.ref(`images/${image.name}`).put(image);
        upLoadTask.on('state_changed', 
        (snapshot) =>{
            // progress function ...
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            this.setState({progress})
        },
         (error) =>{
             //error function...
             console.log(error)
         }, () =>{
            // complete function
            storage.ref('images').child(image.name).getDownloadURL.then(url =>{
                console.log(url);
                this.setState({url});
            })
         });
    }
    render() {
        const style ={
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        };
        return(
            <div style ={style}>
                <progress value ={this.state.progress} max= '100'/>
                <input type="file" onChange={this.handleChange}/>
                <button onChange ={this.handleUpload}>Upload</button>
                <br/>
                <img src={this.state.url} alt='Uploaded Images' height='300' width='400'/>
            </div>
        )
    }
}
export default ImageUpload

export const withUser = D => props => (
    <ImageContext.Consumer>
        { value => <D {...value} {...props}/> }
    </ImageContext.Consumer>
)