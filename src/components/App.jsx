import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar, SearchForm, GalleryImages, Modal, Button } from './index';
import api from './servises/pixabay-api';

import { Loader } from '../components/Loader/Loader';

import ScrollToTop from 'react-scroll-to-top';

export class App extends Component {
  state = {
    query: '',
    pictureData: [],
    modalImg: null,
    status: 'idle',
    page: 1,
    showModal: false,
    IsLoadingMore: false,
  };

  componentDidUpdate(_, prevProps) {
    const prevSearch = prevProps.query;
    const nextSearch = this.state.query;
    const prevPage = prevProps.page;
    const nextPage = this.state.page;

    if (prevSearch !== nextSearch || nextPage !== prevPage) {
      this.loadPicture();
    }
  }

  loadPicture = () => {
    const { query, page } = this.state;
    this.setState({ status: 'pending' });
    api
      .pixabayApi(query, page)
      .then(res => {
        if (res.data.hits.length === 0) {
          toast.error(`There is no "${query}" images.`);
          this.setState({ status: 'idle' });
          return;
        }
        this.setState(prevState => ({
          pictureData: [
            ...prevState.pictureData,
            ...this.mapper(res.data.hits),
          ],
          status: 'resolved',
          IsLoadingMore:
            prevState.pictureData.length + res.data.hits.length ===
            res.data.totalHits
              ? false
              : true,
        }));

        if (res.data.hits.length < 12 && res.data.hits.length > 0) {
          toast.info('There is no more images');
        }
      })
      .catch(() => toast.error(`Ups! Something is wrong :(  Try again later!`));
  };

  mapper = array => {
    return array.map(({ id, webformatURL, largeImageURL }) => ({
      id,
      webformatURL,
      largeImageURL,
    }));
  };

  resetPage() {
    this.setState({
      page: 1,
    });
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleOpenModal = modalImg => {
    this.toggleModal();
    this.setState({ modalImg: modalImg });
  };

  handleSearchSubmit = searchQuery => {
    this.setState({
      query: searchQuery,
      page: 1,
      pictureData: [],
      status: 'idle',
      modalImg: null,
      showModal: false,
      IsLoadingMore: false,
    });
  };

  onClickloadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { pictureData, modalImg, IsLoadingMore, showModal, status } =
      this.state;
    const {
      handleSearchSubmit,
      onClickloadMore,
      toggleModal,
      handleOpenModal,
    } = this;
    return (
      <div>
        <Searchbar>
          <SearchForm submitForm={handleSearchSubmit} />
        </Searchbar>
        {showModal && <Modal onClose={toggleModal} image={modalImg} />}

        {pictureData.length > 0 && (
          <GalleryImages
            pictureData={pictureData}
            onClick={handleOpenModal}
          ></GalleryImages>
        )}

        <ScrollToTop
          color="black"
          smooth
          width="30"
          height="30"
          style={{
            background: '#088ecc',
          }}
        />

        {status === 'pending' && <Loader />}
        {IsLoadingMore && <Button onClick={onClickloadMore}>Load more</Button>}
        <ToastContainer
          autoClose={1000}
          theme="colored"
          position="bottom-center"
        />
      </div>
    );
  }
}
