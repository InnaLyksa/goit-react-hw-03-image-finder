import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar, SearchForm, GalleryImages, Modal, Button } from './index';

import ScrollToTop from 'react-scroll-to-top';

export class App extends Component {
  state = {
    // images: [],
    page: 1,
    showModal: false,
    query: '',
    loadMore: false,
    modalImg: null,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleOpenModal = modalImg => {
    // console.log('Open modal');
    this.setState({ modalImg }, () => {
      this.toggleModal();
    });
  };

  handleSearchSubmit = value => {
    this.setState({ query: value, page: 1 });
  };

  onClickloadMore = () => {
    // console.log(`Load`);
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  onLoadMore = () => {
    this.setState({ loadMore: true });
  };

  offLoadMore = () => {
    this.setState({ loadMore: false });
  };

  render() {
    const { query, page, modalImg, loadMore, showModal } = this.state;
    const {
      handleSearchSubmit,
      onLoadMore,
      offLoadMore,
      onClickloadMore,
      toggleModal,
      handleOpenModal,
    } = this;
    return (
      <div>
        <Searchbar>
          <SearchForm SubmitForm={handleSearchSubmit} />
        </Searchbar>
        {showModal && <Modal onClose={toggleModal} image={modalImg} />}
        <GalleryImages
          imageQuery={query}
          page={page}
          onLoad={onLoadMore}
          offLoad={offLoadMore}
          onImgClick={handleOpenModal}
        />
        <ScrollToTop
          color="black"
          smooth
          width="30"
          height="30"
          style={{
            background: '#3381ca',
          }}
        />
        {loadMore && <Button onClick={onClickloadMore}>Load more</Button>}
        {/* {loadMore && <LoadMore onClick={onClickloadMore} />} */}
        <ToastContainer
          autoClose={1000}
          theme="colored"
          position="bottom-center"
        />
      </div>
    );
  }
}
