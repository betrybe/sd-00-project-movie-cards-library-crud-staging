import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';

import { MovieForm } from '../components';
import * as movieAPI from '../services/movieAPI';

class EditMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'loading',
      shouldRedirect: false,
      movie: {},
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getMovieToEdit = this.getMovieToEdit.bind(this);
  }

  componentDidMount() {
    const { id } = this.props;
    this.getMovieToEdit(id);
  }

  handleSubmit(updatedMovie) {
    const { onSubmit } = this.props;
    onSubmit();
    movieAPI.updateMovie(updatedMovie);
    this.setState(() => ({ shouldRedirect: true }));
  }

  async getMovieToEdit(idMovie) {
    this.setState(
      async () => {
        const movieDetail = await movieAPI.getMovie(idMovie);
        this.setState(() => ({ status: 'notLoading', movie: movieDetail }));
      },
    );
  }

  render() {
    const { status, shouldRedirect, movie } = this.state;
    if (shouldRedirect) {
      return (<Redirect to="/" />);
    }

    return (
      <div className="edit-movie" data-testid="edit-movie">
        {status === 'loading' ? <Loading /> : (
          <MovieForm movie={ movie } onSubmit={ this.handleSubmit } />
        )}
      </div>
    );
  }
}

EditMovie.propTypes = ({
  id: PropTypes.number,
  onSubmit: PropTypes.func,
}).isRequired;

export default EditMovie;
