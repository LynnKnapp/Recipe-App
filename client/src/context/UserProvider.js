import React, {Component} from 'react'
import axios from 'axios'

const UserContext = React.createContext()

class UserProvider extends Component {
    constructor() {
        super()
        this.state={
            user: JSON.parse(localStorage.getItem('user')) || {},
            token: localStorage.getItem('token') || "",
            authErrMsg: ""
        }
    }

    login = credentials  =>{
        console.log('cred:', credentials)
        axios.post('/auth/login', credentials)
            .then(res => {
                console.log('response: ', res.data)
                const {user, token } = res.data //res.data comes from return res.status(201).send({token, user: savedUser})
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))
                this.setState({user, token, authErrMsg: ""}) //don't have to put key value pairs when using object literals here
            })
            .catch( err => this.handleAuthErr(err.response.data.errMsg))

    }

    signup = credentials => {
        axios.post('/auth/signup', credentials)
            .then(res => {
                const {user, token } = res.data //res.data comes from return res.status(201).send({token, user: savedUser})
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))
                this.setState({user, token, authErrMsg: ""}) //don't have to put key value pairs when using object literals here
            })
            .catch( err => this.handleAuthErr(err.response.data.errMsg))

    }

    handleAuthErr = errMsg => {
        this.setState({authErrMsg: errMsg})
    }

    logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        this.setState({
            user: {},
            token: ''
        })
        console.log("you are logged out")

    }


    render(){
        return(
            <UserContext.Provider
                value={{
                    ...this.state,
                    signup: this.signup,
                    login: this.login,
                    logout: this.logout
                }}>
                { this.props.children }
            </UserContext.Provider>    
        )
    }
}

export default UserProvider

export const withUser = C => props => (
    <UserContext.Consumer>
        { value => <C {...value} {...props}/> }
    </UserContext.Consumer>
)
   
