import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import * as movieAPI from '../services/movieAPI';
import { Loading, Body } from '../components';

class MovieDetails extends Component {
  constructor() {
    super();

    this.getMovieDetails = this.getMovieDetails.bind(this);

    this.state = {
      loading: true,
      error: false,
      movie: {},
    };
  }

  componentDidMount() {
    const { id } = this.props;
    this.getMovieDetails(id);
  }

  async getMovieDetails(idMovie) {
    this.setState({ loading: true });
    movieAPI.getMovie(idMovie)
      .then((movie) => {
        if (movie) this.setState({ loading: false, movie });
        else this.setState(() => ({ error: true }));
      });
  }

  async deleteMovie(idMovie) {
    const { onClick } = this.props;
    onClick();
    await movieAPI.deleteMovie(idMovie);
  }

  render() {
    const { loading, movie, error } = this.state;
    const { id, onClick } = this.props;
    const urlMovieEdit = `/movies/${id}/edit`;
    if (error) return <Redirect to="/NotFound" />;
    return (
      <div>
        { (loading) ? <Loading /> : <Body movie={ movie } /> }
        <div className="buttons-movie-details">
          <Link className="button link" to="/" onClick={ onClick }> VOLTAR</Link>
          <Link className="button link" to={ urlMovieEdit }>EDITAR</Link>
          <Link className="button link" to="/" onClick={ () => this.deleteMovie(id) }>
            DELETAR
          </Link>
        </div>
      </div>
    );
  }
}

MovieDetails.propTypes = ({
  id: PropTypes.number,
  onClick: PropTypes.func,
}).isRequired;

export default MovieDetails;
