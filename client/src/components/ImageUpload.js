import React, {Component} from 'react';
import {storage} from '../firebase';

class ImageUpload extends Component{
    constructor(props){
        super(props)
        this.state ={
            image: null,
            url: '',
            progress: 0
        }
        this.handleChange = this
        .handleChange
        .bind(this);
        this.handleUpload = this.handleUpload.bind(this)
    }
    handleChange = e =>{
        if(e.target.files[0]){
            const {image} = e.target.files[0];
            this.setState(() =>({image}));
        }
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