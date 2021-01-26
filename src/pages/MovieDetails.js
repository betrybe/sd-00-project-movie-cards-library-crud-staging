import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as movieAPI from '../services/movieAPI';

import { match } from '../types/routerDom';

import { Loading } from '../components';

class MovieDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      movie: {},
    };
  }

  async componentDidMount() {
    await this.getMovieApi();
  }

  async getMovieApi() {
    const { match: { params } } = this.props;

    this.setState({
      loading: true,
    });

    const movie = await movieAPI.getMovie(params.id);

    this.setState({
      loading: false,
      movie,
    });
  }

  async deleteMovieApi(id) {
    await movieAPI.deleteMovie(id);
  }

  optionsComponent(id) {
    return (
      <>
        <Link to="/">VOLTAR</Link>
        <Link to={ `/movies/${id}/edit` }>EDITAR</Link>
        <Link to="/" onClick={ () => this.deleteMovieApi(id) }>DELETAR</Link>
      </>
    );
  }

  render() {
    const { movie, loading } = this.state;

    if (loading) return <Loading />;

    const { id, title, storyline, imagePath, genre, rating, subtitle } = movie;

    return (
      <div data-testid="movie-details">
        <img alt="Movie Cover" src={ `../${imagePath}` } />
        <h2>{ `title: ${title}`}</h2>
        <p>{ `Subtitle: ${subtitle}` }</p>
        <p>{ `Storyline: ${storyline}` }</p>
        <p>{ `Genre: ${genre}` }</p>
        <p>{ `Rating: ${rating}` }</p>
        { this.optionsComponent(id) }
      </div>
    );
  }
}

MovieDetails.propTypes = {
  match: PropTypes.shape(match).isRequired,
};

export default MovieDetails;
