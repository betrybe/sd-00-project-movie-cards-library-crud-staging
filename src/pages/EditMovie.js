import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { MovieForm } from '../components';
import * as movieAPI from '../services/movieAPI';

class EditMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'loading',
      movie: {},
      shouldRedirect: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchMovieEdit = this.fetchMovieEdit.bind(this);
  }

  componentDidMount() {
    this.fetchMovieEdit();
  }

  async handleSubmit(updatedMovie) {
    const requestUpdate = await movieAPI.updateMovie(updatedMovie);
    this.setState({
      shouldRedirect: true,
      movie: requestUpdate,
    });
  }

  async fetchMovieEdit() {
    const { id } = this.props.match.params;
    const requestResult = await movieAPI.getMovie(id);
    this.setState({
      status: 'not loading',
      movie: requestResult,
    });
  }

  render() {
    const { status, shouldRedirect, movie } = this.state;
    if (shouldRedirect) {
      return <Redirect to="/" />;
    }

    if (status === 'loading') {
      return 'Carregando...';
    }

    return (
      <div data-testid="edit-movie">
        <MovieForm movie={ movie } onSubmit={ this.handleSubmit } />
      </div>
    );
  }
}

EditMovie.propTypes = {
  id: PropTypes.number,
}.isRequired;

export default EditMovie;
