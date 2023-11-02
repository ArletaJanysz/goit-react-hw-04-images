import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './Searchbar.css';

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(query);
    setQuery('');
  };

  return (
    <header className="searchbar">
      <form className="searchbar__form" onSubmit={handleSubmit}>
        <button type="submit" className="searchbar__button">
          <span className="button__label">
            <svg class="search__icon" width="40" height="40">
              <use href="./svg/icons.svg#icon-search"></use>
            </svg>
          </span>
        </button>
        <input
          id="input"
          className="searchbar__input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
