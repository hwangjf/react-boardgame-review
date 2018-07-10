import React, { Component } from 'react';
import GameFilters from './GameFilters';
import GamesTable from '../components/GamesTable';
import GameForm from '../components/GameForm';

export default class BoardGameContainer extends Component {
  state = {
    games: [],
    genres: [],
    currentGenre: {
      id: "",
      name: "",
    },
    nameValue: '',
    filteredGames: []
  }

  componentDidMount() {
    fetch('http://localhost:3000/genres')
      .then(response=>response.json())
      .then(data=> this.setState({genres:data}))
    this.getGames()
  }

  getGames = () => {
    fetch('http://localhost:3000/boardgames')
      .then(response => response.json())
      .then(data => this.setState({ games: data, filteredGames: data }))
  }

  genreFilter = (event) => {
    
    // Option 1: match by name === value
    // const currentGenre = this.state.genres.find(genre => genre.name === event.target.value);
    // Option 2: change value to id in <option> and for controlled value in <select> and match by id === value
    //           Remember: The content of this attribute represents the value to be submitted with the form.
    //                     There's no rule about it having to match the name displayed.
    // console.log(event.target.value)
    const currentGenre = this.state.genres.find(genre => {
        return genre.id === parseInt(event.target.value,10)
      }
    );

    
    // Option 3: pull id out using index + data attribute, then match on id
    // const id = event.target.options[event.target.selectedIndex].dataset.value;
    // const currentGenre = this.state.genres.find(genre => genre.id == id);
    // Option 4: same as option 3 but use getAttribute
    // const id = event.target.options[event.target.selectedIndex].getAttribute('data-value');
    // const currentGenre = this.state.genres.find(genre => genre.id == id);

    // this.getGames()
    this.setState({ currentGenre },this.filteredGames);
  }

  handleChange = (event) => {
    this.setState({[event.target.name]:event.target.value})
  }
  
  handleNameSubmit = (event) => {
    event.preventDefault()
    const filteredGames = this.state.games.filter(game=>{
      return game.name.toLowerCase().includes(this.state.nameValue.toLowerCase())
    })
    this.setState({filteredGames})
  }

  filteredGames = () => {
    const filteredGames = this.state.games.filter(game=>{
      return game.genre.id === this.state.currentGenre.id
    })
    this.setState({ filteredGames})
  }


  render() {
    return (
      <div className="board-game-container">
        <GameFilters
          genres={this.state.genres}
          currentGenre={this.state.currentGenre}
          handleGenreFilter={this.genreFilter}
          nameValue={this.state.name}
          handleChange={this.handleChange}
          handleNameSubmit={this.handleNameSubmit}
        />
        <GameForm
          getGames={this.getGames}
          genres={this.state.genres}
          handleSubmit={this.handleSubmit}
        />
    
        <GamesTable games={this.state.filteredGames}/>
      </div>
    )
  }
}
