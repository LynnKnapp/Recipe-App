import React, {Component} from 'react'
import AuthForm from './AuthForm.js'
import { withUser } from '../../context/UserProvider.js'
import { Redirect } from 'react-router-dom'



class Auth extends Component {
    constructor(){
        super()
        this.state={
            username: '',
            password: '',
            toggle: false
        }
    }

    toggler = () => {
        this.setState(prevState => ({ toggle: !prevState.toggle}))
    }

    handleChange = e =>{
        const {name, value} = e.target
        // ,()=>{
            //     alert('successfully signed up')
            //     push('/healthy')
            // }
        this.setState({ [name]: value})
    }

    handleSignupSubmit = e => {
        e.preventDefault()
        const creds ={
            username: this.state.username,
            password: this.state.password
        }
        this.props.signup(creds)

    }

    handleLoginSubmit = e => {
        e.preventDefault()
        const creds ={
            username: this.state.username,
            password: this.state.password
        }
        this.props.login(creds)
    }


    render(){
        if(this.props.token){
            return (<Redirect to='/' />)
        }

        return(
            <div className= 'auth-form'>
                { !this.state.toggle ? 
                   <> 
                        <AuthForm
                            username= {this.state.username}
                            password={this.state.password}
                            handleChange={this.handleChange}
                            handleSubmit={this.handleSignupSubmit}
                            btnText='Sign Up'
                        />
                        <p style={{color: 'blue'}}>{this.props.authErrMsg} </p>
                        <button  className='toggler-btn' onClick={this.toggler}>I already have an account</button>
                    </>
                : 
                    <>
                        <AuthForm
                            username= {this.state.username}
                            password={this.state.password}
                            handleChange={this.handleChange}
                            handleSubmit={this.handleLoginSubmit}
                            btnText='Login'
                        /> 
                        <button className='toggler-btn' onClick={this.toggler}>I don't have an account</button>
                        <p style={{color: 'red'}}>{this.props.authErrMsg} </p>
                    </>
                }
            </div>
        )
    }
}


export default withUser(Auth)
