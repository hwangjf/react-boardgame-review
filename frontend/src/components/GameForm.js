import React, { Component } from 'react';
import GenreDropdown from './GenreDropdown';

export default class GameForm extends Component {
  state = {
    name: "",
    genre: {
      id: "",
      name: "",
    }
  }

  selectGenre = (event) => {
    const genre = this.props.genres.find(genre => genre.id === event.target.value);
    this.setState({ genre });
  }

  handleChange = (event) => {
    this.setState({name:event.target.value})
  }

  handleSubmit = (event) => {
    event.preventDefault()
    // console.log(this.state)
    const config = {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {"content-type":"application/json"}
    }
    fetch("http://localhost:3000/boardgames",config)
      .then(this.props.getGames())
  }

  render() {
    return (
      <div className="gameform">
        <form className="create" onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              placeholder="Filter board games by name"
            />
          </label>
          <GenreDropdown
            genres={this.props.genres}
            currentGenre={this.state.genre}
            handleDropdown={this.selectGenre}
          />
          <input type="submit" value="Add Game" />
        </form>
      </div>
    )
  }
}
