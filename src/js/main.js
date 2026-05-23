import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import '../css/styles.css';

const API_KEY = '55994880-e568b2e6587c62e6ee420d338';
const BASE_URL = 'https://pixabay.com/api/';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader-wrapper');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

form.addEventListener('submit', onSearchFormSubmit);

function onSearchFormSubmit(event) {
  event.preventDefault();

  const query = event.currentTarget.elements.searchQuery.value.trim();

  if (query === '') {
    showWarningToast('Please enter a search query!');
    return;
  }

  clearGallery();
  showLoader();

  fetchImages(query)
    .then(data => {
      if (data.hits.length === 0) {
        showErrorToast(
          'Sorry, there are no images matching your search query. Please try again!'
        );
        return;
      }

      gallery.insertAdjacentHTML('beforeend', createGalleryMarkup(data.hits));
      lightbox.refresh();
    })
    .catch(() => {
      showErrorToast('Something went wrong. Please try again later!');
    })
    .finally(() => {
      hideLoader();
      form.reset();
    });
}

function fetchImages(query) {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });

  return fetch(`${BASE_URL}?${searchParams}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
  });
}

function createGalleryMarkup(images) {
  return images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        const shortTags = tags
          .split(',')
          .map(tag => tag.trim())
          .slice(0, 3)
          .join(', ');

        return `
          <li class="gallery-item">
            <a class="gallery-link" href="${largeImageURL}" title="${shortTags}">
              <img class="gallery-image" src="${webformatURL}" alt="${shortTags}" />
              <ul class="info-list">
                <li class="info-item">
                  <span class="info-label">Likes</span>
                  <span class="info-value">${likes}</span>
                </li>
                <li class="info-item">
                  <span class="info-label">Views</span>
                  <span class="info-value">${views}</span>
                </li>
                <li class="info-item">
                  <span class="info-label">Comments</span>
                  <span class="info-value">${comments}</span>
                </li>
                <li class="info-item">
                  <span class="info-label">Downloads</span>
                  <span class="info-value">${downloads}</span>
                </li>
              </ul>
            </a>
          </li>
        `;
      }
    )
    .join('');
}

function showErrorToast(message) {
  iziToast.destroy();

  iziToast.error({
    message,
    position: 'topRight',
    timeout: 3000,
    close: true,
    progressBar: true,
  });
}

function showWarningToast(message) {
  iziToast.destroy();

  iziToast.warning({
    message,
    position: 'topRight',
    timeout: 3000,
    close: true,
    progressBar: true,
  });
}

function clearGallery() {
  gallery.innerHTML = '';
}

function showLoader() {
  loader.classList.remove('is-hidden');
}

function hideLoader() {
  loader.classList.add('is-hidden');
}
