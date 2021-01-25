import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class MovieCard extends React.Component {
  render() {
    const { id, title, subtitle, storyline, imagePath } = this.props.movie;
    const { onClick } = this.props;

    const movieDetailsUrl = `/movies/${id}`;

    return (
      <div data-testid="movie-card">
        <div>
          <img src={ imagePath } alt="Movie" />
          <div>
            <h2>{title}</h2>
            <h4>{subtitle}</h4>
          </div>
          <p>{storyline}</p>
          <div>
            <Link
              className="link"
              to={ movieDetailsUrl }
              onClick={ onClick }
            >
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
