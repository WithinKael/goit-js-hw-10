const { default: axios } = require('axios');
const headers = {
  'x-api-key':
    'live_SEEuXgPbXH1I9XWZyNKf8VGoaF0P5laIrY1Hfhj9702pUFpmFZECDBOsGAcIrBbj',
  Accept: 'application/json',
};

export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds', { headers })
    .then(response => response.data)
    .catch(error => {
      console.error(error);
      throw error;
    });
}

export function fetchCatByBreed(breedId) {

    return axios
      .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`, {
        headers,
      })
      .then(response => response.data)
      .catch(error => console.error(error));
}
