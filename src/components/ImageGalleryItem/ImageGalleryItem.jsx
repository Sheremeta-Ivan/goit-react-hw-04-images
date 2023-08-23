import { useState } from 'react';
import propTypes from 'prop-types';
import Modal from '../Modal/Modal';
import { Item, Img } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ image }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(prevModal => !prevModal);
  };

  return (
    <>
      <Item>
        <Img src={image.webformatURL} alt={image.tags} onClick={toggleModal} />
        {showModal && (
          <Modal
            largeImageURL={image.largeImageURL}
            tags={image.tags}
            onClose={toggleModal}
          />
        )}
      </Item>
    </>
  );
};

ImageGalleryItem.propTypes = {
  image: propTypes.shape({
    webformatURL: propTypes.string.isRequired,
    tags: propTypes.string.isRequired,
    largeImageURL: propTypes.string.isRequired,
  }).isRequired,
};

export default ImageGalleryItem;
