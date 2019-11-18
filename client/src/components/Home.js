import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import '../styles/home1.css'

import Auth from './Auth'



const Home = () => {
    return(
        <div className="home">
            <div className='title' >
                <div className='img'>
                    <h1>Incredible Edibles</h1> 
                </div>
            </div>    
            <div className='sub-title'> 
                <h1>Where We Are Constantly Debugging the Foods We Eat</h1> 
                <h2>To Bring You The Best Recipes</h2>
                <h2>Healthy or Indulgent</h2>
                <h3>You Choose</h3>
                <div className='home-img'>
                    <Link to ='indulgent'><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtG4dfw4QcvV2JmEtLmAtVV17av_aFxFjeGOOEUzzcK01oI8K9hA&s'/></Link>
                    <Link to ='healthy'><img src='https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/1472483520-springtacos-1572537127.jpg?crop=1.00xw:0.336xh;0,0.213xh&resize=1200:*'/></Link>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Home)