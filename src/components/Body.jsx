import React from 'react';
import PropTypes from 'prop-types';

const Body = ({ movie }) => (
  <div className="movie-card movie-details">
    <div data-testid="movie-details" className="movie-card-body">
      <img alt="Movie Cover" src={ `../${movie.imagePath}` } />
      <h1 className="movie-card-title">{movie.title}</h1>
      <p className="movie-card-subtitle">{`Subtitle: ${movie.subtitle}`}</p>
      <p className="movie-card-storyline">{`Storyline: ${movie.storyline}`}</p>
      <p>{`Genre: ${movie.genre}`}</p>
      <div className="movie-card-rating">
        <p className="rating">{`Rating: ${movie.rating}`}</p>
      </div>
    </div>
  </div>
);

Body.propTypes = ({
  movie: PropTypes.objectOf(PropTypes.any),
}).isRequired;

export default Body;
