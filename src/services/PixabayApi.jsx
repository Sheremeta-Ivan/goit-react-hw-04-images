import axios from 'axios';

const API_KEY = '38893261-cb0108b52b1251ef64b14b68b';
export const PER_PAGE = 12;

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
  per_page: PER_PAGE,
};

export const getImages = async (query, page) => {
  const params = {
    q: query,
    page,
  };
  const { data } = await axios.get('/', { params });
  return { images: normalizedImages(data.hits), totalImages: data.totalHits };
};

export const normalizedImages = imageArray =>
  imageArray.map(({ id, tags, webformatURL, largeImageURL }) => {
    return { id, tags, webformatURL, largeImageURL };
  });
