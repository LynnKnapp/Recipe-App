import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import Navbar from './components/Navbar.js'
import Home from './components/Home.js'
import HealthyRecipesDisplay from './components/HealthyRecipesDisplay.js'
import IndulgentRecipesDisplay from './components/IndulgentRecipesDisplay.js'
import MyRecipes from './components/MyRecipes.js'
import MyRecipeForm from './components/MyRecipeForm.js'
import Auth from './components/Auth'
import ImageUpload from './components/ImageUpload.js'





class App extends Component{

    render(){
        const {token, logout} = this.props
        
        return(
            <div className= 'app'> 
                <Navbar token ={token} logout ={logout}/>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/healthy' component={HealthyRecipesDisplay}/>
                        <Route path='/indulgent' component={IndulgentRecipesDisplay}/>
                        <Route path='/MyRecipe' component={MyRecipes}/> 
                        <Route path='/MyRecipeForm' component={MyRecipeForm}/>
                        <Route exact path = "/register" render={rProps => <Auth {...rProps}/>}
                        />
                    </Switch>             
            </div>
        ) 
    }
}
export default App
