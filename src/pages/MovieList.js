import PropTypes from 'prop-types';
import React, { Component } from 'react';
import MovieCard from '../components/MovieCard';
import Loading from '../components/Loading';

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
      <div className="movie-list" data-testid="movie-list">
        {loading ? <Loading /> : (
          movies.map((movie) => (
            <MovieCard
              key={ movie.title }
              movie={ movie }
              onClick={ onClick }
            />))
        )}
      </div>
    );
  }
}

MovieList.propTypes = { onClick: PropTypes.func.isRequired };

export default MovieList;
