import React from 'react'
import ReactDOM from "react-dom"
import App from './App.js'
import { BrowserRouter } from 'react-router-dom'
import UserProvider from './context/UserProvider.js'
import ImageUpload from './context/ImageUpload'
import "./styles.css"


ReactDOM.render(
    <BrowserRouter>  
        <UserProvider>
            <ImageUpload>
                <App/>
            </ImageUpload>
        </UserProvider>
    </BrowserRouter> ,
    document.getElementById('root'))

