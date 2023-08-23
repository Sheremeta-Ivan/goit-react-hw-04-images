import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import propTypes from 'prop-types';
import {
  SearchForm,
  SearchInput,
  SearchButton,
  SearchSpan,
  SearchLogo,
} from './SearchBar.styled';

const SearchBar = ({ onSubmit }) => {
  // const [searchName, setSearchName] = useState('');
  const [inputValue, setInputValue] = useState('');

  const handleChange = event => setInputValue(event.target.value);

  const handleSubmit = event => {
    event.preventDefault();
    const searchQuery = event.target.elements.searchName.value.trim();
    console.log(event.target.elements.searchName);
    onSubmit(searchQuery);
    event.target.reset();
  };
  return (
    <header>
      <SearchForm onSubmit={handleSubmit}>
        <a href="https://pixabay.com/" target="_blank" rel="noreferrer">
          <SearchLogo
            src={require('./pixabay-logo.png')}
            alt="logo"
            width="200"
          />
        </a>
        <SearchButton>
          <BsSearch />
          <SearchSpan>Search</SearchSpan>
        </SearchButton>
        <SearchInput
          name="searchName"
          type="text"
          id="search"
          value={inputValue}
          onChange={handleChange}
        />
      </SearchForm>
    </header>
  );
};

SearchBar.propTypes = {
  onSubmit: propTypes.func.isRequired,
};

export default SearchBar;
