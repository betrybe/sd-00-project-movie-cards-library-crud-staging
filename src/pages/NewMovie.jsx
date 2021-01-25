import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MovieForm from '../components/MovieForm';

import { history } from '../types/movieDetails';

import * as movieAPI from '../services/movieAPI';

class NewMovie extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(newMovie) {
    await movieAPI.createMovie(newMovie);
    const { push } = this.props.history;

    push('/');
  }

  render() {
    return (
      <div data-testid="new-movie">
        <MovieForm onSubmit={this.handleSubmit} />
      </div>
    );
  }
}
export default NewMovie;

NewMovie.propTypes = {
  history: PropTypes.shape(history).isRequired,
};
