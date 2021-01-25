import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import MovieCard from '../components/MovieCard.js';
import Loading from '../components/Loading.js';

import * as movieAPI from '../services/movieAPI';

class MovieList extends Component {
  constructor() {
    super();

    this.getMoviesLibrary = this.getMoviesLibrary.bind(this);

    this.state = {
      loading: false,
      movies: [],
    };
  }

  componentDidMount() {
    this.getMoviesLibrary();
  }

  async getMoviesLibrary() {
    this.setState(
      { loading: true },
      async () => {
        const movieList = await movieAPI.getMovies();
        this.setState(() => ({ loading: false, movies: movieList }));
      },
    );
  }

  render() {
    const { movies, loading } = this.state;
    const { onClick } = this.props;

    // Render Loading here if the request is still happening
    return (
      <div>
        <div data-testid="movie-lists">
          {loading ? <Loading />
            : movies.map((movie) => (<MovieCard
                key={ movie.title }
                movie={ movie }
                onClick={ onClick }
            />))}
        </div>
        <Link to="/movies/new" className="text-add-card"> ADICIONAR CARTÃO </Link>
      </div>
    );
  }
}

MovieList.propTypes = { onClick: PropTypes.func.isRequired };

export default MovieList;
