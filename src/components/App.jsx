import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar, SearchForm, GalleryImages, Modal } from './index';

import ScrollToTop from 'react-scroll-to-top';

export class App extends Component {
  state = {
    page: 1,
    showModal: false,
    query: '',
    loadMore: false,
    modalImg: null,
  };

  // componentDidUpdate(prevProps, prevState) {
  //   const prevQuery = prevState.fetchQuery;
  //   const nextQuery = this.state.fetchQuery;

  //   if (prevQuery !== nextQuery) {
  //     this.getImagesData();
  //   }

  //   return;
  // }
  // getImagesData = async () => {
  //   const { fetchQuery, page } = this.state;
  //   try {
  //     this.setState({ loading: true });

  //     const { hits, totalHits } = await pixabayApi(fetchQuery, page);
  //     console.log(hits);
  //     // console.log(totalHits);

  //     if (totalHits === 0) {
  //       toast.error(`${fetchQuery} not found ...`);
  //       // this.setState({ loading: false, currentImgPerPage: null });
  //       this.setState({ loading: false, images: [] });
  //       return;
  //     }

  //     const images = this.imagesArray(hits);

  //     this.setState(prevState => {
  //       return {
  //         images: [...prevState.images, ...images],
  //         currentImgPerPage: hits.length,
  //         page: prevState.page + 1,
  //       };
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     this.setState({ error: error.message });
  //   } finally {
  //     this.setState({ loading: false });
  //   }
  // };

  // imagesArray = data => {
  //   return data.map(({ id, largeImageURL, tags, webformatURL }) => {
  //     return { id, largeImageURL, tags, webformatURL };
  //   });
  // };

  // saveFetchQuery = searchQuery => {
  //   console.log(searchQuery);
  //   if (searchQuery === this.state.fetchQuery) {
  //     return;
  //   }
  //   this.setState({
  //     fetchQuery: searchQuery,
  //     images: [],
  //     page: 1,
  //   });
  // };

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

  onLoadMore = () => {
    this.setState({ loadMore: true });
  };

  offLoadMore = () => {
    this.setState({ loadMore: false });
  };

  render() {
    const { query, page, modalImg, showModal } = this.state;
    const {
      handleSearchSubmit,
      onLoadMore,
      offLoadMore,
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
          // arrayImages={this.state.images}
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

        {/* {loadMore && <Button onClick={handleButtonClick}>Load more</Button>} */}

        <ToastContainer
          autoClose={1000}
          theme="colored"
          position="bottom-center"
        />
      </div>
    );
  }
}
