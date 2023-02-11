import PropTypes from 'prop-types';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Gallery } from './GalleryImages.styled';

export const GalleryImages = ({ pictureData, onClick }) => (
  <Gallery>
    {pictureData.map(({ id, largeImageURL, webformatURL }) => (
      <ImageGalleryItem
        key={id}
        largeImageURL={largeImageURL}
        webformatURL={webformatURL}
        onClick={onClick}
      />
    ))}
  </Gallery>
);

GalleryImages.propTypes = {
  pictureData: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};
