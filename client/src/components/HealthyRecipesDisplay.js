import React from 'react'
import HealthyRecipeList from './HealthyRecipeList.js'




const HealthyRecipesDisplay = (props) => {
    return(
        <div className='healthy-display'>
            <h1>Heavenly Healthy Goodness</h1>
            <HealthyRecipeList/>
        </div>
    )
}


export default HealthyRecipesDisplay