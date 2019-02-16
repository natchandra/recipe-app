import React, { Component } from 'react';
import './App.css';
import Form from './Component/Form'
import axios from 'axios'
import Recipes from './Component/Recipes'

const API_KEY= "dd3c77f26bccb848fbce3cecc49e6460";
class App extends Component {
  state={
    recipes: []
  }
  
  componentDidMount = () =>{
    if(localStorage.getItem("recipes")!==null){
      const json = localStorage.getItem('recipes');
      let recipes = JSON.parse(json);
      this.setState({
        recipes
      })
    }else{
      axios.get(`https://www.food2fork.com/api/search?key=${API_KEY}&q=chicken&page=2`)
      .then(res => this.setState({
        recipes: res.data.recipes
      }));
    }
  }
  getRecipe = (e) => {
    e.preventDefault();
    const recipeName= e.target.elements.recipeName.value
    axios.get(`https://www.food2fork.com/api/search?key=${API_KEY}&q=${recipeName}&page=2`)
    .then(res => this.setState({
      recipes: res.data.recipes
    }));
    
    console.log(this.state.recipes);
  }
  
  componentDidUpdate = () =>{
    const recipes = JSON.stringify(this.state.recipes);
    localStorage.setItem("recipes",recipes); 
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title"> Recipe Search</h1>
        </header>
          <Form  getRecipe={this.getRecipe}/>
          <Recipes recipeData={this.state.recipes} />
      </div>
    );
  }
}

export default App;
