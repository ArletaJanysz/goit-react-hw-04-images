import React from 'react';
import PropTypes from 'prop-types';

import './Button.css';

const Button = ({ onClick, isVisible }) => (
  <div className="button__container">
    <button
      type="button"
      className={`button ${isVisible ? 'visible' : 'hidden'}`}
      onClick={onClick}
    >
      <span>Load more</span>
    </button>
  </div>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
};

export default Button;
