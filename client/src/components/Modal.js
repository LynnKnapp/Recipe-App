import React, {Component} from 'react'
import './Modal.css';

//finish component- rough skeleton

class Modal extends Component {
    constructor(props){
        super(props)
        this.state={
            showRecipes: false,
            name: props.name,
            author: props.author,
            description: props.description,
            imageAsUrl: props.imgUrl,
            ingredients: props.ingredients,
            dietType: props.dietType,
        }
    }
    render(){
        return (
            
            <div className="modal">
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
            </div>
        )
    }
}

export default modal;

