import { fetchBreeds, fetchCatByBreed} from './cat-api';

const selectEl = document.querySelector('.breed-select');
const catInfoEl = document.querySelector('.cat-info');
const pLoaderEl = document.querySelector('.loader');
const pErrorEl = document.querySelector('.error');

selectEl.style.display = 'none';
pErrorEl.style.display = 'none';

fetchBreeds()
  .then(data => {
    data.forEach(item => {
      const option = document.createElement('option');
      option.value = item.id;
      option.text = item.name;
      selectEl.appendChild(option);
      selectEl.style.display = 'block';
      pLoaderEl.style.display = 'none';
      pErrorEl.style.display = 'none';
    });
  })
  .catch(err => {
    pLoaderEl.style.display = 'none';
    pErrorEl.style.display = 'block';
    console.error('Произошла ошибка при получении пород:', err);
  });

function onSelectEl(event) {
  catInfoEl.style.display = 'none';
  pLoaderEl.style.display = 'block';
  fetchCatByBreed(event.target.value)
    .then(data => {
      console.log(data);
      renderItems(data);
      catInfoEl.style.display = 'block';
      pLoaderEl.style.display = 'none';
      pErrorEl.style.display = 'none';
    })
    .catch(err => {
      pLoaderEl.style.display = 'none';
      pErrorEl.style.display = 'block';
      console.error('Нет такого ID', err);
    });
}

selectEl.addEventListener('change', onSelectEl);

function renderItems(data) {
  const catInfo = data[0].breeds[0]; 
  const markup = `
    <div class="cat-info">
        <img src="${data[0].url}" class="image-cats">
        <h2>${catInfo.name}</h2>
        <p>Description: ${catInfo.description}</p>
        <p>Temperament: ${catInfo.temperament}</p>
    </div>
    `;
  catInfoEl.innerHTML = markup;
}
