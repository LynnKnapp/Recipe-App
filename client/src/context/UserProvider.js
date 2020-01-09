import React, {Component} from 'react'
import axios from 'axios'


const UserContext = React.createContext()
const userAxios = axios.create()

userAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

class UserProvider extends Component {
    constructor() {
        super()
        this.state={
            user: JSON.parse(localStorage.getItem('user')) || {},
            token: localStorage.getItem('token') || "",
            authErrMsg: "",
            
        }
    }

      
    signup = credentials => {
        axios.post('/auth/signup', credentials)
            .then(res => {
                const {user, token } = res.data //res.data comes from return res.status(201).send({token, user: savedUser})
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))
                this.setState(prevState => ({
                        user: user,
                        token: token,
                        authErrMsg: ''
                    }) 
                )
            })
            .catch( err => this.handleAuthErr(err.response.data.errMsg))

    }
   
    
    login = credentials  =>{
        console.log('cred:', credentials)
        axios.post('/auth/login', credentials)
            .then(res => {
                console.log('response: ', res.data)
                const {user, token } = res.data //res.data comes from return res.status(201).send({token, user: savedUser})
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))
                this.setState(prevState => ({
                        user: user,
                        token: token,
                        authErrMsg: ''
                    }) 
                )
                })    
            .catch( err => this.handleAuthErr(err.response.data.errMsg))

    }

    handleAuthErr = errMsg => {
        alert(errMsg)
        this.setState(prevState =>({
            authErrMsg: errMsg
        }))
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
 