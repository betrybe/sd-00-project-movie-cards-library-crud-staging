import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { history, match } from '../types/routerDom';

import { MovieForm, Loading } from '../components';
import * as movieAPI from '../services/movieAPI';

class EditMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {},
      loading: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    await this.getMovie();
  }

  async handleSubmit(updatedMovie) {
    await movieAPI.updateMovie(updatedMovie);
    const { history: { push } } = this.props;

    push('/');
  }

  async getMovie() {
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

  render() {
    const { loading, shouldRedirect, movie } = this.state;
    if (shouldRedirect) {
      // Redirect
    }

    if (loading) return <Loading />;

    return (
      <div data-testid="edit-movie">
        <MovieForm movie={ movie } onSubmit={ this.handleSubmit } />
      </div>
    );
  }
}

EditMovie.propTypes = {
  match: PropTypes.shape(match).isRequired,
  history: PropTypes.shape(history).isRequired,
};

export default EditMovie;
