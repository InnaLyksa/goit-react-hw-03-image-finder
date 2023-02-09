import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { Searchbar, SearchForm, Loader, GalleryImages, Modal } from './index';
import { pixabayApi, PER_PAGE } from './servises/pixabay-api';

import ScrollToTop from 'react-scroll-to-top';

export class App extends Component {
  state = {
    fetchQuery: '',
    page: 1,
    images: [],
    loading: false,
    error: null,
    showModal: false,
    largeImage: '',
    currentImgPerPage: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.fetchQuery;
    const nextQuery = this.state.fetchQuery;

    if (prevQuery !== nextQuery) {
      this.getImagesData();
    }

    return;
  }
  getImagesData = async () => {
    const { fetchQuery, page } = this.state;
    try {
      this.setState({ loading: true });

      const { hits, totalHits } = await pixabayApi(fetchQuery, page);
      console.log(hits);
      // console.log(totalHits);

      if (totalHits === 0) {
        toast.error(`${fetchQuery} not found ...`);
        // this.setState({ loading: false, currentImgPerPage: null });
        this.setState({ loading: false, images: [] });
        return;
      }

      const images = this.imagesArray(hits);

      this.setState(prevState => {
        return {
          images: [...prevState.images, ...images],
          currentImgPerPage: hits.length,
          page: prevState.page + 1,
        };
      });
    } catch (error) {
      console.log(error);
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  };

  imagesArray = data => {
    return data.map(({ id, largeImageURL, tags, webformatURL }) => {
      return { id, largeImageURL, tags, webformatURL };
    });
  };

  saveFetchQuery = searchQuery => {
    console.log(searchQuery);
    if (searchQuery === this.state.fetchQuery) {
      return;
    }
    this.setState({
      fetchQuery: searchQuery,
      images: [],
      page: 1,
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  openModal = largeImage => {
    this.setState({ largeImage }, () => {
      this.toggleModal();
    });
  };

  render() {
    const { saveFetchQuery, openModal, toggleModal } = this;
    const {
      images,
      loading,
      currentImgPerPage,
      error,
      showModal,
      largeImage,
      fetchQuery,
    } = this.state;
    return (
      <div>
        <Searchbar>
          <SearchForm SubmitForm={saveFetchQuery} />
        </Searchbar>
        {images.length > 0 && !error && (
          <>
            <GalleryImages images={images} onClick={openModal} />
            {/* {currentImgPerPage &&
              currentImgPerPage < PER_PAGE &&
              alert(`No more ${fetchQuery}`)} */}
          </>
        )}
        {showModal && <Modal onClose={toggleModal} image={largeImage} />}
        <ScrollToTop
          color="black"
          smooth
          width="30"
          height="30"
          style={{
            background: '#3381ca',
          }}
        />
        <ToastContainer autoClose={1000} theme="dark" />
        {loading && <Loader />}
      </div>
    );
  }
}
