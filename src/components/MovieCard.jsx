import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import movie from '../types/movie';

import './styles/movieCard.css';

class MovieCard extends React.Component {
  render() {
    const {
      id, title, subtitle, storyline, rating, imagePath, bookmarked,
    } = this.props.movie;

    return (
      <div data-testid="movie-card" className="movie-card">
        <img src={imagePath} alt={`${title}-poster`} />
        <div className="card-content">
          <strong>{title}</strong>
          <span>{subtitle}</span>
          <p>{storyline}</p>
          {bookmarked && (
            <div className="fan">
              <span className="fa fa-heart heart" />
              Fan Favorite!
            </div>
          )}
        </div>
        <div className="card-more-info">
          <Link to={`movies/${id}`}>VER DETALHES</Link>
          <div className="rating">
            <span className="fa fa-star star" />
            {rating}
          </div>
        </div>
      </div>
    );
  }
}

export default MovieCard;

MovieCard.propTypes = {
  movie: PropTypes.shape(movie).isRequired,
};
