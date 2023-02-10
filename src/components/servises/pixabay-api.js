import axios from 'axios';

const perPage = 12;
const imageType = 'photo';
const orientation = 'horizontal';
const KEY = `31666099-266026a5e387fdbb4f62e5b52`;

axios.defaults.baseURL = `https://pixabay.com/api/`;

export const pixabayApi = async (query, page) => {
  const response = await axios.get(
    `?q=${query}&page=${page}&key=${KEY}&image_type=${imageType}&orientation=${orientation}&per_page=${perPage}`
  );
  return response.data;
};
