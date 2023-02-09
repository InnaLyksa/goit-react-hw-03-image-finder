import PropTypes from 'prop-types';
import { IconBtn } from './IconButton.styled';

export const IconButton = ({ children, onClick, ...allyProps }) => (
  <IconBtn type="button" onClick={onClick} {...allyProps}>
    {children}
  </IconBtn>
);

IconButton.defaultProps = {
  type: null,
  onClick: () => null,
  children: null,
};

IconButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  'aria-label': PropTypes.string.isRequired,
};
