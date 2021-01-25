import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { MovieForm, Loading } from '../components';

import { history, match } from '../types/movieDetails';

import * as movieAPI from '../services/movieAPI';

class EditMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiLoading: true,
      movie: {},
      pointlessState: {},
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const { id } = this.props.match.params;

    this.saveState(id);
  }

  async saveState(id) {
    const movie = await movieAPI.getMovie(id);

    this.setState({
      movie,
      apiLoading: false,
      pointlessState: this.props.match,
    });
  }

  async handleSubmit(updatedMovie) {
    await movieAPI.updateMovie(updatedMovie);
    const { push } = this.props.history;

    push('/');
  }

  render() {
    const { apiLoading, movie } = this.state;
    console.log(this.props.match, this.state.pointlessState);

    if (apiLoading) return <Loading />;

    return (
      <div data-testid="edit-movie">
        <MovieForm movie={movie} onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

export default EditMovie;

EditMovie.propTypes = {
  match: PropTypes.shape(match).isRequired,
  history: PropTypes.shape(history).isRequired,
};
