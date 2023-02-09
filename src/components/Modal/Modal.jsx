import { Component } from 'react';
import propTypes from 'prop-types';
import { ModalBackdrop, ModalImg } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    this.switchScrollBody('hidden');
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    this.switchScrollBody('scroll');
  }
  switchScrollBody(state) {
    Object.assign(document.body.style, {
      overflowY: state,
    });
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };
  render() {
    return (
      <ModalBackdrop onClick={this.handleBackdropClick}>
        <ModalImg src={this.props.image} alt="Enlarged search result" />
      </ModalBackdrop>
    );
  }
}

// Modal.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   image: PropTypes.string.isRequired,
// };
