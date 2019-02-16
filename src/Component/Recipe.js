import React, { Component } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'

const API_KEY= "dd3c77f26bccb848fbce3cecc49e6460";
class Recipe extends Component{
    state={
        activedRecipe:[]
    }
    componentDidMount= () =>{
        const title = this.props.location.state.recipe;
        console.log(title);
        axios.get(`https://www.food2fork.com/api/search?key=${API_KEY}&q=${title}`)
        .then(res => this.setState({
            activedRecipe: res.data.recipes[0]
        }));
    }
    render(){
        const recipe = this.state.activedRecipe;
        return(
            <div className="container">
                <div className="active-recipe">
                    <img className="active-recipe__img" src={recipe.image_url} alt={recipe.title} />
                    <h3 className="active-recipe__title"> {recipe.title} </h3>
                    <h4 className="active-recipe__publisher"> {recipe.pubisher} </h4>
                    <p className="active-recipe__website">Website: 
                        <span><a href={recipe.publisher_url}>{recipe.publisher_url}</a></span>
                    </p>
                    <button className="active-recipe__button">
                        <Link to="/">Go Home</Link>
                    </button>
                </div>
                
            </div>
        )
    }
}

export default Recipe