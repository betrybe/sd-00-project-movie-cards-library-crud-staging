import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Loading } from '../components';

import * as movieAPI from '../services/movieAPI';

import { match, history } from '../types/movieDetails';

import './styles/movieDetails.css';

class MovieDetails extends Component {
  constructor() {
    super();

    this.handleDelete = this.handleDelete.bind(this);
    this.saveState = this.saveState.bind(this);

    this.state = {
      movie: {},
      loading: true,
      pointlessState: {},
    };
  }

  async componentDidMount() {
    const { id } = this.props.match.params;

    const movie = await movieAPI.getMovie(id);

    this.saveState(movie);

    console.log(this.state.pointlessState);
  }

  saveState(movie) {
    this.setState({
      movie,
      loading: false,
      pointlessState: this.props.match,
    });
  }

  async handleDelete(event) {
    event.preventDefault();
    const { id } = this.props.match.params;
    const { push } = this.props.history;

    await movieAPI.deleteMovie(id);

    push('/');
  }

  render() {
    const { movie, loading } = this.state;

    if (loading) return <Loading />;

    const {
      id, title, storyline, imagePath, genre, rating, subtitle,
    } = movie;

    return (
      <div className="movie-details-container">
        <div data-testid="movie-details" className="movie-container">
          <div className="movie-details">
            <img alt="Movie Cover" src={`../${imagePath}`} />
            <div className="info">
              <h2>{title}</h2>
              <p>{`Subtitle: ${subtitle}`}</p>
              <p>{`Storyline: ${storyline}`}</p>
              <p>{`Genre: ${genre}`}</p>
              <p>{`Rating: ${rating}`}</p>
              <div className="links">
                <Link to="/">VOLTAR</Link>
                <Link to="/" onClick={this.handleDelete}>DELETAR</Link>
                <Link to={`/movies/${id}/edit`}>EDITAR</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MovieDetails;

MovieDetails.propTypes = {
  match: PropTypes.shape(match).isRequired,
  history: PropTypes.shape(history).isRequired,
};
