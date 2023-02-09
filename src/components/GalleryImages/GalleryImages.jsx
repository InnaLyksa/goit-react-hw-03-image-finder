import PropTypes from 'prop-types';
import { Component } from 'react';
import { pixabayApi } from '../servises/pixabay-api';
import { toast } from 'react-toastify';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Gallery } from './GalleryImages.styled';
import { Loader } from '../Loader/Loader';

export class GalleryImages extends Component {
  state = {
    images: [],
    isLoader: false,
    error: null,
  };

  async componentDidUpdate(prevProps, _) {
    const { imageQuery, page, onLoad, offLoad } = this.props;

    if (prevProps.imageQuery !== imageQuery || prevProps.page !== page) {
      prevProps.imageQuery !== imageQuery
        ? this.setState({ isLoader: true, images: [] })
        : this.setState({ isLoader: true });
      try {
        const response = await pixabayApi(imageQuery, page);
        this.setState(prevState => ({
          images: [...prevState.images, ...response.hits],
          isLoader: false,
        }));

        if (!response.hits.length) {
          offLoad();
          toast.error(`There is no "${imageQuery}" images.`);
        } else if (response.hits.length < 12 && response.hits.length > 0) {
          offLoad();
          toast.info('There is no more images');
        } else {
          onLoad();
        }
      } catch (error) {
        this.setState({ error, isLoader: false });
        toast.error(
          `Ups! Something is wrong :( ${error.message} Try again later!`
        );
      }
    }
  }

  render() {
    const { images, isLoader } = this.state;
    const { onImgClick } = this.props;
    return (
      <>
        <Gallery className="gallery">
          {images.map(image => (
            <ImageGalleryItem
              key={image.id}
              data={image}
              onImgClick={onImgClick}
            />
          ))}
        </Gallery>

        {isLoader && <Loader />}
      </>
    );
  }
}

GalleryImages.propTypes = {
  imageQuery: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  // onLoad: PropTypes.func.isRequired,
  // offLoad: PropTypes.func.isRequired,
  onImgClick: PropTypes.func.isRequired,
};

// export const GalleryImages = ({ images, onClick }) => {
//   return (
//     <Gallery>
//       {images.map(({ id, largeImageURL, tags, webformatURL }) => {
//         return (
//           <ImageGalleryItem
//             key={id}
//             largeImage={largeImageURL}
//             tags={tags}
//             preview={webformatURL}
//             onClick={onClick}
//           />
//         );
//       })}
//     </Gallery>
//   );
// };

// GalleryImages.propTypes = {
//   onClick: PropTypes.func,
// };
