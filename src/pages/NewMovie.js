import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import MovieForm from '../components/MovieForm';
import * as movieAPI from '../services/movieAPI';

class NewMovie extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      shouldRedirected: false,
    };
  }

  handleSubmit(newMovie) {
    const { onSubmit } = this.props;
    onSubmit();
    movieAPI.createMovie(newMovie);
    this.setState(() => ({ shouldRedirected: true }));
  }

  render() {
    const { shouldRedirected } = this.state;

    if (shouldRedirected) {
      return <Redirect to="/" />;
    }

    return (
      <div data-testid="new-movie">
        <MovieForm onSubmit={ this.handleSubmit } />
      </div>
    );
  }
}

NewMovie.propTypes = { onSubmit: PropTypes.func.isRequired };

export default NewMovie;
