import PropTypes from 'prop-types';

export const match = {
  params: PropTypes.shape({
    id: PropTypes.string,
  }),
  url: PropTypes.string,
  path: PropTypes.string,
  isExact: PropTypes.bool,
};

export const history = {
  push: PropTypes.func,
};
