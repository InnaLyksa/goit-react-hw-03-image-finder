import PropTypes from 'prop-types';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './GalleryImage.styled';

export const GalleryImages = ({ images, onClick }) => {
  return (
    <Gallery>
      {images.map(({ id, largeImageURL, tags, webformatURL }) => {
        return (
          <ImageGalleryItem
            key={id}
            largeImage={largeImageURL}
            tags={tags}
            preview={webformatURL}
            onClick={onClick}
          />
        );
      })}
    </Gallery>
  );
};

GalleryImages.propTypes = {
  onClick: PropTypes.func,
};
