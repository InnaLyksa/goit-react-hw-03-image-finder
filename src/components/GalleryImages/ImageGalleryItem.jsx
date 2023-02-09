import PropTypes from 'prop-types';

import { GalleryItem, Img } from './GalleryImages.styled';

export const ImageGalleryItem = ({ data, onImgClick }) => {
  return (
    <GalleryItem>
      <Img
        src={data.webformatURL}
        alt={data.tags}
        onClick={() => {
          onImgClick(data.largeImageURL);
        }}
      />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  data: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),
  onImgClick: PropTypes.func.isRequired,
};
