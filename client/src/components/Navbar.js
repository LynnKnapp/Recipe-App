import React,{Component} from 'react'
import { Link, withRouter } from 'react-router-dom'


class Navbar extends Component{
     constructor(props){
          super(props)
          this.state={
               showNav: false
          }
     }

     toggleMenu = () => {
          console.log('edit Toggler')
          
          return this.setState(prevState =>({
              showNav: !prevState.showNav
          }))
      }      
      render(){
          const {token, logout} = this.props
          return(
               <div className='menu-container'>
                    
                 <button className="menu" onClick={this.toggleMenu}>Menu/Sign-in</button>
                    
               <div style={{visibility: (this.state.showNav ? "" : "hidden")}} className='nav-container'>
                    <div className='nav' onClick = {this.toggleMenu}>
                         <Link className = {this.props.location.pathname === "/" ? "active" : ""}
                         to="/">Home</Link>

                         <Link className = {this.props.location.pathname === "/healthy" ? "active" : ""}
                         to="/healthy">Healthy Recipes</Link>

                         <Link className = {this.props.location.pathname === "/indulgent" ? "active" : ""}
                         to="/indulgent">Indulgent Recipes</Link>

                         <Link className = {this.props.location.pathname === "/userrecipe" ? "active" : ""} 
                         to="/userrecipe">My Recipes</Link>

                         <Link className = {this.props.location.pathname === "/register" ? "active" : ""} 
                         to= "register">SignIn / Register</Link>

                         { token !== "" && <button onClick = {logout}>Logout</button>}
                    </div>
               </div>
              </div> 
          )
     }
}     
     export default withRouter(Navbar)