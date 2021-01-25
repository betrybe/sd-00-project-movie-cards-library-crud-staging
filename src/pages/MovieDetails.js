import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as movieAPI from '../services/movieAPI';
import { Loading } from '../components';

class MovieDetails extends Component {
  constructor() {
    super();
    this.fetchMoviesId = this.fetchMoviesId.bind(this);
    this.removeMovie = this.removeMovie.bind(this);
    this.state = {
      movie: {},
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchMoviesId();
  }

  async fetchMoviesId() {
    const { id } = this.props.match.params;
    const requestReturn = await movieAPI.getMovie(id);
    this.setState({
      movie: requestReturn,
      loading: false,
    });
  }

  removeMovie(id) {
    movieAPI.deleteMovie(id);
  }

  render() {
    if (this.state.loading) return <Loading />;

    const myMovie = this.state.movie;

    const { id, title, storyline, imagePath, genre, rating, subtitle } = myMovie;

    return (
      <div data-testid="movie-details">
        <img alt="Movie Cover" src={ `../${imagePath}` } />
        <p>{`Title: ${title}`}</p>
        <p>{`Subtitle: ${subtitle}`}</p>
        <p>{`Storyline: ${storyline}`}</p>
        <p>{`Genre: ${genre}`}</p>
        <p>{`Rating: ${rating}`}</p>
        <button type="button">
          <Link to="/">VOLTAR</Link>
        </button>
        <button type="button">
          <Link to={ `/movies/${id}/edit` }>EDITAR </Link>
        </button>

        <button type="button" onClick={ () => this.removeMovie(id) }>
          <Link to="/">DELETAR</Link>
        </button>

      </div>
    );
  }
}

MovieDetails.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  storyline: PropTypes.string,
  imagePath: PropTypes.string,
  genre: PropTypes.string,
  rating: PropTypes.number,
}.isRequired;

export default MovieDetails;
