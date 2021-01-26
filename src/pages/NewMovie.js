import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { history } from '../types/routerDom';

import MovieForm from '../components/MovieForm';
import * as movieAPI from '../services/movieAPI';

class NewMovie extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(newMovie) {
    await movieAPI.createMovie(newMovie);
    const { history: { push } } = this.props;
    console.log('teste');
    push('/');
  }

  render() {
    return (
      <div data-testid="new-movie">
        <MovieForm onSubmit={ this.handleSubmit } />
      </div>
    );
  }
}

NewMovie.propTypes = {
  history: PropTypes.shape(history).isRequired,
};

export default NewMovie;
