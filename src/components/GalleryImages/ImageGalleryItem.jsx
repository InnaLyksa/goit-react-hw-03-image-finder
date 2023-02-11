import PropTypes from 'prop-types';

import { GalleryItem, Img } from './GalleryImages.styled';

export const ImageGalleryItem = ({
  largeImageURL,

  tags,
  webformatURL,
  onClick,
}) => {
  return (
    <GalleryItem onClick={() => onClick(largeImageURL)}>
      <Img src={webformatURL} alt={tags} />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  data: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),
  onClick: PropTypes.func.isRequired,
};
