import React, {Component} from 'react'
import './Modal.css';

//finish component- rough skeleton

class Modal extends Component {
    constructor(){
        super()
        this.state={
            modal: false

        }
    }
    openModal = (e) => {this.setState({ modal: true });

    closeModal = () => this.setState({ modal: false });    
    
    render(){
        return (
            
            <div className="modal">
                
            </div>
        )
    
}

export default modal;

