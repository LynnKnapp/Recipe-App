import React from 'react'
import ReactDOM from "react-dom"
import App from './App.js'
import { BrowserRouter } from 'react-router-dom'
import UserProvider from './context/UserProvider.js'
import ImageUploadProvider from './context/ImageUploadProvider'
import "./styles.css"




ReactDOM.render(
    <BrowserRouter>  
        <UserProvider>
            <ImageUploadProvider>
                <App/>
            </ImageUploadProvider>
        </UserProvider>
    </BrowserRouter> ,
    document.getElementById('root'))

