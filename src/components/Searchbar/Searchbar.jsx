import PropTypes from 'prop-types';
import { SearchHeader } from './Searchbar.styled';

export const Searchbar = ({ children }) => {
  return <SearchHeader>{children}</SearchHeader>;
};

Searchbar.propTypes = {
  children: PropTypes.node.isRequired,
};
