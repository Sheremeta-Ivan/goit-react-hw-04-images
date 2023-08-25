import { useState, useEffect } from 'react';
import * as API from '../../services/PixabayApi';
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import ScrollButton from 'components/ScrollTop/ScrollTop';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [searchName, setSearchName] = useState('');
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalImages, setTotalImages] = useState(0);

  useEffect(() => {
    if (searchName === '') {
      return;
    }

    async function addImages() {
      try {
        setIsLoading(true);

        const { images, totalImages } = await API.getImages(
          searchName,
          currentPage
        );

        if (images.length === 0) {
          return toast.info('Sorry image not found...', {
            position: toast.POSITION.TOP_RIGHT,
          });
        }

        setImages(prevImages => [...prevImages, ...images]);
        setTotalImages(totalImages);
      } catch (error) {
        toast.error('Something went wrong!', {
          position: toast.POSITION.TOP_RIGHT,
        });
      } finally {
        setIsLoading(false);
      }
    }
    addImages();
  }, [searchName, currentPage]);

  const loadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handleSubmit = query => {
    if (searchName === query) {
      return toast.warning('Please enter another request 😒', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    setSearchName(query);
    setImages([]);
    setCurrentPage(1);
    setTotalImages(0);
  };

  return (
    <div>
      <ToastContainer transition={Slide} />
      <SearchBar onSubmit={handleSubmit} />
      {images.length > 0 ? (
        <ImageGallery images={images} />
      ) : (
        <p
          style={{
            padding: 100,
            textAlign: 'center',
            fontSize: 30,
          }}
        >
          Image gallery is empty... 📷
        </p>
      )}
      {isLoading && <Loader />}
      {totalImages !== images.length && !isLoading && (
        <Button onClick={loadMore} />
      )}
      <ScrollButton />
    </div>
  );
};

export default App;
