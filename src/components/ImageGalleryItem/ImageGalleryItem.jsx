import PropTypes from 'prop-types';

import { GalleryItem, Img } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ tags, preview, largeImage, onClick }) => {
  return (
    <GalleryItem>
      <Img
        src={preview}
        alt={tags}
        onClick={() => {
          onClick(largeImage);
        }}
      />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  largeImage: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
