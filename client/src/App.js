import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import {withUser} from './context/UserProvider.js'
import Navbar from './components/Navbar.js'
import Home from './components/Home.js'
import HealthyRecipesDisplay from './components/HealthyRecipesDisplay.js'
import IndulgentRecipesDisplay from './components/IndulgentRecipesDisplay.js'
// import UserRecipe from './components/UserRecipe.js'
// import UserRecipeForm from './components/UserRecipeForm.js'
import MyRecipes from './components/MyRecipes.js'
import Auth from './components/Auth'


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
                        <Route path='/userrecipe' component={MyRecipes}/> 
                        {/*<Route path='/userrecipeform' component={UserRecipeForm}/>*/}
                        <Route exact path = "/register" render={rProps => <Auth {...rProps}/>}
                        />
                    </Switch>             
            </div>
        ) 
    }
}
export default withUser(App)
