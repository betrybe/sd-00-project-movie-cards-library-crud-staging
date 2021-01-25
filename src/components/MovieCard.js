import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

class MovieCard extends React.Component {
  render() {
    const { onClick, movie: { id, title, subtitle, storyline, imagePath } } = this.props;
    return (
      <div className="movie-card" data-testid="movie-card">
        <div className="movie-card-body">
          <img className="movie-card-image" src={ imagePath } alt="Movie" />
          <div className="titles">
            <h2 className="movie-card-title">{ title }</h2>
            <h4 className="movie-card-subtitle">{ subtitle }</h4>
          </div>
          <p className="movie-card-storyline">{ storyline }</p>
          <div className="more-details">
            <Link className="link" to={ `/movies/${id}` } onClick={ onClick }>
              VER DETALHES
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

MovieCard.propTypes = ({
  movie: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    storyline: PropTypes.string,
    imagePath: PropTypes.string,
  }),
  onClick: PropTypes.func,
}).isRequired;

export default MovieCard;
