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

// export const PER_PAGE = 16;

// export async function pixabayApi(searchQuery, page) {
//   const API_KEY = '31666099-266026a5e387fdbb4f62e5b52';
//   const BASE_URL = `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`;

//   const response = await fetch(BASE_URL);

//   return response.ok
//     ? response.json()
//     : Promise.reject(new Error('Something went wrong, please try again'));
// }
